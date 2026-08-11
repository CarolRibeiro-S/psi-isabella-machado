import ParallaxButterfly from "@/components/ParallaxButterfly";
import { whatsappLink } from "@/lib/site";

export default function ContactSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-cocoa px-6 py-16 text-center sm:px-16">
        <ParallaxButterfly
          className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 text-linen/20"
          speed={0.15}
        />
        <ParallaxButterfly
          className="pointer-events-none absolute -bottom-10 -right-6 h-48 w-48 -scale-x-100 text-linen/20"
          speed={0.22}
        />

        <div className="relative">
          <span className="section-eyebrow text-oat">Vamos conversar?</span>
          <h2 className="mx-auto mt-3 max-w-xl font-serif text-3xl text-linen sm:text-4xl">
            Dar o primeiro passo pode ser mais simples do que parece.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-base text-porcelain">
            Entre em contato e vamos encontrar juntas o melhor caminho para
            você.
          </p>

          <div className="mt-9 flex justify-center">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-linen px-8 py-4 font-sans text-base font-medium text-espresso shadow-soft transition-colors hover:bg-porcelain"
            >
              Agendar conversa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
