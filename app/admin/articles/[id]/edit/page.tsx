import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ArticleForm from "@/components/admin/ArticleForm";
import { getArticleById } from "@/lib/articles";
import { updateArticleAction } from "@/app/admin/articles/actions";

export const metadata: Metadata = {
  title: "Editar artigo",
  robots: { index: false, follow: false },
};

type Props = {
  params: { id: string };
};

export default async function EditArticlePage({ params }: Props) {
  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  const article = await getArticleById(id);
  if (!article) notFound();

  const boundAction = updateArticleAction.bind(null, article.id);

  return (
    <AdminShell>
      <h1 className="font-serif text-2xl text-espresso">Editar artigo</h1>
      <div className="mt-8">
        <ArticleForm
          action={boundAction}
          submitLabel="Salvar alterações"
          initialValues={{
            title: article.title,
            content: article.content,
            coverImageUrl: article.cover_image_url,
            status: article.published_at ? "published" : "draft",
          }}
        />
      </div>
    </AdminShell>
  );
}
