import Image from "next/image";
import Link from "next/link";
import ButterflyIcon from "@/components/ButterflyIcon";
import { formatDatePtBR, formatTimePtBR } from "@/lib/format";
import { SITE } from "@/lib/site";
import type { Article } from "@/lib/articles";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/artigos/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-cocoa/10 bg-linen transition-shadow hover:shadow-soft"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-porcelain">
        {article.cover_image_url ? (
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ButterflyIcon className="h-12 w-12 text-camel/50" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
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
        <h3 className="mt-2 font-serif text-xl text-espresso group-hover:text-cocoa">
          {article.title}
        </h3>
        <p className="mt-1 font-sans text-xs text-truffle">Por {SITE.authorName}</p>
        <span className="mt-auto pt-4 font-sans text-sm font-medium text-cocoa">
          Ler artigo →
        </span>
      </div>
    </Link>
  );
}
