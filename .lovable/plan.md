# Correção: `<dl>` semântico + canonical absoluto

Duas correções pontuais, um único arquivo alterado: `src/routes/index.tsx`.

## 1. `<dl>` da seção "Endereço e atendimento"

Arquivo: `src/routes/index.tsx`, linhas 630–643 (componente `Localizacao`).

Estrutura atual (inválida: `<dl>` só com `<div><span><span>`):

```text
<dl class="mt-5 space-y-3 text-sm">
  <div class="flex items-start gap-3">
    <span class="font-semibold text-warm-gray w-24 shrink-0">Seg a Sex</span>
    <span class="text-ink">08h às 17h</span>
  </div>
  ... Sábado ... WhatsApp (link) ...
</dl>
```

Estrutura proposta (válida: `div` é permitido como wrapper dentro de `dl`):

```text
<dl class="mt-5 space-y-3 text-sm">
  <div class="flex items-start gap-3">
    <dt class="font-semibold text-warm-gray w-24 shrink-0">Seg a Sex</dt>
    <dd class="text-ink m-0">08h às 17h</dd>
  </div>
  <div class="flex items-start gap-3">
    <dt class="font-semibold text-warm-gray w-24 shrink-0">Sábado</dt>
    <dd class="text-ink m-0">08h às 13h</dd>
  </div>
  <div class="flex items-start gap-3">
    <dt class="font-semibold text-warm-gray w-24 shrink-0">WhatsApp</dt>
    <dd class="m-0"><a href={WA_GERAL} ...>21 99828-6443</a></dd>
  </div>
</dl>
```

- `span` → `dt` / `dd` apenas; classes idênticas, mais `m-0` nos `dd` para neutralizar a margem padrão do user-agent.
- Link do WhatsApp preservado exatamente (href, target, rel, classes).
- Nenhum texto alterado. `dt`/`dd` são block por padrão, mas dentro do `flex` do wrapper viram flex items iguais aos `span` atuais — sem impacto visual.

## 2. Canonical

Arquivo: `src/routes/index.tsx`, linha 68 — único `rel="canonical"` do projeto (`__root.tsx` não declara canonical, confirmado por busca).

- Valor atual: `href: "/"`
- Novo valor: `href: "https://lamiartrio.com.br/"`

Resultado: exatamente um `rel="canonical"` na homepage, sem risco de duplicação. `og:url` e demais metas ficam intocados, conforme pedido.

## Resumo

- Impacto visual: nenhum.
- Arquivos modificados: 1 (`src/routes/index.tsx`).
- Sem alterações em performance, imagens, fontes, CSS, JS, tags de tracking, title/description, Open Graph ou schema.
