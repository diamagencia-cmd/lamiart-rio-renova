# Fase 3 — Auditoria do caminho crítico de renderização e fontes

Nenhum arquivo do projeto foi alterado. Tudo abaixo foi verificado agora no código atual e nas respostas reais do Google Fonts.

## 1. Estado real das fontes hoje (importante)

O Lighthouse que você usou refletia a configuração **antiga**. O código atual (`src/routes/__root.tsx` linha 94) já pede apenas:

`family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap`

Buscas em todo o `src`: **zero ocorrências de "Playfair" e de `font-serif`**. Playfair Display já foi removida (família e variável CSS). Poppins 400/500 também já não são solicitados.

## 2. Famílias e pesos realmente usados

| Família | Peso | Onde | Necessário |
|---|---|---|---|
| Poppins (`--font-display`) | 800 | H1 do hero + todos os H2 de seção | sim (acima da dobra) |
| Poppins | 700 | h3 de cards, selo do hero, CTA Instagram | sim (acima da dobra) |
| Poppins | 600 | `btn-primary`/`btn-whatsapp`/`btn-outline`, FAQ, footer | sim (acima da dobra) |
| Inter (`--font-sans`) | 400 | corpo do site inteiro (herdado do `body`) | sim (acima da dobra) |
| Inter | 500 | nav desktop, menu mobile, `ui/button` | sim (só ≥lg) |
| Inter | 600 | figcaptions, tabela de horários, link WhatsApp | sim (abaixo da dobra) |
| Playfair Display | 600/700 | nenhum lugar | **já removida** |
| Poppins | 400/500 | nenhum lugar | **já removidas** |

## 3. Arquivos WOFF2 baixados hoje (medido)

A folha do Google declara 30 blocos `@font-face` / 16 URLs distintas, mas o navegador só baixa os subsets cujos glifos aparecem na página. Em português (todos os caracteres caem no subset `latin`, U+0000–00FF):

| Arquivo | Família/peso | Tamanho real |
|---|---|---|
| `...SjIa1ZL7W0Q5nw.woff2` | Inter **variável** latin (serve 400, 500 e 600 num único arquivo) | 48,4 KB |
| `...LEj6Z1xlFd2JQEk.woff2` | Poppins 600 latin | 8,0 KB |
| `...LCz7Z1xlFd2JQEk.woff2` | Poppins 700 latin | 7,8 KB |
| `...LDD4Z1xlFd2JQEk.woff2` | Poppins 800 latin | 7,8 KB |

Total: **4 requisições, ~72 KB**, mais 1 requisição da folha CSS (891 B comprimidos) e 2 handshakes de origem (`fonts.googleapis.com` + `fonts.gstatic.com`).

## 4. Requisições que ainda podem ser eliminadas

Nenhum peso a mais pode ser cortado — todos os 4 arquivos são usados. O que resta é eliminável apenas mudando a **origem**:

- 1 requisição de CSS bloqueante (`fonts.googleapis.com`) — hoje custa ~780 ms no relatório;
- 1 cadeia DNS+TLS extra (`fonts.gstatic.com`), que só começa **depois** do CSS chegar;
- ou seja, até **3 dos 5 itens** de rede da tipografia desaparecem com self-hosting.

## 5. Google Fonts (A) vs self-hosting (B)

**A) Continuar no Google Fonts reduzindo famílias/pesos** — já foi feito. Não há mais ganho disponível nesse caminho.

**B) Self-hosting dos 4 WOFF2** — este é o único ganho restante e é o recomendado:
- remove a folha CSS externa bloqueante da cadeia crítica;
- remove 2 origens (2× DNS+TLS+RTT, tipicamente 150–350 ms em 4G);
- as fontes passam a ser descobertas no mesmo domínio, já no CSS local, com hash de build e cache imutável;
- risco visual **nulo** se usarmos exatamente os mesmos arquivos que o Google entrega hoje (mesmas métricas, mesmo subset latin).

## 6. Como o self-hosting seria feito

- Arquivos: os 4 WOFF2 latin da tabela do item 3, baixados das próprias URLs do gstatic (Poppins 600/700/800 e Inter variável).
- Local: `src/assets/fonts/` (entram no bundle Vite, com hash e cache longo).
- Declaração: 4 blocos `@font-face` no topo de `src/styles.css`, com `url()` relativo (import de arquivo local é permitido pelo Lightning CSS), `font-display: swap` (idêntico ao comportamento atual), e `unicode-range` do subset latin copiado da folha do Google.
- Inter entra como um único `@font-face` variável com `font-weight: 400 600`, cobrindo 400/500/600 sem arquivos extras.
- Nada mais é baixado: sem latin-ext, sem cirílico, sem grego, sem devanagari — hoje esses subsets só não são baixados por sorte do conteúdo; com self-hosting eles deixam de existir.
- `__root.tsx`: os 2 `preconnect` e o `<link>` do Google saem; entra um `preload` opcional apenas do Inter latin (a fonte do primeiro texto pintado).

