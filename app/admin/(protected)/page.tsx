import type { Metadata } from "next";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import ButterflyIcon from "@/components/ButterflyIcon";
import DeleteArticleButton from "@/components/admin/DeleteArticleButton";
import RefreshOnComplete from "@/components/admin/RefreshOnComplete";
import { getAllArticlesForAdmin } from "@/lib/articles";
import { formatDatePtBR } from "@/lib/format";
import { togglePublishAction } from "@/app/admin/articles/actions";

export const metadata: Metadata = {
  title: "Painel administrativo",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const articles = await getAllArticlesForAdmin();
  const publishedCount = articles.filter((article) => Boolean(article.published_at)).length;
  const draftCount = articles.length - publishedCount;

  const stats = [
    { label: "Total de artigos", value: articles.length },
    { label: "Publicados", value: publishedCount },
    { label: "Rascunhos", value: draftCount },
  ];

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-espresso">Artigos</h1>
        <Link href="/admin/articles/new" className="btn-primary">
          Novo artigo
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-cocoa/10 bg-white/60 px-4 py-4 shadow-soft sm:px-6 sm:py-5"
          >
            <p className="font-serif text-2xl text-espresso sm:text-3xl">{stat.value}</p>
            <p className="mt-1 font-sans text-xs text-truffle sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {articles.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-cocoa/25 bg-porcelain px-6 py-14 text-center">
          <ButterflyIcon className="h-10 w-10 text-camel" />
          <p className="mt-4 font-serif text-xl text-espresso">Nenhum artigo por aqui ainda</p>
          <p className="mt-2 max-w-sm font-sans text-sm text-truffle">
            Quando você publicar seu primeiro artigo, ele aparece aqui no painel e também na
            página pública, pronto para ser lido.
          </p>
          <Link href="/admin/articles/new" className="btn-primary mt-6">
            Criar meu primeiro artigo
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-cocoa/10 bg-white/60 shadow-soft">
          <ul className="divide-y divide-cocoa/10">
            {articles.map((article) => {
              const isPublished = Boolean(article.published_at);
              const toggleAction = togglePublishAction.bind(null, article.id, !isPublished);

              return (
                <li
                  key={article.id}
                  className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="truncate font-serif text-base text-espresso">{article.title}</p>
                      <span
                        className={`inline-flex shrink-0 rounded-full px-3 py-1 font-sans text-xs font-medium ${
                          isPublished
                            ? "bg-cocoa text-linen"
                            : "border border-cocoa/30 text-truffle"
                        }`}
                      >
                        {isPublished ? "Publicado" : "Rascunho"}
                      </span>
                    </div>
                    <p className="mt-1.5 font-sans text-xs text-truffle sm:text-sm">
                      {isPublished && article.published_at
                        ? `Publicado em ${formatDatePtBR(article.published_at)}`
                        : "Ainda não publicado"}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-4 sm:justify-end">
                    <form action={toggleAction}>
                      <RefreshOnComplete />
                      <button type="submit" className="font-sans text-sm text-cocoa hover:text-espresso">
                        {isPublished ? "Inativar" : "Ativar"}
                      </button>
                    </form>
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="font-sans text-sm text-cocoa hover:text-espresso"
                    >
                      Editar
                    </Link>
                    <DeleteArticleButton id={article.id} title={article.title} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </AdminShell>
  );
}
