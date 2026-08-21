# Fase 1 — Otimização de imagens (somente imagens)

Os arquivos WebP otimizados já foram gerados em `src/assets` (nenhum original foi apagado, nenhum código alterado ainda). Falta apenas trocar os imports — isso precisa da sua aprovação para sair do modo de planejamento.

## O que já foi gerado

Antes de redimensionar, conferi o maior tamanho real de exibição de cada imagem no código. Não existe lightbox, modal ou zoom em nenhuma imagem — o único efeito é `group-hover:scale-105` (5%) no catálogo e a troca de opacidade no antes/depois. Logo, o teto de ~2x o tamanho renderizado é seguro.

| Original | Tam. original | Dimensões orig. | Novo arquivo | Novo tam. | Novas dimensões | Redução |
|---|---|---|---|---|---|---|
| foto-13.png | 1307 KB | 1280x960 | foto-13-optimized.webp | 86 KB | 1200x900 | -93,4% |
| foto-14.png | 1021 KB | 1280x960 | foto-14-optimized.webp | 52 KB | 1200x900 | -94,8% |
| antes-rio.png | 2040 KB | 1586x992 | antes-rio-optimized.webp | 28 KB | 1586x992 | -98,6% |
| depois-rio.png | 1786 KB | 1586x992 | depois-rio-optimized.webp | 47 KB | 1586x992 | -97,3% |
| foto-15.png | 834 KB | 808x788 | foto-15-optimized.webp | 74 KB | 808x788 | -91,0% |
| foto-16.png | 1497 KB | 960x1280 | foto-16-optimized.webp | 90 KB | 900x1200 | -94,0% |
| foto-17.png | 572 KB | 600x600 | foto-17-optimized.webp | 39 KB | 600x600 | -93,2% |
| foto-18.png | 679 KB | 1032x581 | foto-18-optimized.webp | 37 KB | 1032x581 | -94,4% |
| foto-19.png | 1206 KB | 960x1280 | foto-19-optimized.webp | 65 KB | 900x1200 | -94,5% |
| foto-20.png | 764 KB | 1024x768 | foto-20-optimized.webp | 42 KB | 1024x768 | -94,4% |
| foto-21.png | 1003 KB | 1600x1200 | foto-21-optimized.webp | 36 KB | 1200x900 | -96,4% |
| foto-22.png | 1040 KB | 1280x960 | foto-22-optimized.webp | 76 KB | 1200x900 | -92,7% |
| foto-vinilico-3.png | 244 KB | 800x800 | foto-vinilico-3-optimized.webp | 47 KB | 800x800 | -80,4% |
| foto-28.png | 777 KB | 768x1024 | foto-28-optimized.webp | 60 KB | 768x1024 | -92,2% |
| foto-29.png | 2754 KB | 1200x1600 | foto-29-optimized.webp | 156 KB | 900x1200 | -94,3% |
| foto-30.png | 1788 KB | 1200x1600 | foto-30-optimized.webp | 87 KB | 900x1200 | -95,1% |
| antes-piso.png | 374 KB | 512x512 | antes-piso-optimized.webp | 34 KB | 512x512 | -90,7% |
| depois-piso.png | 354 KB | 512x512 | depois-piso-optimized.webp | 19 KB | 512x512 | -94,5% |
| lamiart-logo.png | 224 KB | 1920x640 | lamiart-logo-optimized.webp | 16 KB | 480x160 | -92,7% |
| logo-quick-step.png | 801 KB | 1672x941 | logo-quick-step-optimized.webp | 10 KB | 480x270 | -98,7% |
| logo-durafloor.png | 767 KB | 1672x941 | logo-durafloor-optimized.webp | 5 KB | 480x270 | -99,3% |

- Peso total antes: **21.841 KB (~21,3 MB)**
- Peso total otimizado: **1.117 KB (~1,1 MB)**
- Economia total: **-94,9% (~20,2 MB)**

Qualidade usada: 80–82 nas fotografias, 92 nas logos (sem compressão agressiva, transparência preservada via WebP RGBA).

Não foram tocados: `hero-sala.jpg`, `cliente-*.png`, favicon, `logo-tarkett.png` (30 KB, fora da lista).

## O que falta fazer (precisa de aprovação)

1. Em `src/routes/index.tsx`, apontar os 20 imports afetados para os arquivos `-optimized.webp` (troca de string no caminho do import, nada mais).
2. Em `src/routes/__root.tsx`, nada muda (favicon permanece).
3. Rodar o build e confirmar que nenhuma imagem quebra.

Nenhum original é deletado. Nada de CSS, JS, HTML, fontes, preload/fetchpriority, SEO ou Google Tag é alterado. Nenhuma dependência nova é instalada (a conversão foi feita com Pillow, já presente no sandbox).

## Detalhes técnicos

Os `<img>` continuam com as mesmas classes (`object-cover`, `object-contain`, `aspect-*`, alturas fixas), então proporção, recorte e responsividade permanecem idênticos. As reduções de dimensão respeitam ≥2x o maior tamanho renderizado: cards de produto ~600 px de largura (→1200), catálogo em 2 colunas ~600 px (→1200), antes/depois em largura de container 1216 px (dimensão original mantida), logo da Lamiart renderizada a 48 px de altura (→160), logos de marcas em caixa 240x112 (→480x270).
