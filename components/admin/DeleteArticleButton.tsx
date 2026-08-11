"use client";

import { deleteArticleAction } from "@/app/admin/articles/actions";
import RefreshOnComplete from "@/components/admin/RefreshOnComplete";

export default function DeleteArticleButton({ id, title }: { id: number; title: string }) {
  const boundAction = deleteArticleAction.bind(null, id);

  return (
    <form
      action={boundAction}
      onSubmit={(event) => {
        if (!confirm(`Excluir o artigo "${title}"? Essa ação não pode ser desfeita.`)) {
          event.preventDefault();
        }
      }}
    >
      <RefreshOnComplete />
      <button type="submit" className="font-sans text-sm text-red-700 hover:text-red-900">
        Excluir
      </button>
    </form>
  );
}
