import type { Metadata } from "next";
import { fraunces, workSans } from "@/app/fonts";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.role}`,
    template: `%s | ${SITE.shortName}`,
  },
  description:
    "Psicóloga clínica com atendimento individual para adolescentes e adultos. Acolhimento, sigilo e cuidado para ansiedade, depressão, autoestima e relacionamentos.",
  openGraph: {
    title: `${SITE.name} | ${SITE.role}`,
    description:
      "Um espaço seguro para cuidar da sua saúde emocional. Atendimento psicológico individual, com acolhimento e sigilo.",
    url: SITE.url,
    siteName: SITE.shortName,
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="flex min-h-screen flex-col bg-linen font-sans text-espresso antialiased">
        {children}
      </body>
    </html>
  );
}
