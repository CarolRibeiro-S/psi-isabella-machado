import Image from "next/image";
import ButterflyIcon from "@/components/ButterflyIcon";
import { SITE, whatsappLink } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-soft-radial">
      <ButterflyIcon className="pointer-events-none absolute -right-10 top-16 h-56 w-56 text-cocoa/10 sm:h-72 sm:w-72" />
      <ButterflyIcon className="pointer-events-none absolute -left-14 bottom-0 hidden h-64 w-64 -scale-x-100 text-camel/10 sm:block" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Conversar no WhatsApp
            </a>
            <a href="#sobre" className="btn-secondary">
              Conhecer meu trabalho
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-cocoa/15 shadow-soft">
            <Image
              src="/images/foto_isabella.jpeg"
              alt={`${SITE.name}, ${SITE.role}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 420px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
