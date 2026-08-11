"use client";

import { useTransition } from "react";
import { deleteArticleAction } from "@/app/admin/articles/actions";

export default function DeleteArticleButton({ id, title }: { id: number; title: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm(`Excluir o artigo "${title}"? Essa ação não pode ser desfeita.`)) {
          startTransition(() => {
            deleteArticleAction(id);
          });
        }
      }}
      className="font-sans text-sm text-red-700 hover:text-red-900 disabled:opacity-50"
    >
      Excluir
    </button>
  );
}
