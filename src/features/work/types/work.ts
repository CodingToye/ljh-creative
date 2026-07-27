import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageObject } from "@sanity/image-url";

export type PortfolioImage = SanityImageObject & {
  alt: string;
};

export type Work = {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  summary: string;
  client?: string;
  year?: string;
  disciplines?: string[];
  heroImage: PortfolioImage;
  body?: PortableTextBlock[];
  featured: boolean;
  publishedAt?: string;
};
