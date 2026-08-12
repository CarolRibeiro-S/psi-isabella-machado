import ParallaxButterfly from "@/components/ParallaxButterfly";

const DEMANDS = [
  {
    title: "Ansiedade",
    description: "Acolhimento para lidar com preocupações excessivas e a sobrecarga do dia a dia.",
  },
  {
    title: "Depressão",
    description: "Espaço de escuta e cuidado para reencontrar sentido e leveza.",
  },
  {
    title: "Bipolaridade",
    description: "Acompanhamento contínuo para compreender e equilibrar as oscilações de humor.",
  },
  {
    title: "Autoestima",
    description: "Resgate e fortalecimento do valor próprio e da autoconfiança.",
  },
  {
    title: "Regulação emocional",
    description: "Ferramentas para reconhecer, nomear e lidar melhor com as emoções.",
  },
  {
    title: "Assertividade",
    description: "Desenvolvimento de uma comunicação mais clara, segura e respeitosa.",
  },
  {
    title: "Relacionamentos",
    description: "Reflexão sobre vínculos familiares, afetivos e sociais mais saudáveis.",
  },
];

export default function Services() {
  return (
    <section id="areas-de-atuacao" className="relative overflow-hidden bg-porcelain">
      <ParallaxButterfly
        className="pointer-events-none absolute -left-12 bottom-6 hidden h-56 w-56 text-cocoa/[0.32] sm:block"
        speed={0.16}
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <span className="section-eyebrow">Áreas de atuação</span>
        <h2 className="mt-3 whitespace-nowrap font-serif tracking-tight text-espresso text-[clamp(0.8rem,4vw,2.25rem)]">
          Terapia individual para adolescentes e adultos
        </h2>
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-truffle sm:text-lg">
          O atendimento é pensado para cada pessoa, respeitando seu tempo e
          sua história. Entre os temas mais comuns trabalhados em consulta,
          estão:
        </p>

        <ul className="mt-8 flex flex-col divide-y divide-cocoa/10 rounded-2xl border border-cocoa/10 bg-linen sm:hidden">
          {DEMANDS.map((demand) => (
            <li key={demand.title} className="flex items-start gap-3 px-4 py-3.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cocoa" />
              <div>
                <p className="font-serif text-base text-espresso">{demand.title}</p>
                <p className="mt-0.5 font-sans text-xs leading-relaxed text-truffle">
                  {demand.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 hidden flex-wrap justify-center gap-5 sm:flex">
          {DEMANDS.map((demand) => (
            <div
              key={demand.title}
              className="w-[calc(50%-0.625rem)] rounded-2xl border border-cocoa/10 bg-linen p-6 transition-shadow hover:shadow-soft lg:w-[calc(33.333%-0.834rem)]"
            >
              <h3 className="font-serif text-lg text-espresso">{demand.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-truffle">
                {demand.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
