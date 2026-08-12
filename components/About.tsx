import ButterflyIcon from "@/components/ButterflyIcon";
import ParallaxButterfly from "@/components/ParallaxButterfly";
import { SITE } from "@/lib/site";

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
    <section id="sobre" className="relative mx-auto max-w-6xl overflow-hidden px-5 py-16 sm:px-8 sm:py-24">
      <ParallaxButterfly
        className="pointer-events-none absolute -right-16 top-1/3 hidden h-64 w-64 -scale-x-100 text-camel/[0.34] sm:block"
        speed={0.18}
      />
      <div className="relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
        <div>
          <span className="section-eyebrow">Sobre mim</span>
          <h2 className="section-heading mt-3">Seja muito bem-vinda(o)</h2>

          <div className="prose-article mt-6">
            <p>
              Você já teve a sensação de carregar tudo sozinha(o), mesmo
              cercada(o) de gente?
            </p>
            <p>
              Eu sou Isabella, psicóloga clínica há 3 anos, formada pela
              Faculdade Anhanguera de Brasília e pós-graduada em Terapia
              Cognitivo-Comportamental pela Facuminas.
            </p>
            <p>
              No meu trabalho, acredito que ninguém deveria precisar
              atravessar a ansiedade, os relacionamentos difíceis ou os
              desafios do dia a dia sem um espaço para se ouvir de verdade.
            </p>
            <p>
              É esse espaço que eu construo em cada sessão, com escuta
              atenta, sigilo absoluto e total dedicação a você.
            </p>
            <p>
              Se você chegou até aqui buscando esse acolhimento, talvez seja
              o momento certo.
            </p>
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