## 7. Fontes/CSS estão atrasando o LCP?

Sim, o FCP — e por consequência o render delay. Hoje o navegador precisa de: HTML → `styles.css` (bloqueante, ~350 ms) **e** CSS do Google (bloqueante, ~780 ms, em outra origem) antes de pintar qualquer pixel. Isso explica bem o FCP de ~2,9 s. O logo só pode ser pintado depois do primeiro layout, que depende desses dois CSS; o arquivo do logo já está pronto muito antes (download termina em ~380 ms) e fica ~1,94 s esperando. **O render delay do LCP é dominado pelo CSS bloqueante, não pela imagem.**

## 8. Header / logo: existe animação ou hydration atrasando?

Verificado linha por linha em `src/routes/index.tsx`:

- Logo (linha 123): `<img>` simples, sem `opacity`, sem `transform`, sem `transition`, sem `animate-*`, sem `fade-up`, sem `loading="lazy"`, com `fetchPriority="high"` e `width`/`height` definidos.
- `Header` tem `useState(open)` **apenas** para o menu mobile; o logo não é condicional e não depende de estado.
- Nenhum `useEffect` no Header, nada pós-hydration, nenhum gate de cliente. O logo vem no HTML do SSR.
- Ancestrais: `<header className="fixed ... bg-warm-white/85 backdrop-blur-md">`. Não há animação, mas `backdrop-blur-md` cria uma camada com filtro que o navegador precisa compor no primeiro paint — custo pequeno, e é design, então não será alterado.
- `fade-up` existe (linhas 173 e 203) mas é `animation ... both` de opacidade no **hero**, não no header. Ele não afeta o logo; afeta a pintura do H1/foto do hero.

Conclusão: **não há animação nem hydration atrasando o logo.** O atraso é de caminho crítico de CSS.

## 9. styles.css (15,8 KiB)

O arquivo-fonte tem 6,2 KB e vira ~15,8 KiB depois do Tailwind gerar as utilidades. Já usa `source(none)` + `@source "../src"`, então não há varredura excessiva. Otimizações simples e seguras, sem Critical CSS:

- remover a dependência `tw-animate-css` (linha 3) **se** nenhuma classe dela for usada — precisa de checagem antes; é o único bloco potencialmente morto de tamanho relevante;
- garantir compressão Brotli na resposta (é responsabilidade do host; 15,8 KiB viram ~4 KB);
- não vale dividir o CSS nem inliná-lo nesta fase: 350 ms para 15,8 KiB indica latência/RTT, não peso — ou seja, o ganho real vem de **remover a segunda origem de CSS**, que é exatamente o item 6.

---

# A) DIAGNÓSTICO

- **FCP ~2,9 s:** dois CSS bloqueantes em série, um deles em origem externa (`fonts.googleapis.com`, ~780 ms + DNS/TLS) que precisa terminar antes do primeiro paint.
- **Render delay do LCP ~1,94 s:** o logo termina o download em ~380 ms e espera o desbloqueio do render pelo CSS. Não é problema da imagem, do `fetchPriority` nem de JS.
- **Fontes necessárias:** Poppins 600, 700, 800 (latin) e Inter variável 400–600 (latin) — 4 arquivos, ~72 KB.
- **Fontes desnecessárias:** Playfair Display 600/700 e Poppins 400/500 — **já eliminadas**; nada mais sobra para cortar dentro do Google Fonts.
- **Animação/hydration atrasando o logo:** não existe. Logo estático, SSR, sem estado, sem efeito, sem transição.

# B) PLANO RECOMENDADO (por prioridade)

1. **Self-hospedar os 4 WOFF2 latin e remover o `<link>` + preconnects do Google.**
   Benefício: alto — remove a origem externa bloqueante da cadeia crítica; expectativa de 300–700 ms no FCP mobile, com efeito direto no render delay do LCP. Risco: baixo — mesmos arquivos, mesmo `swap`, mesmo subset; tipografia visualmente idêntica.
2. **`preload` do Inter latin (`as="font" type="font/woff2" crossorigin`).**
   Benefício: médio — antecipa a fonte do primeiro texto. Risco: baixo. Fazer só depois de medir o item 1, para isolar o efeito.
3. **Auditar e, se morto, remover `tw-animate-css` do `styles.css`.**
   Benefício: baixo-médio (encolhe o CSS bloqueante). Risco: baixo, condicionado à checagem de uso de cada classe antes de remover.
4. **Confirmar Brotli/cache no host para `styles.css` e para as fontes locais.**
   Benefício: médio, custo zero de código. Risco: nulo — é configuração de entrega, não do projeto.

Fora de escopo nesta fase, conforme pedido: imagens, `fetchPriority`, lazy, Google Tag, tracking, JS de negócio, SEO, HTML semântico, design, layout, tipografia visual e textos.

## Validação
Build completo, comparação visual desktop/mobile (H1, botões, selos, nav, depoimentos, footer) e nova medição Lighthouse mobile após o item 1, antes de seguir para o item 2.
