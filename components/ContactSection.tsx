import ButterflyIcon from "@/components/ButterflyIcon";
import { SITE, whatsappLink } from "@/lib/site";

export default function ContactSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-cocoa px-6 py-16 text-center sm:px-16">
        <ButterflyIcon className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 text-linen/10" />
        <ButterflyIcon className="pointer-events-none absolute -bottom-10 -right-6 h-48 w-48 -scale-x-100 text-linen/10" />

        <span className="section-eyebrow text-oat">Vamos conversar?</span>
        <h2 className="mx-auto mt-3 max-w-xl font-serif text-3xl text-linen sm:text-4xl">
          Dar o primeiro passo pode ser mais simples do que parece.
        </h2>
        <p className="mx-auto mt-4 max-w-md font-sans text-base text-porcelain">
          Entre em contato e vamos encontrar juntas o melhor caminho para
          você.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-linen px-6 py-3 font-sans text-sm font-medium text-espresso shadow-soft transition-colors hover:bg-porcelain"
          >
            Chamar no WhatsApp
          </a>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-linen/40 px-6 py-3 font-sans text-sm font-medium text-linen transition-colors hover:bg-linen/10"
          >
            Seguir no Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
