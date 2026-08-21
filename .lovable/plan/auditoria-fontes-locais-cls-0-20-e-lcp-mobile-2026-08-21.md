# Auditoria — fontes locais, CLS 0,20 e LCP mobile

Nenhuma alteração foi feita. Tudo abaixo foi verificado lendo `src/styles.css`, `src/routes/index.tsx`, `src/routes/__root.tsx` e os arquivos em `src/assets/fonts/`.

## 1. Fontes por elemento acima da dobra (mobile 393 px)

| Elemento | Onde | font-family | font-weight |
|---|---|---|---|
| Logo do header | `<img>` | — (imagem, sem fonte) | — |
| Nav desktop | linha 125, `font-medium` | Inter | 500 (oculto no mobile, `hidden lg:flex`) |
| Botão "Solicitar orçamento" (header) | `btn-primary` | Poppins | 600 (oculto <640 px: `hidden sm:inline-flex`) |
| H1 do hero | `font-display font-extrabold` | Poppins | 800 |
| **Parágrafo LCP** | `mt-5 text-base sm:text-lg` | **Inter** | **400** (com `<strong>` → Inter 700, hoje sintetizado) |
| Selo "Renove seu ambiente… 10x" | `font-bold` | Inter | 700 (sintetizado) |
| Selo "Atendimento de segunda a domingo…" | `font-bold` | Inter | 700 (sintetizado) |
| Botões WhatsApp / Ligar agora / Ver opções | `btn-whatsapp`, `btn-primary`, `btn-outline` | Poppins | 600 |
| Micro-copy "Atendimento rápido pelo WhatsApp…" | herdado | Inter | 400 |
| Selo sobre a foto ("Lamiart" / "Venda com Instalação") | `font-bold` / `font-extrabold` | Poppins? **não** — é `<p>`, logo Inter 700/800 sintetizado | — |
| Menu mobile aberto | `font-medium` | Inter | 500 |

Observação importante: os selos e o `<strong>` usam pesos 700/800 do **Inter**, que o arquivo variável cobre só até 600 → o navegador sintetiza. Comportamento atual, não vou mexer.

## 2. Arquivo WOFF2 por elemento

- `inter-variable-latin.woff2` (48.432 B) → parágrafo LCP, selos, micro-copy, nav, menu mobile. **Crítico.**
- `poppins-800-latin.woff2` (7.816 B) → H1. **Crítico.**
- `poppins-600-latin.woff2` (7.992 B) → os 3 botões do hero. **Crítico.**
- `poppins-700-latin.woff2` (7.848 B) → primeiro uso real só a partir de "Promessa" (h3 dos cards) e no `404`. **Não crítico acima da dobra.**

## 3. Necessário no primeiro viewport
Inter variável (400–600), Poppins 800 e Poppins 600. Total ~64 KB.

## 4. Baixado cedo sem ser necessário
`poppins-700-latin.woff2`. Os 4 arquivos estão no mesmo `styles.css`, então o navegador descobre os quatro `@font-face` juntos; ele só busca os que casam com algum texto renderizado, mas como a Promessa está no DOM inicial (SSR, sem lazy), o 700 entra na mesma leva. Custa 7,8 KB e uma requisição concorrente na fase mais sensível.

## 5 e 6. Preload
Sim, e apenas dois arquivos: `inter-variable-latin.woff2` e `poppins-800-latin.woff2`. Esses dois definem o texto do LCP e o H1, que é o maior bloco geométrico. `poppins-600` (botões) fica sem preload — os botões estão abaixo do H1 e do parágrafo, e adicionar mais preloads compete banda com o LCP. `poppins-700` nunca.

## 7. font-display
Verificado: os 4 `@font-face` já têm `font-display: swap` (linhas 10, 18, 26, 34 de `src/styles.css`). Correto e sem alteração.

## 8 e A) CAUSA DO CLS ≈ 0,20
Dois mecanismos, ambos confirmados no código:

1. **Swap com métricas diferentes.** Os fallbacks declarados são `system-ui, sans-serif` (linhas 83–84). No Android o `system-ui` é Roboto, cujas métricas divergem bastante de Poppins e Inter. Enquanto o WOFF2 não chega, o H1 (`text-4xl`, `leading-[1.05]`, 2–4 linhas no mobile) e o parágrafo são pintados em Roboto; ao trocar, a altura de linha efetiva e a quebra de linhas mudam. Poppins é notavelmente mais larga que Roboto no mesmo `font-size`, então o H1 costuma ganhar uma linha inteira — dezenas de pixels — e empurra parágrafo, selos, botões e a foto do hero para baixo. Como esses elementos ocupam quase todo o viewport, a fração deslocada é grande: é exatamente o perfil de um CLS de 0,20.
2. **Momento tardio do swap.** Como não há preload, os arquivos só começam a baixar depois de `styles.css` ser baixado e parseado (~220 ms de bloqueio + a própria requisição). O swap acontece bem depois do FCP, portanto entra integralmente na janela de CLS.

Não há CLS de imagem: todas as `<img>` acima da dobra já têm `width`/`height` e a foto está em contêiner com `aspect-[4/5]`.

