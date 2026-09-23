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
