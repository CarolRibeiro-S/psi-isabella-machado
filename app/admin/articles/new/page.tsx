import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import ArticleForm from "@/components/admin/ArticleForm";
import { createArticleAction } from "@/app/admin/articles/actions";

export const metadata: Metadata = {
  title: "Novo artigo",
  robots: { index: false, follow: false },
};

export default function NewArticlePage() {
  return (
    <AdminShell>
      <h1 className="font-serif text-2xl text-espresso">Novo artigo</h1>
      <div className="mt-8">
        <ArticleForm action={createArticleAction} submitLabel="Criar artigo" />
      </div>
    </AdminShell>
  );
}