## 9. Métricas de fallback (`size-adjust` e overrides)
Funciona e é a técnica canônica: declarar famílias `@font-face` de fallback (`local("Roboto")` / `local("Arial")`) com `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override` calibrados, e usá-las como próximo item de `--font-display`/`--font-sans`. Elimina quase todo o shift. Custo: 2 blocos novos e 2 linhas alteradas, e os valores precisam ser calculados a partir das tabelas dos arquivos reais. É a solução completa, mas é a mais invasiva das disponíveis.

## 10. Solução mais simples e segura
Sim: **preload dos dois arquivos críticos**. Preload muda a descoberta da fonte de "depois do CSS" para "junto do HTML", com prioridade alta. Na prática o WOFF2 chega antes do primeiro paint do texto, o swap não acontece depois do FCP e o CLS cai para perto de zero sem tocar em uma única métrica tipográfica nem no visual. É o passo que recomendo primeiro, isoladamente, para medir. Se sobrar CLS residual em 3G lento, aí sim aplico as métricas de fallback do item 9 como segunda etapa.

## 11 e 12. Poppins e Inter permanecem exatamente como estão; nada de `font-display: block`.

## 13. `font-display: optional` — não recomendo
`optional` dá à fonte uma janela de bloqueio de ~100 ms e **zero** janela de swap: se o arquivo não chegar nesses 100 ms, o navegador desiste e mantém o fallback **para todo aquele carregamento de página**. O CLS iria a zero, mas usuários em 3G/4G fraco veriam o site permanentemente em Roboto — Poppins e Inter simplesmente não apareceriam. Isso viola o requisito 11 na prática. Fica descartado.

## 14 e B) CAUSA DO LCP (render delay ~1,49 s)
O parágrafo LCP está dentro de `<div className="fade-up">` (linha 173). O utilitário `fade-up` (`styles.css` 241–245) é `animation: fadeUp 0.7s ease-out both`, começando em `opacity: 0` e `translateY(16px)`.

Consequência direta: o Chrome **não** considera um elemento com `opacity: 0` como candidato a LCP; o tempo de LCP é registrado quando ele fica visível. Com `ease-out` de 700 ms partindo de opacidade zero, o parágrafo só atinge opacidade suficiente centenas de milissegundos após o primeiro paint. Somando os ~220 ms de CSS bloqueante, a espera do WOFF2 do Inter (sem preload) e a animação de 700 ms, chega-se confortavelmente ao ~1,49 s de render delay relatado.

Demais itens verificados: não há renderização condicional, estado React, gate de hidratação nem `<ClientOnly>` envolvendo o hero — ele é SSR puro. O único `useState` do topo é o `open` do menu (linha 108), que não afeta o parágrafo. `transition` no hero existe apenas em hover de links. `transform` no LCP vem só do `fadeUp` e transform por si não gera CLS.

## C) FONTES CRÍTICAS ACIMA DA DOBRA
1. `src/assets/fonts/inter-variable-latin.woff2` — parágrafo LCP, selos, micro-copy.
2. `src/assets/fonts/poppins-800-latin.woff2` — H1.
3. `src/assets/fonts/poppins-600-latin.woff2` — botões (crítico, mas sem preload por decisão de orçamento de banda).

Não críticos: `poppins-700-latin.woff2`.

## D) PLANO (após aprovação)

**Etapa 1 — preload das duas fontes críticas.**
Em `src/routes/__root.tsx`, adicionar ao array `links` duas entradas, importando as fontes como assets do Vite (`?url`) para que o hash do build coincida com o que o CSS pede e não haja download duplicado:
```
{ rel: "preload", href: interUrl, as: "font", type: "font/woff2", crossOrigin: "anonymous" }
{ rel: "preload", href: poppins800Url, as: "font", type: "font/woff2", crossOrigin: "anonymous" }
```
Nada mais no `links`; `scripts` (Google Tag), `meta`, favicon e stylesheet permanecem idênticos.

**Etapa 2 — retirar o LCP do caminho da animação (opcional, decidido por você).**
O `fade-up` no bloco de texto do hero é a maior parcela isolada do render delay. A opção menos invasiva é remover `fade-up` **apenas** do `<div>` da coluna de texto (linha 173), mantendo o da coluna da imagem (linha 203) e o utilitário intacto para o resto do site. Efeito visual: o texto do hero aparece direto, sem o fade de 0,7 s. Como isso é uma mudança perceptível de animação, só executo se você aprovar explicitamente.

**Etapa 3 — só se sobrar CLS depois de medir.**
Adicionar duas famílias de fallback com `size-adjust`/`ascent-override`/`descent-override`/`line-gap-override` calculadas dos arquivos reais e inseri-las em `--font-display` e `--font-sans` antes de `system-ui`. Nova medição antes de decidir.

**Fora de escopo, nada será tocado:** imagens, Google Tag, tracking, layout, textos, SEO, lazy loading, `fetchPriority`, componentes, tamanhos, cores, CSS visual, `font-display: swap` atual, dependências.

**Validação:** build completo, Playwright mobile e desktop conferindo que os 2 preloads aparecem, que não há download duplicado de fonte, que `document.fonts` continua reportando Poppins 600/700/800 e Inter, e comparação visual de H1, parágrafo, selos e botões.
