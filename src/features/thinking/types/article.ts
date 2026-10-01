import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageObject } from "@sanity/image-url";

import type { ContentTaxonomy } from "../../taxonomy/types/contentTaxonomy";

export type ArticleImage = SanityImageObject & {
  alt: string;
  caption?: string;
};

export type ArticleSummary = ContentTaxonomy & {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  coverImage?: ArticleImage;
  featured: boolean;
  publishedAt: string;
};

export type Article = ArticleSummary & {
  body: PortableTextBlock[];
};

// GROQ projection for an ArticleSummary
export const articleSummaryProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  featured,
  publishedAt,

  category-> {
    _id,
    title,
    "slug": slug.current
  },

  "tags": coalesce(
    tags[]-> {
      _id,
      title,
      "slug": slug.current
    },
    []
  )
}`;
