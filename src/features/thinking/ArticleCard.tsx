import type { SanityImageObject } from "@sanity/image-url";
import { Link } from "react-router";

import { urlFor } from "../../services/sanity/image";
import type { ArticleSummary } from "./types/article";

function getImageUrl(image: SanityImageObject, width: number) {
  return urlFor(image).width(width).auto("format").url();
}

export type ArticleCardProps = {
  article: ArticleSummary;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  console.log(article);
  return (
    <article>
      <div className="flex flex-col gap-2 w-full border border-tertiary-400 pb-4">
        <Link to={`/thinking/${article.slug}`} className="group block">
          {article.coverImage && (
            <div className="">
              <img
                src={getImageUrl(article.coverImage, 440)}
                alt={article.coverImage.alt}
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
          )}
        </Link>
        <div className="py-2 px-4">
          <ul className="flex flex-wrap">
            {article.tags.map((tag) => (
              <li
                key={tag._id}
                className="after:align-middle text-micro uppercase text-tertiary-500 after:mx-2 after:content-['•'] last:after:content-none"
              >
                {tag.title}
              </li>
            ))}
          </ul>
          <h2 className="font-serif text-[24px] mb-4">{article.title}</h2>
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
