function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Converte o texto escrito pela Isabella no painel admin em HTML seguro.
 * Regras simples, pensadas para quem não programa:
 * - linha em branco separa parágrafos
 * - **texto** vira negrito, *texto* vira itálico
 */
export function formatArticleContent(raw: string): string {
  const paragraphs = raw
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return paragraphs
    .map((block) => {
      const escaped = escapeHtml(block)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/\n/g, "<br />");
      return `<p>${escaped}</p>`;
    })
    .join("\n");
}

export function formatDatePtBR(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}
