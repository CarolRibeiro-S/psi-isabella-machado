"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdminSessionValid } from "@/lib/auth";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  setArticlePublishState,
  updateArticle,
} from "@/lib/articles";

export type ArticleFormState = {
  error?: string;
  success?: boolean;
};

function revalidatePublicPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/artigos");
  if (slug) revalidatePath(`/artigos/${slug}`);
}

function readArticleForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const coverImageUrl = String(formData.get("coverImageUrl") ?? "").trim();
  const status = String(formData.get("status") ?? "draft");
  return { title, content, coverImageUrl: coverImageUrl || null, status };
}

export async function createArticleAction(formData: FormData): Promise<ArticleFormState> {
  if (!(await isAdminSessionValid())) {
    return { error: "Sessão expirada. Faça login novamente." };
  }

  const { title, content, coverImageUrl, status } = readArticleForm(formData);

  if (!title || !content) {
    return { error: "Título e conteúdo são obrigatórios." };
  }

  const article = await createArticle({
    title,
    content,
    coverImageUrl,
    publishedAt: status === "published" ? new Date().toISOString() : null,
  });

  revalidatePublicPages(article.slug);
  return { success: true };
}

export async function updateArticleAction(id: number, formData: FormData): Promise<ArticleFormState> {
  if (!(await isAdminSessionValid())) {
    return { error: "Sessão expirada. Faça login novamente." };
  }

  const { title, content, coverImageUrl, status } = readArticleForm(formData);

  if (!title || !content) {
    return { error: "Título e conteúdo são obrigatórios." };
  }

  const existing = await getArticleById(id);
  if (!existing) {
    return { error: "Artigo não encontrado." };
  }

  const publishedAt =
    status === "published" ? existing.published_at ?? new Date().toISOString() : null;

  const article = await updateArticle(id, { title, content, coverImageUrl, publishedAt });

  revalidatePublicPages(article.slug);
  if (existing.slug !== article.slug) revalidatePublicPages(existing.slug);
  return { success: true };
}

export async function deleteArticleAction(id: number): Promise<void> {
  if (!(await isAdminSessionValid())) {
    redirect("/admin/login");
  }

  const existing = await getArticleById(id);
  await deleteArticle(id);
  revalidatePublicPages(existing?.slug);
  revalidatePath("/admin");
}

export async function togglePublishAction(id: number, publish: boolean): Promise<void> {
  if (!(await isAdminSessionValid())) {
    redirect("/admin/login");
  }

  const article = await setArticlePublishState(id, publish);
  revalidatePublicPages(article.slug);
  revalidatePath("/admin");
}
