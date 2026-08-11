import type { Metadata } from "next";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import DeleteArticleButton from "@/components/admin/DeleteArticleButton";
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

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-espresso">Artigos</h1>
        <Link href="/admin/articles/new" className="btn-primary">
          Novo artigo
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="mt-10 font-sans text-sm text-truffle">
          Nenhum artigo criado ainda. Clique em &ldquo;Novo artigo&rdquo; para começar.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-cocoa/10 bg-white/40">
          <table className="w-full text-left">
            <thead className="bg-porcelain">
              <tr>
                <th className="px-5 py-3 font-sans text-xs uppercase tracking-wide text-truffle">Título</th>
                <th className="px-5 py-3 font-sans text-xs uppercase tracking-wide text-truffle">Status</th>
                <th className="px-5 py-3 font-sans text-xs uppercase tracking-wide text-truffle">Data</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-cocoa/10">
              {articles.map((article) => {
                const isPublished = Boolean(article.published_at);
                const toggleAction = togglePublishAction.bind(null, article.id, !isPublished);

                return (
                  <tr key={article.id}>
                    <td className="px-5 py-4 font-sans text-sm text-espresso">{article.title}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 font-sans text-xs font-medium ${
                          isPublished
                            ? "bg-cocoa/10 text-cocoa"
                            : "bg-taupe/15 text-truffle"
                        }`}
                      >
                        {isPublished ? "Publicado" : "Rascunho"}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-truffle">
                      {isPublished && article.published_at
                        ? formatDatePtBR(article.published_at)
                        : "Não publicado"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-4">
                        <form action={toggleAction}>
                          <button type="submit" className="font-sans text-sm text-cocoa hover:text-espresso">
                            {isPublished ? "Despublicar" : "Publicar"}
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
