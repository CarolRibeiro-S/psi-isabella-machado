"use client";

import { useState } from "react";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import type { ArticleFormState } from "@/app/admin/articles/actions";

type InitialValues = {
  title: string;
  content: string;
  coverImageUrl: string | null;
  status: "draft" | "published";
};

type ArticleFormProps = {
  action: (prevState: ArticleFormState, formData: FormData) => Promise<ArticleFormState>;
  submitLabel: string;
  initialValues?: InitialValues;
};

const EMPTY_VALUES: InitialValues = {
  title: "",
  content: "",
  coverImageUrl: null,
  status: "draft",
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? "Salvando..." : label}
    </button>
  );
}

export default function ArticleForm({ action, submitLabel, initialValues }: ArticleFormProps) {
  const values = initialValues ?? EMPTY_VALUES;
  const [state, formAction] = useFormState(action, {} as ArticleFormState);
  const [coverImageUrl, setCoverImageUrl] = useState(values.coverImageUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await response.json();

      if (!response.ok) {
        setUploadError(data.error ?? "Não foi possível enviar a imagem.");
        return;
      }

      setCoverImageUrl(data.url);
    } catch {
      setUploadError("Não foi possível enviar a imagem. Tente novamente.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="font-sans text-sm text-truffle">
          Título
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={values.title}
          className="rounded-xl border border-cocoa/25 bg-linen px-4 py-2.5 font-serif text-lg text-espresso outline-none focus-visible:border-cocoa"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="content" className="font-sans text-sm text-truffle">
          Conteúdo
        </label>
        <p className="font-sans text-xs text-taupe">
          Deixe uma linha em branco para separar parágrafos. Use **palavra** para
          negrito e *palavra* para itálico.
        </p>
        <textarea
          id="content"
          name="content"
          required
          rows={14}
          defaultValue={values.content}
          className="rounded-xl border border-cocoa/25 bg-linen px-4 py-3 font-sans text-base leading-relaxed text-espresso outline-none focus-visible:border-cocoa"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="coverImageUrl" className="font-sans text-sm text-truffle">
          Imagem de capa (opcional)
        </label>
        <input
          id="coverImageUrl"
          name="coverImageUrl"
          type="url"
          placeholder="https://..."
          value={coverImageUrl}
          onChange={(event) => setCoverImageUrl(event.target.value)}
          className="rounded-xl border border-cocoa/25 bg-linen px-4 py-2.5 font-sans text-sm text-espresso outline-none focus-visible:border-cocoa"
        />

        <div className="mt-1 flex items-center gap-4">
          <label className="btn-secondary cursor-pointer">
            {uploading ? "Enviando..." : "Enviar imagem do computador"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
          {coverImageUrl && (
            <button
              type="button"
              onClick={() => setCoverImageUrl("")}
              className="font-sans text-sm text-truffle hover:text-cocoa"
            >
              Remover imagem
            </button>
          )}
        </div>

        {uploadError && (
          <p role="alert" className="font-sans text-sm text-red-700">
            {uploadError}
          </p>
        )}

        {coverImageUrl && (
          <div className="relative mt-2 aspect-video w-full max-w-md overflow-hidden rounded-xl border border-cocoa/15">
            <Image src={coverImageUrl} alt="Pré-visualização da capa" fill className="object-cover" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="status" className="font-sans text-sm text-truffle">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={values.status}
          className="w-fit rounded-xl border border-cocoa/25 bg-linen px-4 py-2.5 font-sans text-sm text-espresso outline-none focus-visible:border-cocoa"
        >
          <option value="draft">Rascunho</option>
          <option value="published">Publicado</option>
        </select>
      </div>

      {state.error && (
        <p role="alert" className="font-sans text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div>
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
