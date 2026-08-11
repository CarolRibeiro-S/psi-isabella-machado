import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
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
  searchParams: { error?: string };
};

export default async function EditArticlePage({ params, searchParams }: Props) {
  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  const article = await getArticleById(id);
  if (!article) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    const result = await updateArticleAction(id, formData);
    if (result.error) {
      redirect(`/admin/articles/${id}/edit?error=${encodeURIComponent(result.error)}`);
    }
    redirect("/admin");
  }

  return (
    <AdminShell>
      <h1 className="font-serif text-2xl text-espresso">Editar artigo</h1>
      <div className="mt-8">
        <ArticleForm
          action={handleUpdate}
          submitLabel="Salvar alterações"
          initialError={searchParams.error}
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
