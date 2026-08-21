# Prioridade das imagens acima da dobra — análise

## Estado real do código (verificado agora)
- `src/routes/index.tsx` linha 123 (logo do header): já possui `fetchPriority="high"` (adicionado na medição anterior).
- `src/routes/index.tsx` linha 205 (hero): já possui `fetchPriority="high"`.
- Nenhuma das duas usa `loading="lazy"`; ambas estão no HTML inicial.
- Não existe `<link rel="preload">` para imagens.

Conclusão: a configuração que você pediu para avaliar **já é exatamente a configuração atual**. Nenhuma alteração de código é necessária.

## Recomendação: manter `high` nas duas
Sim, é tecnicamente adequado. Motivos:
- Os testes A e B mostram que o elemento LCP alterna entre logo e hero conforme timing/viewport. Priorizar apenas um deixa o outro cenário sem proteção — foi o que produziu o LCP de 5,3 s no Teste B.
- `fetchpriority` não reserva banda exclusiva; apenas reordena a fila do navegador. Com 16 KB + 125 KB, os dois juntos cabem folgadamente em qualquer conexão que o Lighthouse mobile simula (~1,6 Mbps ⇒ ~0,7 s para os dois, e o logo termina em ~80 ms).
- O logo, sendo 8x menor, é servido praticamente "de graça" antes do hero, então subir sua prioridade não atrasa o hero de forma mensurável.

## Riscos
- Risco real: baixo. O único efeito colateral possível é que as duas imagens competem com o CSS e o JS na fila inicial; como `high` em imagem não ultrapassa CSS bloqueante, não há inversão perigosa.
- Risco de diluição: se mais recursos forem marcados como `high` no futuro, o sinal perde valor. Regra a manter: no máximo estes dois.
- A variação 90 vs 75 entre execuções sugere que boa parte da diferença é ruído de rede/ambiente do Lighthouse, não configuração. Duas ou três execuções por cenário são necessárias antes de concluir qualquer ganho.

## Preload — concordo em não usar agora
Ambas as imagens já são descobertas pelo pre-scanner no HTML inicial, então `preload` não antecipa a descoberta; só duplicaria a prioridade que `fetchpriority` já dá. Além disso, o hash do Vite nos nomes dos arquivos torna fácil errar a URL do preload e baixar a imagem duas vezes.

## Alternativa (só se a medição futura mostrar o hero atrasando)
Se, com as duas em `high`, o hero continuar sendo o LCP lento no mobile: o próximo passo correto não é mexer em prioridade, e sim reduzir o peso/resolução entregue no mobile (o arquivo tem 1536x1152 para uma coluna que no celular fica abaixo do texto). Isso seria uma fase separada, fora do escopo atual.

## Ação proposta nesta fase
Nenhuma alteração de arquivo. Apenas confirmar o estado atual e medir novamente (3 execuções mobile) para separar ganho real de ruído.
