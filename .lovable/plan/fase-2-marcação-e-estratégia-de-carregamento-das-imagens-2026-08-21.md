# Fase 2 — Marcação e estratégia de carregamento das imagens

Auditoria concluída no código atual (`src/routes/index.tsx`). Nenhum `<img>` do projeto possui `width`/`height` hoje, e nenhum possui `decoding`. Existem 12 elementos `<img>` no código (alguns renderizados em loop, totalizando ~28 imagens na página).

## Tabela de auditoria

| Imagem / componente | Arquivo usado | Dimensões intrínsecas | width/height hoje | loading hoje | decoding hoje | Alteração pretendida |
|---|---|---|---|---|---|---|
| Logo do header (L123) | lamiart-logo-optimized.webp | 480x160 | não | (eager) | — | + width/height apenas |
| Hero (L205) | hero-sala.jpg | 1536x1152 | não | (eager, fetchPriority high) | — | + width/height apenas |
| Produtos — fundo do card (L261, x2) | foto-13-optimized.webp / foto-14-optimized.webp | 1200x900 / 1200x900 | não | lazy | — | + width/height + decoding="async" |
| Antes/Depois "Rio" — antes (L368) | antes-rio-optimized.webp | 1586x992 | não | lazy | — | + width/height + decoding="async" |
| Antes/Depois "Rio" — depois (L369) | depois-rio-optimized.webp | 1586x992 | não | lazy | — | + width/height + decoding="async" |
| Marcas (L425, loop) | logo-quick-step-optimized.webp / logo-durafloor-optimized.webp / logo-tarkett.png | 480x270 / 480x270 / 800x450 | não | lazy | — | + width/height (por marca) + decoding="async" |
| Depoimentos — foto do cliente (L496, loop) | cliente-*.png | 65x65 | não | lazy | — | + width/height 65x65 + decoding="async" |
| Catálogo laminados (L541, 6 itens) | foto-15/16/17/18/19/20-optimized.webp | 808x788, 900x1200, 600x600, 1032x581, 900x1200, 1024x768 | não | lazy | — | + width/height por item + decoding="async" |
| Catálogo vinílicos (L541, 6 itens) | foto-21/22/vinilico-3/28/29/30-optimized.webp | 1200x900, 1200x900, 800x800, 768x1024, 900x1200, 900x1200 | não | lazy | — | + width/height por item + decoding="async" |
| Logo do footer (L723) | lamiart-logo-optimized.webp | 480x160 | não | **ausente (eager)** | — | + width/height + loading="lazy" + decoding="async" |
| AntesDepoisBanner — antes (L787) | antes-piso-optimized.webp | 512x512 | não | **ausente (eager)** | — | + width/height + loading="lazy" + decoding="async" |
| AntesDepoisBanner — depois (L791) | depois-piso-optimized.webp | 512x512 | não | **ausente (eager)** | — | + width/height + loading="lazy" + decoding="async" |

A auditoria anterior está confirmada: as duas imagens do `AntesDepoisBanner` e a logo do footer continuam sem `loading="lazy"`.

## Resumo

- Elementos `<img>` modificados: **12 no código** (todos), cobrindo ~28 imagens renderizadas.
- Receberão `loading="lazy"` (novo): **3** — logo do footer, antes e depois do `AntesDepoisBanner`.
- Já com `loading="lazy"` (mantidos): Produtos, Antes/Depois Rio, Marcas, fotos de depoimentos, catálogos.
- Permanecem eager/sem alteração de carregamento: **logo do header** e **hero-sala** (acima da dobra; hero mantém `fetchPriority="high"`). Nestes dois só entram `width`/`height`; **não** recebem `decoding="async"`, para não arriscar atraso no LCP.
- Receberão `decoding="async"`: todas as imagens abaixo da dobra (10 elementos no código).

## Backgrounds em CSS (apenas informativo)

Nenhuma imagem é carregada via `background-image` no CSS ou em `style` inline. Os "fundos" dos cards de Produtos e do hero são `<img>` posicionados com `absolute inset-0 object-cover`. Os arquivos legados `piso-laminado-bg.png` e `piso-vinilico-bg.png` existem em `src/assets` mas não são referenciados. Nada será alterado aqui.

## Risco visual e CLS

Risco de alteração visual: **nenhum**. Todos os `<img>` afetados têm classes que fixam o tamanho (`w-full h-full object-cover`, `absolute inset-0`, `h-9/h-12 w-auto`, `max-h-full object-contain`, `h-10 w-10`, `h-64 md:h-80 object-cover`), e essas classes vencem os atributos HTML. `width`/`height` servem apenas como proporção intrínseca para o navegador reservar espaço.

CLS: tende a melhorar ou permanecer igual (~0). Não há mudança em CSS, aspect-ratio, layout, textos, preload, fetchPriority, srcset/sizes, fontes, Google Tag ou SEO. Nenhuma dependência será instalada e nenhum arquivo de imagem será alterado.

## Detalhes técnicos

Nos loops (marcas, depoimentos, catálogos) as dimensões entram como campos `w`/`h` nos objetos/arrays de dados já existentes, para que cada imagem receba sua própria proporção correta, em vez de um valor único genérico. Ao final: build para confirmar que nada quebrou.
