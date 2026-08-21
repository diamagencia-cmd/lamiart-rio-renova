# Fase 3 — Item 1 aprovado: self-hosting das fontes

Escopo: migrar as fontes do Google Fonts para arquivos WOFF2 locais. Nada além disso.

## Arquivos locais (mesmos que o Google entrega hoje — Poppins v24, Inter v20, subset latin)

Salvos em `src/assets/fonts/`:

| Arquivo | Família / peso | Tamanho |
|---|---|---|
| `poppins-600-latin.woff2` | Poppins 600 | 7.992 B |
| `poppins-700-latin.woff2` | Poppins 700 | 7.848 B |
| `poppins-800-latin.woff2` | Poppins 800 | 7.816 B |
| `inter-variable-latin.woff2` | Inter variável (400–600) | 48.432 B |

Verificado por inspeção das tabelas internas: o arquivo do Inter contém `fvar`/`gvar`/`avar`/`STAT` — é realmente variável, então será declarado com `font-weight: 400 600` num único `@font-face`.

## Alteração 1 — `src/styles.css`

Inserir 4 blocos `@font-face` logo após os `@import` existentes (topo do arquivo, antes de `@custom-variant` e `@theme`), com:
- `font-family: "Poppins"` / `"Inter"` exatamente como hoje;
- `font-style: normal`;
- `font-weight: 600`, `700`, `800` (Poppins) e `400 600` (Inter variável);
- `font-display: swap`;
- `src: url("./assets/fonts/<arquivo>.woff2") format("woff2")`;
- `unicode-range` copiado literalmente da folha do Google para o subset latin:
  `U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD`

Nenhuma outra linha do `styles.css` é tocada: `tw-animate-css`, `@theme`, tokens de cor, `--font-display`/`--font-sans`, `letter-spacing`, `line-height`, utilitários e animações permanecem idênticos.

## Alteração 2 — `src/routes/__root.tsx`

Remover exatamente 3 entradas do array `links` (linhas 90–95):
- `preconnect` `https://fonts.googleapis.com`
- `preconnect` `https://fonts.gstatic.com`
- `stylesheet` `https://fonts.googleapis.com/css2?...`

O `stylesheet` do `appCss`, o favicon, o `apple-touch-icon`, os `meta` e o bloco `scripts` (Google Tag) permanecem intactos. Sem `preload` de fonte nesta etapa.

## Fora de escopo (não será tocado)

Tamanhos tipográficos, pesos aplicados aos elementos, line-height, letter-spacing, classes, layout, imagens, `fetchPriority`, lazy loading, Google Tag, JavaScript, SEO, HTML estrutural, `tw-animate-css` e qualquer CSS não relacionado a fontes. Nenhuma dependência será instalada. Itens 2, 3 e 4 do plano anterior ficam para depois.

## Validação

1. Build completo.
2. Playwright desktop e mobile: conferir via `document.fonts` que Poppins 600/700/800 e Inter (400/500/600) estão carregadas dos arquivos locais.
3. Conferir que a lista de requisições não contém `fonts.googleapis.com` nem `fonts.gstatic.com`, sem 404 de fonte e sem erro de console.
4. Comparação visual de H1, H2, botões, selos, navegação, parágrafos, FAQ, depoimentos e footer.

Relatório final: status do build, os 4 arquivos e tamanhos, os `@font-face` finais, confirmação da eliminação total do Google Fonts/gstatic, número de requisições externas removidas (3), mudanças visuais e erros de console.
