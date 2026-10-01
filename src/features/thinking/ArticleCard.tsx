import type { SanityImageObject } from "@sanity/image-url";
import { Link } from "react-router";

import { urlFor } from "../../services/sanity/image";
import type { ArticleSummary } from "./types/article";

function getImageUrl(image: SanityImageObject, width: number) {
  return urlFor(image).width(width).auto("format").url();
}

export type ArticleCardVariant = "default" | "compact";

export type ArticleCardProps = {
  article: ArticleSummary;
  // Compact drops the tags and uses a shorter image, for denser grids
  variant?: ArticleCardVariant;
};

const cardClasses: Record<ArticleCardVariant, string> = {
  default: "border-tertiary-400 rounded-2xl pb-4",
  compact: "overflow-hidden border-tertiary-500 rounded-lg bg-white",
};

const imageClasses: Record<ArticleCardVariant, string> = {
  default: "h-60 rounded-t-2xl",
  compact: "h-36",
};

const titleClasses: Record<ArticleCardVariant, string> = {
  default: "font-body text-xl/6",
  compact: "font-heading text-xl/6",
};

export default function ArticleCard({
  article,
  variant = "default",
}: ArticleCardProps) {
  const isCompact = variant === "compact";

  return (
    <article>
      <div
        className={`flex h-full w-full flex-col gap-2 border ${cardClasses[variant]}`}
      >
        <Link to={`/thinking/${article.slug}`} className="group block">
          {article.coverImage && (
            <div>
              <img
                src={getImageUrl(article.coverImage, 440)}
                alt={article.coverImage.alt}
                className={`w-full object-cover ${imageClasses[variant]}`}
                loading="lazy"
              />
            </div>
          )}
        </Link>
        <div className={isCompact ? "px-3 pt-2 pb-4" : "py-2 px-4"}>
          {!isCompact && (
            <ul className="flex flex-wrap mb-4">
              {article.tags.map((tag) => (
                <li
                  key={tag._id}
                  className="text-micro uppercase text-tertiary-500 after:mx-2 after:content-['•'] last:after:content-none"
                >
                  {tag.title}
                </li>
              ))}
            </ul>
          )}
          <h2 className={`mb-4 ${titleClasses[variant]}`}>{article.title}</h2>
          <Link
            to={`/thinking/${article.slug}`}
            className="text-primary-500 underline text-sm"
          >
            Read article &gt;
          </Link>
        </div>
      </div>
      {/* <h3 className="mt-5 text-regular text-primary-500 underline hover:text-primary-400 transition">
        {article.title} &gt;
      </h3> */}
    </article>
  );
}
