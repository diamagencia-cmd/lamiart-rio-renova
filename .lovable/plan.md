# Fase 3 — Otimização do LCP (apenas prioridade de carregamento)

## Estado atual — logo do header
- Arquivo: `src/assets/lamiart-logo-optimized.webp`, 16,8 KB, 480x160.
- Marcação (`src/routes/index.tsx`, linha 123): `src`, `alt`, `width={480}`, `height={160}`, classe `h-9 md:h-12 w-auto`.
- Sem `loading` (portanto eager), sem `decoding`, **sem `fetchPriority`**.
- Está no HTML inicial (header renderizado no SSR), logo é descobrível pelo pre-scanner.

## Estado atual — hero
- Arquivo: `src/assets/hero-sala.jpg`, 128 KB, 1536x1152.
- Marcação (linha 205): `width`, `height`, `fetchPriority="high"`.
- No mobile o layout é `grid lg:grid-cols-2`, ou seja, no celular a coluna da imagem fica **abaixo** do texto do hero — fora da primeira dobra. Por isso o Lighthouse mobile elege o logo como LCP, e o `fetchPriority="high"` do hero está priorizando um recurso que nem entra no LCP naquela viewport.

## Diagnóstico dos ~520 ms de "atraso no carregamento do recurso"
O logo é descoberto cedo, mas entra na fila com **prioridade baixa**: o Chrome atribui `Low` a imagens até o layout confirmar que estão na viewport, e só então promove. Antes dele, disputam a banda:
1. o CSS da rota (bloqueante) e o CSS do Google Fonts (domínio externo, `preconnect` já existe mas ainda há handshake + download);
2. os módulos JS do bundle (`modulepreload`, prioridade alta);
3. o `gtag.js` (async, mas já enfileirado);
4. o `hero-sala.jpg` com `fetchpriority="high"` — 128 KB tratados como mais importantes que o LCP real.

Com TTFB de ~20 ms, praticamente todo o atraso é fila/prioridade, não servidor. É exatamente o cenário que `fetchpriority="high"` resolve.

## Alteração exata recomendada
Somente dois atributos, no arquivo `src/routes/index.tsx`:

1. Linha 123 (logo do header): adicionar `fetchPriority="high"`.
2. Linha 205 (hero): **remover** `fetchPriority="high"` (volta à prioridade normal/automática do navegador; nada mais muda — `width`, `height` e classes permanecem).

Nenhuma outra linha, nenhum outro arquivo, nenhuma dependência.

## Preload: recomendação — NÃO usar
Motivo técnico: o `<img>` do logo já está no HTML inicial e o Lighthouse confirma que é descobrível; um `<link rel="preload">` não adiantaria a *descoberta*, apenas a *prioridade* — e isso o `fetchpriority="high"` no próprio `<img>` já faz, com uma linha só e sem superfície de erro.

Se ainda assim fosse usado, valem as respostas às suas perguntas 5 e 6:
- o `preload` **precisaria** de `fetchpriority="high"` também; sem isso o alerta do Lighthouse permaneceria, pois a prioridade seria herdada como padrão de imagem;
- há risco real de **download duplicado** se a URL do preload não for byte-a-byte igual à do `src`. O asset passa pelo Vite e recebe hash no nome, então a URL só coincide se importada do mesmo módulo; qualquer caminho escrito à mão (`/assets/lamiart-logo...`) quebra na próxima build e baixa duas vezes. Mais um motivo para não usar.

## Risco de competição entre hero e logo
Hoje existe competição e ela é contra o LCP: o único recurso marcado como `high` é o que **não** é o LCP no mobile. Depois da mudança há exatamente um recurso `high` (o logo), e o hero volta a ser carregado com prioridade normal, subindo naturalmente quando o layout o coloca na viewport.

Contrapartida honesta: no desktop, onde o hero fica na primeira dobra, é possível que ele seja o elemento LCP. Retirar o `fetchpriority` de lá pode piorar o LCP desktop em algumas dezenas de ms. Como a meta declarada é o Lighthouse mobile e você não quer dois recursos disputando prioridade alta, a recomendação é a de cima. Se preferir proteger o desktop, a alternativa é manter o `high` no hero e apenas adicionar no logo — mas aí a competição continua.

## Impacto esperado (mobile)
- Atraso de carregamento do logo: ~520 ms → estimado 150–250 ms.
- LCP: ~2,9 s → estimado ~2,4–2,6 s.
- CLS: inalterado (0). TBT: inalterado. Aparência: idêntica — `fetchpriority` não afeta pintura nem layout.
- O alerta "fetchpriority adequada" do Lighthouse passa a ser atendido.

## Fora do escopo (não será tocado)
Google Fonts, CSS, JavaScript, arquivos de imagem, compressão, `srcset`/`sizes`, Google Tag, SEO, HTML semântico, `loading="lazy"` das imagens abaixo da dobra, layout e visual.

## Validação
Build completo e conferência visual (desktop e mobile) para confirmar que nada mudou de aparência.
