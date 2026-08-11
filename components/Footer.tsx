import Link from "next/link";
import ButterflyIcon from "@/components/ButterflyIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { SITE, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-cocoa/10 bg-porcelain">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <ButterflyIcon className="h-6 w-6 text-cocoa" />
              <span className="font-serif text-lg text-espresso">{SITE.shortName}</span>
            </div>
            <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-truffle">
              {SITE.role} · {SITE.crp}
            </p>
          </div>

          <div>
            <h3 className="font-sans text-sm font-medium uppercase tracking-wide text-cocoa">
              Navegação
            </h3>
            <ul className="mt-3 flex flex-col gap-2 font-sans text-sm text-truffle">
              <li>
                <Link href="/#sobre" className="hover:text-cocoa">Sobre</Link>
              </li>
              <li>
                <Link href="/#areas-de-atuacao" className="hover:text-cocoa">Áreas de atuação</Link>
              </li>
              <li>
                <Link href="/artigos" className="hover:text-cocoa">Artigos</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-medium uppercase tracking-wide text-cocoa">
              Fale comigo
            </h3>
            <div className="mt-4 flex items-center gap-4">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp: ${SITE.whatsappDisplay}`}
                title="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cocoa/25 text-cocoa transition-colors hover:border-cocoa hover:text-espresso"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram: ${SITE.instagramHandle}`}
                title="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cocoa/25 text-cocoa transition-colors hover:border-cocoa hover:text-espresso"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-cocoa/10 pt-6 text-center font-sans text-xs text-truffle sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
          </p>
          <p>
            Site criado e desenvolvido por{" "}
            <a
              href="https://carolribeiros.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cocoa hover:text-espresso"
            >
              Carol Ribeiro
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
