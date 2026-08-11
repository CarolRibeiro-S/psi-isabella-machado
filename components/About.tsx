import ButterflyIcon from "@/components/ButterflyIcon";
import { SITE, whatsappLink } from "@/lib/site";

const EDUCATION = [
  {
    title: "Graduação em Psicologia",
    place: "Faculdade Anhanguera de Brasília",
  },
  {
    title: "Pós-graduação em Terapia Cognitivo-Comportamental (TCC)",
    place: "Facuminas",
  },
];

export default function About() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <span className="section-eyebrow">Sobre mim</span>
          <h2 className="section-heading mt-3">Seja muito bem-vinda(o)</h2>

          <div className="prose-article mt-6">
            <p>
              Me chamo Isabella, sou psicóloga atuando na área clínica há 3
              anos, graduada pela Faculdade Anhanguera de Brasília e
              pós-graduada em Terapia Cognitivo-Comportamental pela Facuminas.
            </p>
            <p>
              Se busca acolhimento, clareza e apoio para lidar com a
              ansiedade, emoções, relacionamentos ou tantos outros desafios do
              dia a dia, saiba que não precisa percorrer esse caminho
              sozinha(o).
            </p>
            <p>
              Aqui você encontra um espaço seguro, com respeito, sigilo e
              dedicação total a você.
            </p>
          </div>

          <div className="mt-8">
            <p className="font-serif text-3xl font-medium text-cocoa sm:text-4xl">
              Vamos conversar?
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-5"
            >
              Agendar conversa
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-cocoa/10 bg-porcelain p-8 sm:p-10">
          <div className="flex items-center gap-2.5">
            <ButterflyIcon className="h-6 w-6 text-cocoa" />
            <h3 className="font-serif text-xl text-espresso">Formação</h3>
          </div>

          <ul className="mt-6 flex flex-col gap-6">
            {EDUCATION.map((item) => (
              <li key={item.title} className="border-l-2 border-cocoa/30 pl-4">
                <p className="font-sans text-base font-medium text-espresso">
                  {item.title}
                </p>
                <p className="font-sans text-sm text-truffle">{item.place}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl bg-linen px-5 py-4">
            <p className="font-sans text-sm text-truffle">
              Registro profissional
            </p>
            <p className="font-serif text-lg text-espresso">{SITE.crp}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
