import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroSala from "@/assets/hero-sala.jpg";
import antesImg from "@/assets/antes-piso-frio.jpg";
import depoisImg from "@/assets/depois-piso-laminado.jpg";

const WA_GERAL =
  "https://wa.me/5521964300089?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Lamiart%20e%20gostaria%20de%20um%20or%C3%A7amento.";
const WA_LAMINADO =
  "https://wa.me/5521964300089?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Lamiart%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20piso%20laminado.";
const WA_VINILICO =
  "https://wa.me/5521964300089?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Lamiart%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20piso%20vin%C3%ADlico.";
const WA_LAR =
  "https://wa.me/5521964300089?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Lamiart%20e%20quero%20mudar%20meu%20lar%20com%20pisos%20laminados%20ou%20vin%C3%ADlicos.";
const MAPS = "https://share.google/LBfAird7acc7IFfCW";
const INSTAGRAM = "https://www.instagram.com/lamiart_decoracao/";
const FACEBOOK = "https://www.facebook.com/lamiartdecoracao/?locale=pt_BR";

const SITE_TITLE = "Pisos Vinílicos e Laminados no Rio de Janeiro | Lamiart";
const SITE_DESC =
  "Venda e instalação de pisos vinílicos e laminados no Rio de Janeiro. Transforme sua casa ou empresa com a Lamiart. Orçamento pelo WhatsApp e parcelamento em até 10x.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroSala },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
      { name: "twitter:image", content: heroSala },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Lamiart Pisos e Revestimentos",
          image: "https://lamiart.com.br/logo.png",
          url: "https://lamiart.com.br",
          telephone: "+552131452004",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua Mário Piragibe, 43",
            addressLocality: "Méier",
            addressRegion: "RJ",
            addressCountry: "BR",
          },
          areaServed: "Rio de Janeiro",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "08:00",
              closes: "17:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: "Saturday",
              opens: "08:00",
              closes: "13:00",
            },
          ],
          sameAs: [INSTAGRAM, FACEBOOK],
        }),
      },
    ],
  }),
  component: LamiartLanding,
});

// ---------- Icons ----------
const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
  </svg>
);

const Star = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
    <path d="M12 .587l3.668 7.568L24 9.75l-6 5.853L19.336 24 12 19.897 4.664 24 6 15.603 0 9.75l8.332-1.595z" />
  </svg>
);

