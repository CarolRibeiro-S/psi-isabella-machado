import { sql } from "@/lib/db";
import { slugify } from "@/lib/slugify";

export type Article = {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ArticleInput = {
  title: string;
  content: string;
  coverImageUrl?: string | null;
  publishedAt?: string | null;
};

export async function getPublishedArticles(limit?: number): Promise<Article[]> {
  const rows = limit
    ? await sql`
        SELECT * FROM articles
        WHERE published_at IS NOT NULL AND published_at <= now()
        ORDER BY published_at DESC
        LIMIT ${limit}
      `
    : await sql`
        SELECT * FROM articles
        WHERE published_at IS NOT NULL AND published_at <= now()
        ORDER BY published_at DESC
      `;
  return rows as Article[];
}

export async function getPublishedArticleBySlug(slug: string): Promise<Article | null> {
  const rows = await sql`
    SELECT * FROM articles
    WHERE slug = ${slug} AND published_at IS NOT NULL AND published_at <= now()
    LIMIT 1
  `;
  return (rows[0] as Article) ?? null;
}

export async function getAllArticlesForAdmin(): Promise<Article[]> {
  const rows = await sql`
    SELECT * FROM articles
    ORDER BY created_at DESC
  `;
  return rows as Article[];
}

export async function getArticleById(id: number): Promise<Article | null> {
  const rows = await sql`SELECT * FROM articles WHERE id = ${id} LIMIT 1`;
  return (rows[0] as Article) ?? null;
}

async function generateUniqueSlug(title: string, ignoreId?: number): Promise<string> {
  const base = slugify(title) || "artigo";
  let candidate = base;
  let attempt = 1;

  while (true) {
    const rows = ignoreId
      ? await sql`SELECT id FROM articles WHERE slug = ${candidate} AND id != ${ignoreId} LIMIT 1`
      : await sql`SELECT id FROM articles WHERE slug = ${candidate} LIMIT 1`;

    if (rows.length === 0) return candidate;

    attempt += 1;
    candidate = `${base}-${attempt}`;
  }
}

export async function createArticle(input: ArticleInput): Promise<Article> {
  const slug = await generateUniqueSlug(input.title);
  const rows = await sql`
    INSERT INTO articles (title, slug, content, cover_image_url, published_at)
    VALUES (${input.title}, ${slug}, ${input.content}, ${input.coverImageUrl ?? null}, ${input.publishedAt ?? null})
    RETURNING *
  `;
  return rows[0] as Article;
}

export async function updateArticle(id: number, input: ArticleInput): Promise<Article> {
  const existing = await getArticleById(id);
  if (!existing) throw new Error("Artigo não encontrado.");

  const slug =
    input.title === existing.title ? existing.slug : await generateUniqueSlug(input.title, id);

  const rows = await sql`
    UPDATE articles
    SET title = ${input.title},
        slug = ${slug},
        content = ${input.content},
        cover_image_url = ${input.coverImageUrl ?? null},
        published_at = ${input.publishedAt ?? null},
        updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Article;
}

export async function deleteArticle(id: number): Promise<void> {
  await sql`DELETE FROM articles WHERE id = ${id}`;
}

export async function setArticlePublishState(id: number, publish: boolean): Promise<Article> {
  const rows = publish
    ? await sql`UPDATE articles SET published_at = now(), updated_at = now() WHERE id = ${id} RETURNING *`
    : await sql`UPDATE articles SET published_at = NULL, updated_at = now() WHERE id = ${id} RETURNING *`;
  return rows[0] as Article;
}
