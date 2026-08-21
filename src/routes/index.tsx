import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import heroSala from "@/assets/hero-sala.jpg";
import lamiartLogo from "@/assets/lamiart-logo-optimized.webp";
import pisoLaminadoBg from "@/assets/foto-13-optimized.webp";
import pisoVinilicoBg from "@/assets/foto-14-optimized.webp";
import antesImg from "@/assets/antes-rio-optimized.webp";
import depoisImg from "@/assets/depois-rio-optimized.webp";
import logoTarkett from "@/assets/logo-tarkett.png";

import logoQuickStep from "@/assets/logo-quick-step-optimized.webp";
import logoDurafloor from "@/assets/logo-durafloor-optimized.webp";
import cliRogerio from "@/assets/cliente-rogerio.png";
import cliClaudio from "@/assets/cliente-claudio.png";
import cliJose from "@/assets/cliente-jose.png";
import cliMarli from "@/assets/cliente-marli.png";
import cliLeticia from "@/assets/cliente-leticia.png";
import cliLais from "@/assets/cliente-lais.png";
import lam1 from "@/assets/foto-15-optimized.webp";
import lam2 from "@/assets/foto-16-optimized.webp";
import lam3 from "@/assets/foto-17-optimized.webp";
import lam4 from "@/assets/foto-18-optimized.webp";
import lam5 from "@/assets/foto-19-optimized.webp";
import lam6 from "@/assets/foto-20-optimized.webp";
import vin1 from "@/assets/foto-21-optimized.webp";
import vin2 from "@/assets/foto-22-optimized.webp";
import vin3 from "@/assets/foto-vinilico-3-optimized.webp";
import vin4 from "@/assets/foto-28-optimized.webp";
import vin5 from "@/assets/foto-29-optimized.webp";
import vin6 from "@/assets/foto-30-optimized.webp";


const WA_GERAL =
  "https://wa.me/5521998286443?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Lamiart%20e%20gostaria%20de%20um%20or%C3%A7amento.";
const WA_LAMINADO =
  "https://wa.me/5521998286443?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Lamiart%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20piso%20laminado.";
const WA_VINILICO =
  "https://wa.me/5521998286443?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Lamiart%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20piso%20vin%C3%ADlico.";
const WA_LAR =
  "https://wa.me/5521998286443?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Lamiart%20e%20quero%20mudar%20meu%20lar%20com%20pisos%20laminados%20ou%20vin%C3%ADlicos.";
const MAPS =
  "https://www.google.com/maps/place/L%C3%A2miart+Pisos+e+Revestimentos+Ltda/@-22.9094224,-43.2878216,17z/data=!4m6!3m5!1s0x997d50ad7890f3:0xecc065c118c628ac!8m2!3d-22.9094224!4d-43.2852467!16s%2Fg%2F11sfrkx9c5";
const MAPS_REVIEWS =
  "https://www.google.com/maps/place/L%C3%A2miart+Pisos+e+Revestimentos+Ltda/@-22.9094224,-43.2878216,17z/data=!4m8!3m7!1s0x997d50ad7890f3:0xecc065c118c628ac!8m2!3d-22.9094224!4d-43.2852467!9m1!1b1!16s%2Fg%2F11sfrkx9c5";
