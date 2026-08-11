import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ButterflyIcon from "@/components/ButterflyIcon";
import { getPublishedArticleBySlug } from "@/lib/articles";
import { formatArticleContent, formatDatePtBR } from "@/lib/format";

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
          <p className="font-sans text-xs uppercase tracking-wide text-camel">
            {formatDatePtBR(article.published_at)}
          </p>
        )}
        <h1 className="mt-3 font-serif text-3xl leading-tight text-espresso sm:text-4xl">
          {article.title}
        </h1>
        <div className="mt-4 flex items-center gap-2 text-cocoa">
          <ButterflyIcon className="h-4 w-4" />
          <span className="font-sans text-xs uppercase tracking-wide">
            Isabella Machado
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
