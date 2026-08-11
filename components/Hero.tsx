import Image from "next/image";
import ButterflyIcon from "@/components/ButterflyIcon";
import ParallaxButterfly from "@/components/ParallaxButterfly";
import { SITE, whatsappLink } from "@/lib/site";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-soft-radial">
      <ParallaxButterfly
        className="pointer-events-none absolute -right-10 top-16 h-56 w-56 text-cocoa/[0.16] sm:h-72 sm:w-72"
        speed={0.12}
      />
      <ParallaxButterfly
        className="pointer-events-none absolute -left-14 bottom-0 hidden h-64 w-64 -scale-x-100 text-camel/[0.18] sm:block"
        speed={0.2}
      />

      <div className="relative mx-auto grid max-w-6xl items-start gap-8 px-5 py-10 sm:px-8 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">
        <div className="order-2 lg:order-1">
          <span className="section-eyebrow inline-flex items-center gap-2">
            <ButterflyIcon className="h-4 w-4" />
            Psicoterapia individual
          </span>

          <h1 className="mt-4 font-serif text-4xl leading-[1.15] text-espresso sm:text-5xl lg:text-[3.4rem]">
            Um espaço seguro para você se ouvir com mais gentileza.
          </h1>

          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-truffle sm:text-lg">
            Sou {SITE.name}, {SITE.role.toLowerCase()} ({SITE.crp}). Atendo
            adolescentes e adultos que buscam acolhimento, clareza e apoio
            para lidar com a ansiedade, as emoções, os relacionamentos e os
            desafios do dia a dia, com respeito, sigilo e dedicação total a
            você.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Agendar conversa
            </a>
            <a href="#sobre" className="text-link">
              Conhecer meu trabalho
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-[2rem] border border-cocoa/15 shadow-soft sm:max-w-sm sm:rounded-[2.5rem]">
            <Image
              src="/images/foto_isabella.jpeg"
              alt={`${SITE.name}, ${SITE.role}`}
              fill
              priority
              className="object-cover object-[50%_15%]"
              sizes="(max-width: 1024px) 80vw, 420px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
