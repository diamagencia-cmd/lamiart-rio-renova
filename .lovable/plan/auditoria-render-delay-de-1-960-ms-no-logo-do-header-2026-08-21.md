# Auditoria — render delay de ~1.960 ms no logo do header

Nenhuma alteração foi feita. Tudo abaixo foi verificado lendo `src/routes/index.tsx`, `src/routes/__root.tsx`, `src/styles.css` e inspecionando o HTML servido pelo servidor.

## 1. O `<img>` do logo (linha 123 de `src/routes/index.tsx`)

```
<img src={lamiartLogo} alt="Lamiart Pisos & Revestimentos" width={480} height={160}
     className="h-9 md:h-12 w-auto" fetchPriority="high" />
```
Sem `opacity`, `transform`, `animation`, `transition`, `filter`, `loading="lazy"`, sem classe condicional. Nada no próprio elemento atrasa a pintura.

## 2. Cadeia de ancestrais até o root

`html` → `body` → `QueryClientProvider` (não emite DOM) → `<Outlet />` → `<div>` da página → `<header class="fixed top-0 ... bg-warm-white/85 backdrop-blur-md border-b border-border">` → `<div class="container-x flex ... h-16 md:h-20">` → `<a>` → `<img>`.

- `fade-up` (o único utilitário com `opacity: 0` inicial) aparece **uma única vez** no HTML e está no hero, não no header. Confirmado por busca no HTML servido.
- Nenhum ancestral tem `visibility:hidden`, `display:none`, `opacity` ≠ 1, `transform`, `animation`, `transition` que afete pintura, nem `content-visibility`.
- `backdrop-blur-md` no header cria uma camada com filtro de fundo. Custa uma passagem extra de composição, mas é da ordem de milissegundos, não de segundos.

## 3. React / hydration / condicionais

- `Header` é um componente síncrono, sem `useEffect`, sem `mounted state`, sem `Suspense`, sem `React.lazy`, sem `ClientOnly`.
- O único estado é `const [open, setOpen] = useState(false)` (menu mobile), que não envolve o logo.
- O logo está no HTML de SSR **no byte 272** — ou seja, praticamente no início do documento. Ele é descoberto imediatamente e não depende de hidratação para existir.

## 4 e 5. CSS e fontes

- `src/styles.css` é carregado como `<link rel="stylesheet">` no `<head>`: é **render-blocking**. Enquanto ele não é baixado e parseado, o navegador não pinta nada — nem o logo.
- O header não depende de nenhuma fonte: o logo é imagem e as dimensões do header são fixas (`h-16 md:h-20`), então o swap de fonte não bloqueia sua geometria.
- Os dois `preload` de fonte (`crossorigin`, prioridade máxima) disputam banda exatamente na mesma janela em que o logo é baixado. Isso não bloqueia a pintura, mas alonga a fase crítica.

## 6. Scripts antes da pintura

- `https://www.googletagmanager.com/gtag/js?id=AW-18382294629` (`async`) mais o bloco inline `gtag('config', ...)`. Com throttling de CPU 4x do Lighthouse mobile, o parse/execução do gtag ocupa a main thread justamente na janela em que o primeiro paint deveria ocorrer.
- O bundle da rota é grande (uma única rota de 826 linhas com ~25 imports de imagem) e sua avaliação também compete pela main thread.

## A) Causa mais provável

O logo **não** tem atraso próprio. O "render delay" do LCP é medido do fim do download do recurso até o momento em que ele é pintado, e o primeiro paint da página só acontece depois de:

1. download + parse do CSS render-blocking (`styles.css`), e
2. liberação da main thread ocupada pelo gtag e pela avaliação do bundle da rota, sob CPU throttling 4x.

Como o logo carrega muito cedo (~410 ms) mas o FCP da página fica na casa dos ~2,4–2,9 s, quase todo esse intervalo é contabilizado como "atraso na renderização" dele. Em outras palavras: **o número de 1.960 ms é o FCP da página, não um problema do logo**. Nenhuma técnica aplicada à imagem pode reduzi-lo.

## B) Trechos exatos envolvidos

- `src/routes/__root.tsx` linha 89 — `{ rel: "stylesheet", href: appCss }` (bloqueio de renderização).
- `src/routes/__root.tsx` linhas 107–115 — `scripts` do gtag (main thread na janela do primeiro paint).
- `src/routes/__root.tsx` linhas 90–103 — os dois `preload` de fonte (concorrência de banda).
- `src/routes/index.tsx` linhas 120–124 — header e logo (verificados: limpos).

## C) Natureza do problema

Não é imagem, não é React/hydration, não é fonte. É **caminho crítico de renderização**: CSS render-blocking somado a contenção da main thread. Categoria: CSS/entrega de recursos + JavaScript de terceiros.

## D) Alteração mínima recomendada (aguardando sua aprovação)

Recomendo **uma única mudança por vez**, para medir isolado. Na ordem de melhor relação ganho/risco:

**Opção 1 (recomendada) — tirar o gtag do caminho do primeiro paint.**
Carregar o `gtag/js` e o `gtag('config')` após o primeiro paint (por exemplo em `requestIdleCallback`/após `load`), em vez de como `scripts` do `head`. A tag continua ativa e mede as mesmas conversões; só deixa de competir com o primeiro paint. Como você listou "Google Tag" entre os itens intocáveis, isto só será feito com sua aprovação explícita.

**Opção 2 — CSS crítico inline.**
Extrair as regras necessárias para header + hero e inlinar num `<style>` no `head`, carregando `styles.css` de forma não bloqueante. É o que ataca a causa mais diretamente, mas é a mais invasiva e a que exige validação visual mais cuidadosa.

**Opção 3 — medir antes de mexer.**
Rodar o Lighthouse contra o **build de produção** (não o preview de dev). No dev existe uma folha extra `/@tanstack-start/styles.css` e os módulos não estão empacotados, o que infla FCP e, por consequência, esse render delay. É possível que boa parte dos 1.960 ms seja artefato do ambiente de dev.

## E) Risco

- Opção 1: risco baixo-médio. Não altera visual nenhum. Risco real é de medição: eventos disparados nos primeiros ~1–2 s (um clique imediatíssimo no WhatsApp) poderiam não ser capturados. Mitigável mantendo o `dataLayer` inicializado no `head` e apenas adiando o script externo.
- Opção 2: risco médio. Erro na extração do CSS crítico causa flash de conteúdo sem estilo ou salto de layout. Exige comparação visual desktop/mobile antes/depois.
- Opção 3: risco zero (nenhuma alteração de código).

**Fora de escopo, nada será tocado:** imagens, `fetchPriority`, fontes, `@font-face`, layout, textos, SEO, componentes, cores, dependências.