// ---------- Components ----------
function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#inicio", label: "Início" },
    { href: "#produtos", label: "Produtos" },
    { href: "#antes-depois", label: "Antes e Depois" },
    { href: "#marcas", label: "Marcas" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#catalogo", label: "Catálogo" },
    { href: "#faq", label: "FAQ" },
    { href: "#localizacao", label: "Localização" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-warm-white/85 backdrop-blur-md border-b border-border">
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <a href="#inicio" className="flex items-center gap-2 font-display font-extrabold text-xl md:text-2xl tracking-tight">
          <span className="text-lamiart-red">Lam</span>
          <span className="text-ink -ml-2">iart</span>
        </a>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-ink/80">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-lamiart-red transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={WA_GERAL}
            target="_blank"
            rel="noopener"
            className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-4"
            aria-label="Solicitar orçamento no WhatsApp"
          >
            Solicitar orçamento
          </a>
          <a
            href={WA_GERAL}
            target="_blank"
            rel="noopener"
            className="sm:hidden inline-flex items-center justify-center h-11 w-11 rounded-full bg-whatsapp text-white"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-full border border-border text-ink"
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-border bg-warm-white">
          <ul className="container-x py-3 flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-ink/85 hover:text-lamiart-red"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2 pb-3">
              <a href={WA_GERAL} target="_blank" rel="noopener" className="btn-primary w-full">
                <WhatsAppIcon /> Solicitar orçamento
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative pt-24 md:pt-28 pb-12 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-beige-light/40 via-warm-white to-warm-white" />
      <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="fade-up">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lamiart-red/10 text-lamiart-red text-xs font-semibold uppercase tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-lamiart-red animate-pulse" />
            Lamiart — Méier, Rio de Janeiro
          </span>
          <h1 className="mt-5 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-ink">
            Pisos vinílicos e laminados no{" "}
            <span className="text-lamiart-red">Rio de Janeiro</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-warm-gray max-w-xl">
            Transforme sua casa ou empresa com pisos que trazem{" "}
            <strong className="text-ink">conforto, beleza e aconchego</strong>. A Lamiart vende e instala
            pisos vinílicos e laminados com atendimento especializado no Rio de Janeiro.
          </p>
          <p className="mt-4 inline-block bg-ink text-warm-white text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full">
            Renove seu ambiente e parcele em até 10x
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a href={WA_GERAL} target="_blank" rel="noopener" className="btn-whatsapp text-base">
              <WhatsAppIcon /> Quero um orçamento no WhatsApp
            </a>
            <a href="#produtos" className="btn-outline text-base">
              Ver opções de pisos
            </a>
          </div>
          <p className="mt-3 text-xs text-warm-gray">Atendimento rápido pelo WhatsApp · Venda e instalação no RJ</p>

          <ul className="mt-8 grid grid-cols-2 gap-3 max-w-lg">
            {[
              "Venda e instalação",
              "Residencial e comercial",
              "Parcele em até 10x",
              "Atendimento no Rio de Janeiro",
            ].map((t) => (
              <li key={t} className="card-soft px-4 py-3 text-sm font-medium text-ink flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-lamiart-red shrink-0" />
                <span className="min-w-0">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative fade-up">
          <div className="relative rounded-3xl overflow-hidden shadow-warm aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
            <img
              src={heroSala}
              alt="Sala aconchegante com piso laminado amadeirado instalado pela Lamiart"
              width={1536}
              height={1152}
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 bg-lamiart-red text-white rounded-2xl px-4 py-3 shadow-red rotate-[-4deg]">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-90">Lamiart</p>
            <p className="text-sm sm:text-base font-extrabold uppercase">Venda + Instalação</p>
          </div>
          <div className="hidden md:flex absolute -bottom-5 -right-3 bg-warm-white card-soft px-4 py-3 items-center gap-3 max-w-[220px]">
            <div className="flex text-lamiart-red">
              <Star /><Star /><Star /><Star /><Star />
            </div>
            <p className="text-xs text-warm-gray leading-tight">
              Clientes satisfeitos no <strong className="text-ink">Rio de Janeiro</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Promessa() {
  const cards = [
    { t: "Mais aconchego", d: "Texturas e tons que deixam o ambiente mais quente, bonito e convidativo." },
    { t: "Instalação prática", d: "Soluções modernas para renovar com menos transtorno e mais agilidade." },
    { t: "Visual sofisticado", d: "Acabamentos elegantes para projetos residenciais e comerciais." },
    { t: "Pagamento facilitado", d: "Renove seu ambiente com parcelamento em até 10x." },
  ];
  return (
    <section className="section-pad bg-beige-light/40">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
            Seu piso muda a sensação de <span className="text-lamiart-red">todo o ambiente</span>
          </h2>
          <p className="mt-4 text-warm-gray text-base sm:text-lg">
            Um bom piso não é apenas acabamento. Ele muda a percepção do espaço, deixa o ambiente
            mais confortável e valoriza sua casa, apartamento, escritório ou loja.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <article
              key={c.t}
              className="card-soft p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="h-10 w-10 rounded-xl bg-lamiart-red/10 text-lamiart-red flex items-center justify-center font-display font-bold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 font-display font-bold text-lg text-ink">{c.t}</h3>
              <p className="mt-2 text-sm text-warm-gray leading-relaxed">{c.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  tag,
  title,
  copy,
  benefits,
  highlight,
  cta,
  href,
  accent,
}: {
  tag: string;
  title: string;
  copy: string;
  benefits: string[];
  highlight: string;
  cta: string;
  href: string;
  accent: "wood" | "caramel";
}) {
  return (
    <article className="card-soft overflow-hidden flex flex-col">
      <div
        className={`relative h-44 sm:h-52 flex items-end p-6 ${
          accent === "wood"
            ? "bg-gradient-to-br from-wood to-wood-dark"
            : "bg-gradient-to-br from-caramel to-wood"
        }`}
      >
        <div className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.15) 0 2px, transparent 2px 18px)",
          }}
        />
        <div className="relative">
          <span className="inline-block bg-warm-white/95 text-ink text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {tag}
          </span>
          <h3 className="mt-3 text-white font-display font-extrabold text-3xl sm:text-4xl drop-shadow">
            {title}
          </h3>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="text-warm-gray text-sm sm:text-base leading-relaxed">{copy}</p>
        <ul className="mt-5 space-y-2">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-ink">
              <svg className="h-5 w-5 text-lamiart-red shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-xl bg-ink text-warm-white text-center text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-3">
          {highlight}
        </div>
        <a href={href} target="_blank" rel="noopener" className="btn-whatsapp mt-5 w-full">
          <WhatsAppIcon /> {cta}
        </a>
      </div>
    </article>
  );
}

function Produtos() {
  return (
    <section id="produtos" className="section-pad">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-lamiart-red">Nossos produtos</span>
          <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
            Escolha o piso ideal para o seu ambiente
          </h2>
          <p className="mt-4 text-warm-gray text-base sm:text-lg">
            Na Lamiart, você encontra pisos vinílicos e laminados com{" "}
            <strong className="text-ink">venda e instalação no Rio de Janeiro</strong>.
          </p>
        </div>
        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          <ProductCard
            tag="Para sua casa ou empresa"
            title="Piso Laminado"
            copy="O piso laminado é ideal para quem busca beleza, conforto e ótimo custo-benefício. Ele traz o visual acolhedor da madeira, combina com ambientes internos e deixa salas, quartos e escritórios mais elegantes."
            benefits={[
              "Visual amadeirado e aconchegante",
              "Ótimo custo-benefício",
              "Instalação prática",
              "Ideal para quartos, salas e escritórios",
              "Excelente para residências e comércios",
            ]}
            highlight="Venda e instalação no Rio de Janeiro"
            cta="Quero saber mais sobre piso laminado"
            href={WA_LAMINADO}
            accent="wood"
          />
          <ProductCard
            tag="Moderno e silencioso"
            title="Piso Vinílico"
            copy="O piso vinílico é uma solução moderna, confortável e silenciosa. É perfeito para quem busca praticidade, resistência e um acabamento sofisticado para casas, apartamentos, lojas e escritórios."
            benefits={[
              "Conforto acústico",
              "Toque agradável",
              "Fácil manutenção",
              "Visual moderno e versátil",
              "Ideal para ambientes residenciais e comerciais",
            ]}
            highlight="Praticidade, conforto e acabamento profissional"
            cta="Quero saber mais sobre piso vinílico"
            href={WA_VINILICO}
            accent="caramel"
          />
        </div>
      </div>
    </section>
  );
}

function AntesDepois() {
  const [revealed, setRevealed] = useState(false);
  return (
    <section id="antes-depois" className="section-pad bg-ink text-warm-white">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-lamiart-red">Transformação real</span>
          <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl leading-tight">
            Aperte na imagem e veja a transformação
          </h2>
          <p className="mt-4 text-warm-white/70 text-base sm:text-lg">
            Veja como um ambiente frio pode se transformar em um espaço mais quente, bonito e aconchegante.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setRevealed((v) => !v)}
          className="mt-8 relative w-full rounded-3xl overflow-hidden shadow-warm group focus:outline-none focus:ring-4 focus:ring-lamiart-red/50"
          aria-label="Aperte para revelar o depois"
        >
          <div className="relative aspect-[4/3] sm:aspect-[16/9]">
            <img
              src={antesImg}
              alt="Antes: ambiente frio sem piso instalado"
              width={1280}
              height={896}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <img
              src={depoisImg}
              alt="Depois: ambiente renovado com piso laminado Lamiart"
              width={1280}
              height={896}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                revealed ? "opacity-100" : "opacity-0"
              }`}
            />

            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-warm-white/95 text-ink text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
              {revealed ? "Depois: ambiente renovado" : "Antes: ambiente frio"}
            </span>

            {!revealed && (
              <div className="absolute inset-0 grid place-items-center bg-ink/30">
                <div className="bg-lamiart-red text-white font-display font-extrabold uppercase tracking-wider text-sm sm:text-base px-5 py-3 rounded-full shadow-red animate-pulse">
                  Aperte na imagem
                </div>
              </div>
            )}
            {revealed && (
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-lamiart-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                Toque para ver o antes
              </div>
            )}
          </div>
        </button>

        <div className="mt-8 flex justify-center">
          <a href={WA_LAR} target="_blank" rel="noopener" className="btn-whatsapp text-base">
            <WhatsAppIcon /> Quero mudar meu lar
          </a>
        </div>
      </div>
    </section>
  );
}

function Marcas() {
  const marcas = ["Tarkett", "Eucafloor", "Quick-Step", "Durafloor"];
  const repeated = [...marcas, ...marcas, ...marcas];
  return (
    <section id="marcas" className="section-pad bg-warm-white">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
            Trabalhamos com marcas reconhecidas
          </h2>
          <p className="mt-4 text-warm-gray text-base sm:text-lg">
            Produtos selecionados para entregar beleza, durabilidade e acabamento de qualidade.
          </p>
        </div>
      </div>
      <div className="mt-10 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-warm-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-warm-white to-transparent z-10 pointer-events-none" />
        <div className="marquee-track gap-5 px-5">
          {repeated.map((m, i) => (
            <div
              key={`${m}-${i}`}
              className="card-soft shrink-0 aspect-video w-64 sm:w-80 grid place-items-center bg-beige-light/30"
            >
              <span className="font-display font-bold text-2xl sm:text-3xl text-wood-dark">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Depoimentos() {
  const items = Array.from({ length: 5 }).map((_, i) => ({
    name: `Nome do cliente ${i + 1}`,
    text: "Cole aqui uma avaliação real do Google Meu Negócio.",
  }));
  return (
    <section id="depoimentos" className="section-pad bg-beige-light/40">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-lamiart-red">Depoimentos</span>
          <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
            O que os clientes dizem sobre a Lamiart
          </h2>
          <p className="mt-4 text-warm-gray text-base sm:text-lg">
            Avaliações reais de clientes que confiaram na Lamiart para transformar seus ambientes.
          </p>
        </div>
      </div>
      <div className="mt-10 overflow-x-auto snap-x snap-mandatory scroll-px-5 no-scrollbar">
        <ul className="flex gap-4 px-5 sm:px-8 pb-4">
          {items.map((d, i) => (
            <li
              key={i}
              className="snap-start shrink-0 w-[85%] sm:w-[360px] card-soft p-6 flex flex-col"
            >
              <div className="flex items-center gap-2 text-lamiart-red">
                <Star /><Star /><Star /><Star /><Star />
                <span className="ml-auto text-[10px] uppercase tracking-wider text-warm-gray font-semibold">
                  Google
                </span>
              </div>
              <p className="mt-4 text-ink leading-relaxed">"{d.text}"</p>
              <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-lamiart-red/10 text-lamiart-red font-display font-bold grid place-items-center">
                  {d.name[0]}
                </div>
                <div>
                  <p className="font-display font-semibold text-ink text-sm">{d.name}</p>
                  <p className="text-xs text-warm-gray">Cliente Lamiart</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-center text-xs text-warm-gray mt-2">Depoimentos reais de clientes Lamiart.</p>
    </section>
  );
}

function CatalogGrid({
  id,
  title,
  subtitle,
  prefix,
  overlay,
  cta,
  href,
}: {
  id: string;
  title: string;
  subtitle: string;
  prefix: string;
  overlay: string;
  cta: string;
  href: string;
}) {
  const items = Array.from({ length: 9 }).map((_, i) => ({
    src: `/images/${prefix}-${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `${overlay} Lamiart ${i + 1}`,
  }));
  return (
    <section id={id} className="section-pad">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink leading-tight">{title}</h2>
          <p className="mt-4 text-warm-gray text-base sm:text-lg">{subtitle}</p>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {items.map((it, i) => (
            <figure
              key={i}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-beige-light shadow-soft"
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-wood/30 to-wood-dark/40 group-hover:opacity-0 transition-opacity" />
              <figcaption className="absolute bottom-2 left-2 right-2 bg-ink/75 text-warm-white text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-full text-center backdrop-blur-sm">
                {overlay}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <a href={href} target="_blank" rel="noopener" className="btn-whatsapp text-base">
            <WhatsAppIcon /> {cta}
          </a>
        </div>
      </div>
    </section>
  );
}

function RedesSociais() {
  const posts = [
    "https://www.instagram.com/reel/DMvJ0agxDy1/",
    "https://www.instagram.com/p/DUoCYq-EcZZ/",
    "https://www.instagram.com/reel/DHvuJPKx12q/",
  ];
  return (
    <section className="section-pad bg-beige-light/40">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
            Acompanhe a Lamiart nas redes sociais
          </h2>
          <p className="mt-4 text-warm-gray text-base sm:text-lg">
            Veja ideias, inspirações e transformações de ambientes.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {posts.map((url, i) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener"
              className="group card-soft overflow-hidden flex flex-col"
            >
              <div className="relative aspect-square bg-gradient-to-br from-caramel via-wood to-wood-dark grid place-items-center overflow-hidden">
                <div className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,.2) 0 1px, transparent 1px 12px)" }}
                />
                <svg viewBox="0 0 24 24" className="h-14 w-14 text-white relative" fill="currentColor" aria-hidden>
                  <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.22.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.05.42 2.22.06 1.26.07 1.64.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.42 2.22a3.7 3.7 0 01-.9 1.38c-.42.42-.82.68-1.38.9-.42.17-1.05.37-2.22.42-1.26.06-1.64.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.22-.42a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.17-.42-.37-1.05-.42-2.22C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.42-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.05-.37 2.22-.42C8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7 .07 5.7.13 4.8.33 4 .65a5.9 5.9 0 00-2.13 1.39A5.9 5.9 0 00.48 4.17C.16 4.97-.04 5.87-.1 7.17-.17 8.46-.17 8.87-.17 12.17s0 3.7.07 5c.06 1.3.26 2.2.58 3a5.9 5.9 0 001.39 2.13A5.9 5.9 0 004 23.69c.8.32 1.7.52 3 .58 1.3.07 1.7.07 5 .07s3.7 0 5-.07c1.3-.06 2.2-.26 3-.58a5.9 5.9 0 002.13-1.39 5.9 5.9 0 001.39-2.13c.32-.8.52-1.7.58-3 .07-1.3.07-1.7.07-5s0-3.7-.07-5c-.06-1.3-.26-2.2-.58-3a5.9 5.9 0 00-1.39-2.13A5.9 5.9 0 0020 .65c-.8-.32-1.7-.52-3-.58C15.7 0 15.3 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.4-10.4a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" />
                </svg>
                <span className="absolute bottom-3 left-3 right-3 text-center text-[10px] font-bold uppercase tracking-wider text-white/90">
                  Post {i + 1} no Instagram
                </span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">@lamiart_decoracao</span>
                <span className="text-xs text-lamiart-red font-semibold group-hover:underline">Ver no Instagram →</span>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <a href={INSTAGRAM} target="_blank" rel="noopener" className="btn-outline">
            Ver Instagram da Lamiart
          </a>
        </div>
      </div>
    </section>
  );
}

function Localizacao() {
  return (
    <section id="localizacao" className="section-pad">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
            Visite a Lamiart no <span className="text-lamiart-red">Méier</span>
          </h2>
          <p className="mt-4 text-warm-gray text-base sm:text-lg">
            Venha conhecer opções de pisos laminados, vinílicos e revestimentos para o seu projeto.
          </p>
        </div>
        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          <div className="card-soft p-6 sm:p-8">
            <h3 className="font-display font-bold text-xl text-ink">Endereço e atendimento</h3>
            <p className="mt-3 text-ink">Rua Mário Piragibe, 43 — Méier — RJ</p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="font-semibold text-warm-gray w-24 shrink-0">Seg a Sex</span>
                <span className="text-ink">08h às 17h</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-warm-gray w-24 shrink-0">Sábado</span>
                <span className="text-ink">08h às 13h</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-warm-gray w-24 shrink-0">Telefone</span>
                <a href="tel:+552131452004" className="text-ink hover:text-lamiart-red">(21) 3145-2004</a>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-warm-gray w-24 shrink-0">Telefone</span>
                <a href="tel:+552125760046" className="text-ink hover:text-lamiart-red">(21) 2576-0046</a>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-warm-gray w-24 shrink-0">WhatsApp</span>
                <a href={WA_GERAL} target="_blank" rel="noopener" className="text-whatsapp font-semibold">21 96430-0089</a>
              </div>
            </dl>
            <a href={MAPS} target="_blank" rel="noopener" className="btn-primary mt-7 w-full sm:w-auto">
              Ir até lá
            </a>
          </div>
          <a
            href={MAPS}
            target="_blank"
            rel="noopener"
            className="card-soft overflow-hidden relative min-h-[280px] lg:min-h-full block group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-beige-light via-beige-sand to-wood/40" />
            <div className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
              <div className="h-14 w-14 rounded-full bg-lamiart-red text-white grid place-items-center shadow-red group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>
              </div>
              <p className="mt-4 font-display font-bold text-ink">Méier — Rio de Janeiro</p>
              <p className="mt-1 text-sm text-warm-gray">Toque para abrir no Google Maps</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    {
      q: "Qual a diferença entre piso vinílico e piso laminado?",
      a: "O piso laminado tem visual amadeirado e ótimo custo-benefício para ambientes internos. O piso vinílico é moderno, confortável, silencioso e muito prático para residências e espaços comerciais. A melhor escolha depende do ambiente, uso e objetivo do projeto.",
    },
    { q: "A Lamiart faz venda e instalação?", a: "Sim. A Lamiart trabalha com venda e instalação de pisos vinílicos e laminados no Rio de Janeiro." },
    { q: "Posso parcelar meu piso?", a: "Sim. A Lamiart oferece parcelamento em até 10x. Fale com a equipe pelo WhatsApp para consultar as condições." },
    { q: "O piso vinílico é indicado para empresas?", a: "Sim. O piso vinílico pode ser uma ótima opção para escritórios, lojas e ambientes comerciais, pois oferece conforto, praticidade e visual moderno." },
    { q: "O piso laminado deixa o ambiente mais aconchegante?", a: "Sim. O piso laminado traz o visual da madeira e ajuda a criar uma sensação mais quente, elegante e acolhedora no ambiente." },
    { q: "Atendem em todo o Rio de Janeiro?", a: "A Lamiart atende clientes no Rio de Janeiro. Para confirmar disponibilidade de instalação na sua região, fale pelo WhatsApp." },
    { q: "Preciso ir até a loja?", a: "Você pode falar primeiro pelo WhatsApp para tirar dúvidas e pedir orçamento. Se preferir, também pode visitar a loja no Méier." },
  ];
  return (
    <section id="faq" className="section-pad bg-beige-light/40">
      <div className="container-x max-w-3xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-lamiart-red">Dúvidas frequentes</span>
          <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
            Dúvidas sobre pisos vinílicos e laminados
          </h2>
          <p className="mt-4 text-warm-gray text-base sm:text-lg">
            Veja respostas rápidas para escolher o piso ideal para seu ambiente.
          </p>
        </div>
        <div className="mt-8 space-y-3">
          {items.map((it) => (
            <details key={it.q} className="card-soft group p-0 overflow-hidden">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 font-display font-semibold text-ink">
                <span>{it.q}</span>
                <span className="h-8 w-8 shrink-0 rounded-full bg-lamiart-red/10 text-lamiart-red grid place-items-center transition-transform group-open:rotate-45">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 -mt-1 text-warm-gray leading-relaxed text-sm sm:text-base">
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaFinal() {
  return (
    <section className="relative py-20 md:py-28 bg-ink text-warm-white overflow-hidden">
      <div className="absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(216,0,54,0.45), transparent 50%), radial-gradient(ellipse at bottom right, rgba(185,130,75,0.35), transparent 55%)",
        }}
      />
      <div className="container-x relative text-center max-w-3xl">
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl leading-tight">
          Pronto para transformar <span className="text-lamiart-red">seu ambiente?</span>
        </h2>
        <p className="mt-5 text-warm-white/75 text-base sm:text-lg">
          Fale com a Lamiart e descubra a melhor opção de piso para sua casa, apartamento,
          escritório ou loja.
        </p>
        <p className="mt-6 inline-block bg-lamiart-red text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-full">
          Peça seu orçamento pelo WhatsApp e parcele em até 10x
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href={WA_GERAL} target="_blank" rel="noopener" className="btn-whatsapp text-base">
            <WhatsAppIcon /> Solicitar orçamento agora
          </a>
          <a
            href="https://lamiart.com.br"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-warm-white/40 text-warm-white font-display font-semibold hover:bg-warm-white hover:text-ink transition-colors"
          >
            Conheça outros produtos Lamiart
          </a>
        </div>
        <p className="mt-4 text-xs text-warm-white/60">Atendimento rápido pelo WhatsApp · Fale com a equipe Lamiart</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-warm-white/80 border-t border-white/10">
      <div className="container-x py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-display font-extrabold text-2xl text-warm-white">
            <span className="text-lamiart-red">Lam</span>iart
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Pisos, revestimentos e soluções para transformar ambientes com beleza, conforto e praticidade.
          </p>
        </div>
        <div>
          <h3 className="font-display font-semibold text-warm-white mb-3 text-sm uppercase tracking-wider">Atendimento</h3>
          <ul className="space-y-2 text-sm">
            <li>Segunda a sexta: 08h às 17h</li>
            <li>Sábado: 08h às 13h</li>
          </ul>
        </div>
        <div>
          <h3 className="font-display font-semibold text-warm-white mb-3 text-sm uppercase tracking-wider">Contato</h3>
          <ul className="space-y-2 text-sm">
            <li>Rua Mário Piragibe, 43 — Méier — RJ</li>
            <li><a href="tel:+552131452004" className="hover:text-warm-white">Tel: (21) 3145-2004</a></li>
            <li><a href="tel:+552125760046" className="hover:text-warm-white">Tel: (21) 2576-0046</a></li>
            <li><a href={WA_GERAL} target="_blank" rel="noopener" className="hover:text-warm-white">WhatsApp: 21 96430-0089</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display font-semibold text-warm-white mb-3 text-sm uppercase tracking-wider">Redes sociais</h3>
          <ul className="space-y-2 text-sm">
            <li><a href={INSTAGRAM} target="_blank" rel="noopener" className="hover:text-warm-white">Instagram @lamiart_decoracao</a></li>
            <li><a href={FACEBOOK} target="_blank" rel="noopener" className="hover:text-warm-white">Facebook /lamiartdecoracao</a></li>
            <li><a href="https://lamiart.com.br" target="_blank" rel="noopener" className="hover:text-warm-white">lamiart.com.br</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-warm-white/60 text-center">
          © 2026 Lamiart Pisos e Revestimentos. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WA_GERAL}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-whatsapp text-white grid place-items-center shadow-[0_18px_40px_-12px_rgba(37,211,102,0.7)] hover:scale-105 transition-transform"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-60 animate-ping" />
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8 relative" />
    </a>
  );
}

function LamiartLanding() {
  return (
    <div className="min-h-screen bg-warm-white text-ink">
      <Header />
      <main>
        <Hero />
        <Promessa />
        <Produtos />
        <AntesDepois />
        <Marcas />
        <Depoimentos />
        <CatalogGrid
          id="catalogo"
          title="Catálogo de pisos laminados"
          subtitle="Veja algumas opções de texturas, tons e acabamentos para transformar seu ambiente."
          prefix="laminado"
          overlay="Laminado amadeirado"
          cta="Pedir orçamento de piso laminado"
          href={WA_LAMINADO}
        />
        <CatalogGrid
          id="catalogo-vinilico"
          title="Catálogo de pisos vinílicos"
          subtitle="Opções modernas, práticas e confortáveis para casas, apartamentos, lojas e escritórios."
          prefix="vinilico"
          overlay="Vinílico moderno"
          cta="Pedir orçamento de piso vinílico"
          href={WA_VINILICO}
        />
        <RedesSociais />
        <Localizacao />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
