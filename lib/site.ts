export const SITE = {
  name: "Isabella Cristina Ribeiro Machado",
  shortName: "Isabella Machado",
  crp: "CRP 01/26547",
  role: "Psicóloga Clínica",
  whatsappNumber: "5561996737949",
  whatsappDisplay: "(61) 99673-7949",
  instagramHandle: "@psi_isabellamachado",
  instagramUrl: "https://instagram.com/psi_isabellamachado",
  url: "https://psiisabellamachado.com.br",
};

export function whatsappLink(message?: string): string {
  const defaultMessage =
    "Olá, Isabella! Encontrei seu site e gostaria de saber mais sobre o atendimento psicológico.";
  const text = encodeURIComponent(message ?? defaultMessage);
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}

export const NAV_LINKS = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#areas-de-atuacao", label: "Áreas de atuação" },
  { href: "/artigos", label: "Artigos" },
  { href: "/#contato", label: "Contato" },
];
