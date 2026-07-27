import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageObject } from "@sanity/image-url";

export type ArticleImage = SanityImageObject & {
  alt: string;
  caption?: string;
};

export type ArticleSummary = {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  coverImage?: ArticleImage;
  tags?: string[];
  featured: boolean;
  publishedAt: string;
};

export type Article = ArticleSummary & {
  body: PortableTextBlock[];
};
