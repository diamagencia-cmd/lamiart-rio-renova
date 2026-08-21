# Auditoria técnica de performance — Lamiart (sem alterações aplicadas)

Nenhum arquivo foi modificado. Abaixo o levantamento completo.

## 1. Imagens do site (formato, dimensões, peso real)

Total em `src/assets`: ~25 MB. Praticamente todo o peso está em PNGs de fotos (formato errado para foto).

Em uso na página:

| Arquivo | Uso | Formato | Dimensões | Peso |
|---|---|---|---|---|
| hero-sala.jpg | Hero (imagem principal) | JPEG | 1536x1152 | 125 KB |
| lamiart-logo.png | Header + Footer | PNG | 1920x640 | 224 KB |
| foto-13.png | Card "Piso laminado" | PNG | 1280x960 | 1.307 KB |
| foto-14.png | Card "Piso vinílico" | PNG | 1280x960 | 1.021 KB |
| antes-rio.png | Transformação real (antes) | PNG | 1586x992 | 2.040 KB |
| depois-rio.png | Transformação real (depois) | PNG | 1586x992 | 1.786 KB |
| logo-quick-step.png | Marcas | PNG | 1672x941 | 801 KB |
| logo-durafloor.png | Marcas | PNG | 1672x941 | 767 KB |
| logo-tarkett.png | Marcas | PNG | 800x450 | 30 KB |
| cliente-*.png (6) | Avaliações (40x40 px na tela) | PNG | 65x65 | 2–11 KB cada |
| foto-15 … foto-20 | Catálogo laminados (6) | PNG | 808x788 a 1600x1200 | 572–1.206 KB cada |
| foto-21, foto-22, foto-vinilico-3, foto-28, foto-29, foto-30 | Catálogo vinílicos (6) | PNG | 768x1024 a 1200x1600 | 244–2.754 KB cada |
| antes-piso.png / depois-piso.png | Banner antes/depois | PNG | 512x512 | 374 / 354 KB |
| favicon-lamiart.png | Favicon / apple-touch-icon | PNG | 172x161 | 28 KB |

Não utilizados (peso morto no repositório): `logo-eucafloor.png`, `antes-piso-frio.jpg`, `depois-piso-laminado.jpg`. Também existe a função `RedesSociais()` definida mas não renderizada (código morto com 3 iframes do Instagram).

## 2. Imagens acima da dobra

- `lamiart-logo.png` (header fixo) — 1920x640, 224 KB para exibir ~48 px de altura.
- `hero-sala.jpg` (bloco visual do hero).

Nenhuma outra imagem entra no viewport inicial no mobile.

## 3. LCP provável no mobile

`hero-sala.jpg` — no mobile o hero empilha e a imagem ocupa quase toda a largura em `aspect-[4/5]`. Já tem `fetchPriority="high"`, mas **não há `<link rel="preload">`** e o arquivo é servido em 1536 px de largura para um viewport de ~390 px. O `<h1>` é candidato secundário, e depende da fonte Poppins remota (risco de atraso de render de texto).

## 4. Imagens com `loading="lazy"`

Todas as imagens abaixo da dobra: cards de produto (linha 261), antes/depois (368–369), logos de marcas (425), fotos de clientes (496), catálogos (541), banner antes/depois (586, 622). Os iframes (Maps) também estão com `loading="lazy"`.

Sem lazy (correto): logo do header, hero.
Faltando lazy: as duas imagens do `AntesDepoisBanner` nas linhas 787 e 791 e a logo do footer (linha 723) — estão sem `loading="lazy"`.

## 5. Imagens sem `width`/`height` explícitos

**Todas** — nenhum `<img>` do projeto tem `width`/`height`. O layout é estabilizado por classes (`aspect-*`, `h-64`, `h-9`), o que evita CLS visível, mas o navegador não reserva espaço antes do CSS aplicar e os atributos ainda são recomendados pelo Lighthouse.

## 6. Google Fonts

Carregado em `src/routes/__root.tsx`, uma única folha com 3 famílias:

- Poppins 400, 500, 600, 700, 800 — usada (`font-display`); em uso real apenas 600, 700, 800 (e 400 herdado em nenhum ponto).
- Inter 400, 500, 600 — usada como `font-sans` (corpo).
- **Playfair Display 600, 700 — declarada em `styles.css` como `--font-serif` e nunca usada em nenhum componente.** Download 100% desperdiçado.

Há `preconnect` para fonts.googleapis.com e fonts.gstatic.com, mas não há `display=swap` faltando (já está presente) nem preload da folha.

## 7. Recursos que bloqueiam renderização

- `styles.css` (link no `<head>`) — bloqueante, esperado.
- Folha do Google Fonts — **bloqueante e em domínio terceiro**; é o principal atraso de first render junto com o CSS.
- `gtag.js` (AW-18382294629) — `async`, não bloqueia parse, mas compete por banda no início do carregamento.
- Snippet inline do gtag — execução mínima, não bloqueante de forma relevante.
- Nenhum JS de terceiros além do gtag; os iframes do Maps são lazy.

## 8. Elemento `<dl>` da seção de endereço

`src/routes/index.tsx`, linha 630 (seção `Localizacao`, card "Endereço e atendimento").

Estrutura **semanticamente incorreta**: o `<dl>` contém três `<div>` com `<span>`/`<a>` como filhos, sem nenhum `<dt>` ou `<dd>`. Um `<dl>` válido exige pares `<dt>`/`<dd>` (podendo ser agrupados por `<div>`). Hoje os rótulos "Seg a Sex", "Sábado", "WhatsApp" e seus valores não são expostos como lista de definições para leitores de tela nem para o Google.

Correção sem impacto visual: trocar cada `<span>` de rótulo por `<dt>` e cada valor por `<dd>`, mantendo exatamente as mesmas classes (`dt`/`dd` recebem `display` do flex do pai; `dd` precisa de `margin-inline-start: 0`, resolvido com a classe `m-0`).

## Próximos passos sugeridos (a executar somente após sua aprovação)

Todos preservam pixel-a-pixel o design, textos, cores, espaçamentos e funcionalidades:

1. Converter as fotos PNG para JPEG/WebP com qualidade alta e redimensionar para o tamanho máximo realmente exibido — redução esperada de ~25 MB para ~2 MB.
2. Servir variantes responsivas (`srcset`/`sizes`) via `vite-imagetools`, incluindo a imagem do hero.
3. Adicionar `<link rel="preload" as="image" fetchpriority="high">` para o LCP do hero na `head()` da rota `/`.
4. Reduzir a logo (1920x640 → ~480x160) e as logos de marcas (1672x941 → ~400x225).
5. Reduzir as fotos de clientes 65x65 e adicionar `width`/`height` em todos os `<img>`.
6. Remover Playfair Display da folha do Google Fonts e o token `--font-serif` não utilizado; remover os pesos de Poppins/Inter não usados.
7. Adicionar `loading="lazy"` + `decoding="async"` nas imagens do banner antes/depois e na logo do footer.
8. Corrigir o `<dl>` com `<dt>`/`<dd>` mantendo as classes.
9. Remover código morto: `RedesSociais()` e os 3 assets não utilizados.

## Detalhes técnicos

- Nenhuma alteração em `vite.config.ts` além de eventual registro do plugin `imagetools`; nada de `ssr.external`.
- Preload do LCP entra apenas no `head()` de `src/routes/index.tsx`, não no `__root.tsx`.
- Conversão de imagens feita offline (sharp/PIL no sandbox), gravando arquivos físicos em `src/assets` para funcionar no Vercel — sem dependência de CDN.
