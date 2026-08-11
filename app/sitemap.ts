import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles();

  return [
    { url: SITE.url, lastModified: new Date() },
    { url: `${SITE.url}/artigos`, lastModified: new Date() },
    ...articles.map((article) => ({
      url: `${SITE.url}/artigos/${article.slug}`,
      lastModified: new Date(article.updated_at),
    })),
  ];
}
