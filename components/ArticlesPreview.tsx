import Link from "next/link";
import ButterflyIcon from "@/components/ButterflyIcon";
import ArticleCard from "@/components/ArticleCard";
import { getPublishedArticles } from "@/lib/articles";

export default async function ArticlesPreview() {
  const articles = await getPublishedArticles(3);

  return (
    <section id="artigos" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="section-eyebrow">Artigos</span>
          <h2 className="section-heading mt-3">Reflexões sobre saúde emocional</h2>
        </div>
        {articles.length > 0 && (
          <Link href="/artigos" className="btn-secondary">
            Ver todos os artigos
          </Link>
        )}
      </div>

      {articles.length === 0 ? (
        <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-cocoa/25 bg-porcelain px-6 py-10 text-center">
          <ButterflyIcon className="h-8 w-8 text-camel" />
          <p className="mt-3 font-serif text-xl text-espresso">
            Em breve, nossos primeiros artigos
          </p>
          <p className="mt-2 max-w-sm font-sans text-sm text-truffle">
            Estou preparando conteúdos com carinho para te ajudar a cuidar da
            sua saúde emocional. Volte em breve!
          </p>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
