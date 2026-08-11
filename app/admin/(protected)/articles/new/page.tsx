import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ArticleForm from "@/components/admin/ArticleForm";
import { createArticleAction } from "@/app/admin/articles/actions";

export const metadata: Metadata = {
  title: "Novo artigo",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: { error?: string };
};

export default function NewArticlePage({ searchParams }: Props) {
  return (
    <AdminShell>
      <h1 className="font-serif text-2xl text-espresso">Novo artigo</h1>
      <div className="mt-8">
        <ArticleForm
          action={async (formData: FormData) => {
            "use server";
            const result = await createArticleAction(formData);
            if (result.error) {
              redirect(`/admin/articles/new?error=${encodeURIComponent(result.error)}`);
            }
            redirect("/admin");
          }}
          submitLabel="Criar artigo"
          initialError={searchParams.error}
        />
      </div>
    </AdminShell>
  );
}
