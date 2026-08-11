import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ButterflyIcon from "@/components/ButterflyIcon";
import { getPublishedArticleBySlug } from "@/lib/articles";
import { formatArticleContent, formatDatePtBR, formatTimePtBR } from "@/lib/format";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getPublishedArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.content.slice(0, 150),
    openGraph: {
      title: article.title,
      images: article.cover_image_url ? [article.cover_image_url] : undefined,
    },
  };
}

export default async function ArtigoPage({ params }: Props) {
  const article = await getPublishedArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Link href="/artigos" className="font-sans text-sm text-cocoa hover:text-espresso">
        ← Todos os artigos
      </Link>

      <header className="mt-6">
        {article.published_at && (
          <div>
            <p className="font-sans text-xs uppercase tracking-wide text-camel">
              {formatDatePtBR(article.published_at)}
            </p>
            <p className="mt-0.5 font-sans text-[11px] text-taupe">
              {formatTimePtBR(article.published_at)}
            </p>
          </div>
        )}
        <h1 className="mt-3 font-serif text-3xl leading-tight text-espresso sm:text-4xl">
          {article.title}
        </h1>
        <div className="mt-4 flex items-center gap-2.5 text-cocoa">
          <ButterflyIcon className="h-6 w-6 shrink-0" />
          <span className="flex flex-col font-sans text-xs uppercase leading-tight tracking-wide">
            <span className="text-cocoa/70">Por</span>
            <span className="font-medium text-cocoa">{SITE.authorName}</span>
          </span>
        </div>
      </header>

      {article.cover_image_url && (
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-cocoa/10">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      <div
        className="prose-article mt-10"
        dangerouslySetInnerHTML={{ __html: formatArticleContent(article.content) }}
      />
    </main>
  );
}