const MAPS_EMBED =
  "https://www.google.com/maps?q=L%C3%A2miart+Pisos+e+Revestimentos+Ltda,+Rua+M%C3%A1rio+Piragibe,+43,+M%C3%A9ier,+Rio+de+Janeiro&output=embed";
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
          sameAs: [INSTAGRAM, FACEBOOK],
        }),
      },
    ],
  }),
  component: LamiartLanding,
});

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
        <a href="#inicio" className="flex items-center" aria-label="Lamiart">
          <img src={lamiartLogo} alt="Lamiart Pisos & Revestimentos" width={480} height={160} className="h-9 md:h-12 w-auto" fetchPriority="high" />
        </a>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-ink/80">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-lamiart-red transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={WA_GERAL} target="_blank" rel="noopener" className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-4">
            Solicitar orçamento
          </a>
          <a href={WA_GERAL} target="_blank" rel="noopener" className="sm:hidden inline-flex items-center justify-center h-11 w-11 rounded-full bg-whatsapp text-white" aria-label="WhatsApp">
            <WhatsAppIcon />
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-full border border-border text-ink" aria-label="Abrir menu" aria-expanded={open}>
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
                <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-base font-medium text-ink/85 hover:text-lamiart-red">
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
        
          <h1 className="mt-5 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-ink">
            Os Melhores Pisos Vinílicos e Laminados no <span className="text-lamiart-red">Rio de Janeiro</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-warm-gray max-w-xl">
            Transforme sua casa ou empresa com pisos que trazem{" "}
            <strong className="text-ink">conforto, beleza e aconchego</strong>. A Lamiart vende e instala pisos vinílicos e laminados com atendimento especializado no Rio de Janeiro.
          </p>
          <p className="mt-4 inline-block bg-ink text-warm-white text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full">
            Renove seu ambiente e parcele em até 10x
          </p>
          <p className="mt-3 block sm:inline-block bg-ink text-warm-white text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full w-fit">
            Atendimento de segunda a domingo das 8 às 22
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a href={WA_GERAL} target="_blank" rel="noopener" className="btn-whatsapp text-base">
              <WhatsAppIcon /> Quero um orçamento no WhatsApp
            </a>
            <a href="tel:+5521998286443" className="btn-primary text-base">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M6.62 10.79c1.06 2.98 3.24 5.17 6.22 6.22l2.08-2.08a.996.996 0 011.05-.24c1.13.37 2.35.57 3.6.57.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C10.4 21 3 13.6 3 4.5c0-.55.45-1 1-1H7.5c.55 0 1 .45 1 1 0 1.25.2 2.47.57 3.6.11.35.03.74-.24 1.02l-2.08 2.08z" />
              </svg>
              Ligar agora
            </a>
            <a href="#produtos" className="btn-outline text-base">Ver opções de pisos</a>
          </div>
          <p className="mt-3 text-xs text-warm-gray">Atendimento rápido pelo WhatsApp · Venda e instalação no RJ</p>
        </div>

        <div className="relative fade-up">
          <div className="relative rounded-3xl overflow-hidden shadow-warm aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
            <img src={heroSala} alt="Sala aconchegante com piso laminado" width={1536} height={1152} className="w-full h-full object-cover" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 bg-lamiart-red text-white rounded-2xl px-4 py-3 shadow-red rotate-[-4deg]">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-90">Lamiart</p>
            <p className="text-sm sm:text-base font-extrabold uppercase">Venda com Instalação</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Promessa() {
  const cards = [
    { t: "Mais aconchego", d: "Texturas e tons que deixam o ambiente mais quente, bonito e convidativo." },
    { t: "Sem quebra-quebra", d: "Instalação prática e limpa, sem demolição. Renove com agilidade e sem transtorno." },
    { t: "Visual sofisticado", d: "Acabamentos elegantes para projetos residenciais e comerciais." },
    { t: "Pagamento facilitado", d: "Renove seu ambiente com parcelamento em até 10x." },
  ];
  return (
    <section className="section-pad bg-lamiart-red text-warm-white">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
            Seu piso muda a sensação de <span className="text-warm-white underline decoration-warm-white/40 underline-offset-4">todo o ambiente</span>
          </h2>
          <p className="mt-4 text-warm-white/85 text-base sm:text-lg">
            Um bom piso não é apenas acabamento. Ele muda a percepção do espaço, deixa o ambiente mais confortável e valoriza sua casa, apartamento, escritório ou loja.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <article key={c.t} className="rounded-2xl p-6 bg-warm-white/10 backdrop-blur-sm border border-warm-white/15 hover:-translate-y-1 transition-transform duration-300">
              <div className="h-10 w-10 rounded-xl bg-warm-white text-lamiart-red flex items-center justify-center font-display font-bold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 font-display font-bold text-lg text-warm-white">{c.t}</h3>
              <p className="mt-2 text-sm text-warm-white/80 leading-relaxed">{c.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  tag, title, copy, benefits, highlight, cta, href, bgImage,
}: {
  tag: string; title: string; copy: string; benefits: string[];
  highlight: string; cta: string; href: string; bgImage: string;
}) {
  return (
    <article className="card-soft overflow-hidden flex flex-col">
      <div className="relative h-56 sm:h-64 flex items-end p-6">
        <img src={bgImage} alt={title} width={1200} height={900} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent" />
        <div className="relative">
          <span className="inline-block bg-warm-white/95 text-ink text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {tag}
          </span>
          <h3 className="mt-3 text-white font-display font-extrabold text-3xl sm:text-4xl drop-shadow">{title}</h3>
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
            highlight="Elegância, economia e praticidade"
            cta="Quero saber mais sobre piso laminado"
            href={WA_LAMINADO}
            bgImage={pisoLaminadoBg}
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
            highlight="Conforto, silêncio e durabilidade"
            cta="Quero saber mais sobre piso vinílico"
            href={WA_VINILICO}
            bgImage={pisoVinilicoBg}
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
            <img src={antesImg} alt="Antes: ambiente frio sem piso instalado" width={1586} height={992} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            <img src={depoisImg} alt="Depois: ambiente renovado com piso laminado Lamiart" width={1586} height={992} loading="lazy" decoding="async" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${revealed ? "opacity-100" : "opacity-0"}`} />

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
  const marcas = [
    { name: "Quick-Step", logo: logoQuickStep, w: 480, h: 270 },
    { name: "Durafloor", logo: logoDurafloor, w: 480, h: 270 },
    { name: "Tarkett", logo: logoTarkett, w: 800, h: 450 },
  ];
  const repeated = [...marcas, ...marcas, ...marcas, ...marcas];
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
        <div className="marquee-track gap-8 px-5">
          {repeated.map((m, i) => (
            <div key={`${m.name}-${i}`} className="shrink-0 w-48 sm:w-60 h-24 sm:h-28 grid place-items-center px-4">
              <img src={m.logo} alt={m.name} width={m.w} height={m.h} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Depoimentos() {
  const items = [
    { name: "Rogerio Miranda", photo: cliRogerio, text: "Nota 10. O piso ficou ótimo, a composição com o rodapé branco muito bonita e os profissionais de instalação são excelentes." },
    { name: "Claudio Wilson", photo: cliClaudio, text: "Equipe excelente, profissionais qualificados e desde o atendimento ao vendedor, em fim todos sem exceção ❗️❗️❗️ Empresa de vocês estão de parabéns, muito satisfeito com todo o serviço prestado 👏🏻🤝" },
    { name: "José Saraiva", photo: cliJose, text: "Atendimento de primeira linha. Profissionais competentes para uma instalação primorosa." },
    { name: "Marli Nascimento", photo: cliMarli, text: "Fui bem atendida pela vendedora Luciana e na colocação também pelos 2 profissionais que estiveram em minha casa. Até o presente momento sem reclamações." },
    { name: "LETICIA REIS", photo: cliLeticia, text: "Fiz um pedido em 2019 e agora em 2023 fiz contato pelo whatsapp solicitando manutenção de algumas placas e frisos. O atendimento pelo telefone foi rápido e eficiente, consegui enviar fotos, receber um orçamento e agendar o atendimento para a semana seguinte. Durante a instalação o rapaz foi rápido e prezou pela limpeza. Estou bastante satisfeita e indico a amigos e familiares." },
    { name: "Lais Martinelli", photo: cliLais, text: "Uma palavra especial para o Sr. Ricardo, o instalador do piso. Educado, profissional ótimo. Quanto à LAMIART, cliente fixa. Ótima Empresa. Parabéns pelo atendimento, orientações e serviço." },
    
  ];
  const scrollerRef = useRef<HTMLUListElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? (card as HTMLElement).offsetWidth + 16 : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
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

      <div className="mt-10 relative">
        <ul
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth pb-4"
          style={{ paddingLeft: "10vw", paddingRight: "10vw" }}
        >
          {items.map((d, i) => (
            <li
              key={i}
              className="snap-center shrink-0 w-[80vw] sm:w-[360px] card-soft p-6 flex flex-col"
            >
              <div className="flex items-center gap-1 text-yellow-400">
                <Star /><Star /><Star /><Star /><Star />
                <svg
                  className="ml-auto h-4 w-auto"
                  viewBox="0 0 272 92"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Google"
                  role="img"
                >
                  <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                  <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                  <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                  <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
                  <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
                  <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/>
                </svg>
              </div>
              <p className="mt-4 text-ink leading-relaxed">"{d.text}"</p>
              <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                <img src={d.photo} alt={d.name} width={65} height={65} loading="lazy" decoding="async" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="font-display font-semibold text-ink text-sm">{d.name}</p>
                  <p className="text-xs text-warm-gray">Cliente Lamiart</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Avaliação anterior"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-warm-white shadow-warm border border-border grid place-items-center text-ink hover:bg-lamiart-red hover:text-white transition-colors z-10"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Próxima avaliação"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-warm-white shadow-warm border border-border grid place-items-center text-ink hover:bg-lamiart-red hover:text-white transition-colors z-10"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>

    </section>
  );
}

function CatalogGrid({
  id, title, subtitle, overlay, cta, href, images,
}: { id: string; title: string; subtitle: string; overlay: string; cta: string; href: string; images: { src: string; w: number; h: number }[]; }) {
  return (
    <section id={id} className="section-pad">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink leading-tight">{title}</h2>
          <p className="mt-4 text-warm-gray text-base sm:text-lg">{subtitle}</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
          {images.map(({ src, w, h }, i) => (
            <figure key={i} className="group relative aspect-square overflow-hidden rounded-2xl bg-beige-light shadow-soft">
              <img
                src={src} alt={`${overlay} Lamiart ${i + 1}`} width={w} height={h} loading="lazy" decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
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
    <section className="section-pad bg-lamiart-red text-warm-white">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
            Acompanhe a Lamiart nas redes sociais
          </h2>
          <p className="mt-4 text-warm-white/85 text-base sm:text-lg">
            Veja ideias, inspirações e transformações de ambientes.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {posts.map((url) => (
            <div key={url} className="rounded-2xl overflow-hidden bg-warm-white shadow-warm">
              <div className="relative w-full" style={{ aspectRatio: "9 / 14" }}>
                <iframe
                  src={`${url}embed`}
                  title="Post da Lamiart no Instagram"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  allow="encrypted-media"
                  scrolling="no"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <a href={INSTAGRAM} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-warm-white text-lamiart-red font-display font-bold hover:bg-warm-white/90 transition-colors">
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
          <div className="card-soft overflow-hidden relative min-h-[320px] lg:min-h-full order-2 lg:order-1">
            <iframe
              src={MAPS_EMBED}
              title="Localização da Lamiart no Google Maps"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="card-soft p-6 sm:p-8 order-1 lg:order-2">
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
                <span className="font-semibold text-warm-gray w-24 shrink-0">WhatsApp</span>
                <a href={WA_GERAL} target="_blank" rel="noopener" className="text-whatsapp font-semibold">21 99828-6443</a>
              </div>
            </dl>
            <a href={MAPS} target="_blank" rel="noopener" className="btn-primary mt-7 w-full sm:w-auto">
              Ir até lá
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    { q: "Qual a diferença entre piso vinílico e piso laminado?", a: "O piso laminado tem visual amadeirado e ótimo custo-benefício para ambientes internos. O piso vinílico é moderno, confortável, silencioso e muito prático para residências e espaços comerciais. A melhor escolha depende do ambiente, uso e objetivo do projeto." },
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
        style={{ background: "radial-gradient(ellipse at top left, rgba(139,41,20,0.55), transparent 50%), radial-gradient(ellipse at bottom right, rgba(185,130,75,0.35), transparent 55%)" }}
      />
      <div className="container-x relative text-center max-w-3xl">
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl leading-tight">
          Pronto para transformar <span className="text-lamiart-red">seu ambiente?</span>
        </h2>
        <p className="mt-5 text-warm-white/75 text-base sm:text-lg">
          Fale com a Lamiart e descubra a melhor opção de piso para sua casa, apartamento, escritório ou loja.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href={WA_GERAL} target="_blank" rel="noopener" className="btn-whatsapp text-base">
            <WhatsAppIcon /> Solicitar orçamento agora
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-warm-white/80 border-t border-white/10">
      <div className="container-x py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <img src={lamiartLogo} alt="Lamiart" width={480} height={160} loading="lazy" decoding="async" className="h-12 w-auto bg-warm-white rounded-md p-2" />
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
            <li><a href={WA_GERAL} target="_blank" rel="noopener" className="hover:text-warm-white">WhatsApp: 21 99828-6443</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display font-semibold text-warm-white mb-3 text-sm uppercase tracking-wider">Redes sociais</h3>
          <ul className="space-y-2 text-sm">
            <li><a href={INSTAGRAM} target="_blank" rel="noopener" className="hover:text-warm-white">Instagram @lamiart_decoracao</a></li>
            <li><a href={FACEBOOK} target="_blank" rel="noopener" className="hover:text-warm-white">Facebook /lamiartdecoracao</a></li>
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
      href={WA_GERAL} target="_blank" rel="noopener" aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-whatsapp text-white grid place-items-center shadow-[0_18px_40px_-12px_rgba(37,211,102,0.7)] hover:scale-105 transition-transform"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-60 animate-ping" />
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8 relative" />
    </a>
  );
}

import antesPisoImg from "@/assets/antes-piso-optimized.webp";
import depoisPisoImg from "@/assets/depois-piso-optimized.webp";

function AntesDepoisBanner() {
  return (
    <section className="bg-lamiart-red text-white section-pad">
      <div className="container-x">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest bg-white/15 px-3 py-1 rounded-full mb-4">Antes & Depois</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4">A transformação que seu piso merece</h2>
            <p className="text-white/90 text-lg leading-relaxed mb-6">Do piso antigo ao acabamento dos sonhos. Instalação profissional, resultado impecável e ambientes com a cara nova.</p>
            <a href={WA_LAMINADO} className="btn-whatsapp">Quero transformar meu piso</a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <figure className="relative rounded-2xl overflow-hidden shadow-warm">
              <img src={antesPisoImg} alt="Piso antes da instalação" width={512} height={512} loading="lazy" decoding="async" className="w-full h-64 md:h-80 object-cover" />
              <figcaption className="absolute top-3 left-3 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Antes</figcaption>
            </figure>
            <figure className="relative rounded-2xl overflow-hidden shadow-warm">
              <img src={depoisPisoImg} alt="Piso depois da instalação Lamiart" width={512} height={512} loading="lazy" decoding="async" className="w-full h-64 md:h-80 object-cover" />
              <figcaption className="absolute top-3 left-3 bg-white text-lamiart-red text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Depois</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
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
        <CatalogGrid id="catalogo" title="Catálogo de pisos laminados" subtitle="Veja algumas opções de texturas, tons e acabamentos para transformar seu ambiente." overlay="Laminados" cta="Pedir orçamento de piso laminado" href={WA_LAMINADO} images={[{ src: lam1, w: 808, h: 788 }, { src: lam2, w: 900, h: 1200 }, { src: lam3, w: 600, h: 600 }, { src: lam4, w: 1032, h: 581 }, { src: lam5, w: 900, h: 1200 }, { src: lam6, w: 1024, h: 768 }]} />
        <AntesDepoisBanner />
        <CatalogGrid id="catalogo-vinilico" title="Catálogo de pisos vinílicos" subtitle="Opções modernas, práticas e confortáveis para casas, apartamentos, lojas e escritórios." overlay="Vinílicos" cta="Pedir orçamento de piso vinílico" href={WA_VINILICO} images={[{ src: vin1, w: 1200, h: 900 }, { src: vin2, w: 1200, h: 900 }, { src: vin3, w: 800, h: 800 }, { src: vin4, w: 768, h: 1024 }, { src: vin5, w: 900, h: 1200 }, { src: vin6, w: 900, h: 1200 }]} />
        
        <Localizacao />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
