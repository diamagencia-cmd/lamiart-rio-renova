# Fase 4 — Auditoria de fontes (nenhuma alteração feita)

## 1. Requisição atual (verificada agora)
`src/routes__root.tsx` — linhas 90, 91 e 94:
- `preconnect` https://fonts.googleapis.com
- `preconnect` https://fonts.gstatic.com (crossOrigin)
- 1 stylesheet:
  `https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap`

Total: **3 famílias, 10 variantes**, `display=swap` presente. Nenhum arquivo de fonte local existe no projeto (`src/assets` só tem imagens; não há `public/`).

## 2. Como as famílias são referenciadas
`src/styles.css` linhas 48-50:
- `--font-display: "Poppins", system-ui, sans-serif`
- `--font-sans: "Inter", system-ui, sans-serif`
- `--font-serif: "Playfair Display", Georgia, serif`

Linha 110: `body { font-family: var(--font-sans) }` → Inter é a fonte padrão de tudo.
Linha 113: `h1,h2,h3,h4 { font-family: var(--font-display) }` → Poppins em todos os títulos.
Linhas 145-146, 162-163, 178-179: utilitários `btn-primary`, `btn-whatsapp`, `btn-outline` → `font-weight: 600` + Poppins.

`--font-serif` / `font-serif` / `Playfair`: **zero ocorrências de uso** em todo o `src` (nenhuma classe `font-serif`, nenhum CSS, nenhum inline, nenhum pseudo-elemento). Confirmado — a variável é declarada e nunca consumida.

## 3. Pesos realmente utilizados
Poppins (via `font-display`, 23 ocorrências em `src/routes/index.tsx`):
- 600 — `font-semibold` (linhas 498, 676, 729, 736, 743) + os 3 utilitários de botão
- 700 — `font-bold` (239, 242, 595, 628, 781) e `__root.tsx` 404
- 800 — `font-extrabold` (175, 229, 267, 299, 353, 377, 411, 457, 535, 571, 609, 669, 702)
- 400 — **nenhum**: não existe elemento com `font-display` sem classe de peso, e nenhum `<h1..h4>` sem peso explícito
- 500 — **nenhum**: as duas ocorrências de `font-medium` (linhas 125 e 151, nav desktop e menu mobile) são texto de corpo, ou seja Inter, não Poppins

Inter (padrão do body):
- 400 — todo o texto corrido (herdado do body)
- 500 — `font-medium` nas linhas 125 e 151 (nav) e no `ui/button.tsx`
- 600 — `font-semibold` em spans/figcaptions (545, 632, 636, 640, 641, 788)
- 700/800 — solicitados pelo CSS em vários selos e badges (182, 185, 209, 210, 264, 282, 298, 352, 371, 383, 456, 668, 792) mas **não carregados** → o navegador está sintetizando negrito falso hoje

## 4. Tabela

| Família | Peso | Onde é usado | Acima da dobra? | Necessário? | Pode remover? |
|---|---|---|---|---|---|
| Poppins | 400 | nenhum lugar | não | não | **sim** |
| Poppins | 500 | nenhum lugar | não | não | **sim** |
| Poppins | 600 | botões (`btn-*`), nomes de depoimentos, FAQ, títulos do footer | sim (botões do hero) | sim | não |
| Poppins | 700 | h3 de cards, selo do hero, CTA Instagram | sim (selo "Venda com Instalação") | sim | não |
| Poppins | 800 | H1 do hero e todos os H2 de seção | sim (H1) | sim | não |
| Inter | 400 | corpo de todo o site (herdado do body) | sim (parágrafo do hero) | sim | não |
| Inter | 500 | nav desktop (125), menu mobile (151), `ui/button` | sim (header) | sim | não |
| Inter | 600 | figcaptions, tabela de horários, link WhatsApp | não | sim | não |
| Inter | 700/800 | badges/selos (`font-bold` em spans) | sim (2 badges do hero) | hoje é sintetizado | n/a — ver nota |
| Playfair Display | 600 | nenhum lugar | não | não | **sim** |
| Playfair Display | 700 | nenhum lugar | não | não | **sim** |

