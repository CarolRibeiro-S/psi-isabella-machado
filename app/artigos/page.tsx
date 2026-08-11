import type { Metadata } from "next";
import ButterflyIcon from "@/components/ButterflyIcon";
import ArticleCard from "@/components/ArticleCard";
import { getPublishedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Artigos",
  description:
    "Reflexões e conteúdos sobre saúde emocional, ansiedade, autoestima e relacionamentos.",
};

export const dynamic = "force-dynamic";

export default async function ArtigosPage() {
  const articles = await getPublishedArticles();

  return (
    <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Artigos</span>
        <h1 className="section-heading mt-3">Reflexões sobre saúde emocional</h1>
        <p className="mt-4 font-sans text-base leading-relaxed text-truffle sm:text-lg">
          Textos para te acompanhar entre uma sessão e outra.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="mt-14 flex flex-col items-center rounded-3xl border border-dashed border-cocoa/25 bg-porcelain px-6 py-20 text-center">
          <ButterflyIcon className="h-10 w-10 text-camel" />
          <p className="mt-4 font-serif text-xl text-espresso">
            Em breve, nossos primeiros artigos
          </p>
          <p className="mt-2 max-w-sm font-sans text-sm text-truffle">
            Estou preparando conteúdos com carinho para te ajudar a cuidar da
            sua saúde emocional. Volte em breve!
          </p>
        </div>
      ) : (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}