Nota sobre Inter 700/800: hoje o negrito desses selos é **sintético**. Adicionar os pesos reais mudaria levemente a aparência, o que está fora do escopo desta fase. Mantemos o comportamento atual.

## 5. Caminho crítico no mobile
Acima da dobra participam: **Poppins 800** (H1), **Poppins 700** (selo sobre a foto), **Poppins 600** (3 botões), **Inter 400** (parágrafo) e **Inter 500** (nav — só ≥lg, portanto não crítico no celular). Ou seja, 4 variantes realmente críticas no mobile. Playfair, Poppins 400 e Poppins 500 não participam de nada.

## 6. Comparação das estratégias

**Estratégia A — continuar no Google Fonts, remover famílias/pesos não usados**
- Remove: Playfair Display (2 variantes) + Poppins 400 e 500 → de 10 para 6 variantes, 3 para 2 famílias.
- Ganho: o CSS do Google encolhe (menos blocos `@font-face`) e, principalmente, o navegador deixa de poder buscar arquivos WOFF2 desnecessários. Economia realista de 30-90 KB de fonte e menos conexões concorrentes.
- Complexidade: mínima — 1 linha (`__root.tsx` 94) e 1 linha opcional (`styles.css` 50).
- Risco visual: **nulo** (nenhum peso removido é usado por qualquer elemento).
- Requisições externas eliminadas: 0 stylesheets, mas até 4 downloads de WOFF2 a menos.
- FCP/LCP: ganho pequeno-moderado; o stylesheet do Google continua bloqueante e ainda custa DNS+TLS.
- Manutenção: idêntica à de hoje.

**Estratégia B — self-hosting dos WOFF2**
- Ganho: elimina 2 origens externas (DNS+TLS+RTT ~150-300 ms no mobile) e o stylesheet bloqueante; as fontes passam a vir do mesmo domínio, com cache de build.
- Complexidade: alta neste projeto — exigiria baixar/gerar 6 arquivos WOFF2 com subset latin, adicioná-los ao repo e escrever 6 blocos `@font-face`. Sem instalar dependências (`@fontsource-*` está proibido nesta fase), os arquivos teriam de ser obtidos manualmente.
- Risco visual: baixo, mas não nulo — se o subset for diferente do que o Google entrega hoje, caracteres acentuados/emoji dos depoimentos podem cair em fallback.
- Requisições externas eliminadas: 3 (2 preconnects + 1 stylesheet).
- FCP/LCP: o melhor dos dois, tipicamente 150-400 ms no mobile.
- Manutenção: mais peso no repo e atualização manual dos arquivos.

## 7. Layout shift ao migrar para arquivos locais
Migrar para a **mesma** família em arquivo local não altera métricas tipográficas (unitsPerEm, ascent/descent, advance widths são propriedades do arquivo, e o arquivo é o mesmo do Google). O CLS não muda. O único risco de shift é o já existente do `swap` (fallback → fonte real), idêntico nas duas estratégias. Um subset incompleto causaria troca de glifos, não deslocamento de layout.

## 8. Recomendação para esta fase: **Estratégia A**
Motivo: entrega a maior parte do ganho seguro com risco visual zero e duas linhas de alteração, sem adicionar binários ao repo nem dependências. O self-hosting (B) fica como Fase 5 opcional, a ser medida depois de A.

Alterações exatas que pretendo fazer, e nada além disso:
1. `src/routes/__root.tsx`, linha 94 — trocar a URL por:
   `https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap`
2. `src/styles.css`, linha 50 — remover a declaração `--font-serif: "Playfair Display", Georgia, serif;` (não referenciada em nenhum lugar).

Preconnects das linhas 90-91 **permanecem** (continuam necessários na Estratégia A). Nada de imagens, `fetchPriority`, preload, lazy, JS, Google Tag, SEO, HTML, componentes, tamanhos, letter-spacing ou line-height é tocado.

## 9. Validação
Build completo e conferência visual desktop/mobile confirmando H1, botões, selos, nav, depoimentos e footer idênticos.
