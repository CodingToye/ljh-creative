import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageObject } from "@sanity/image-url";

import type { ContentTaxonomy } from "../../taxonomy/types/contentTaxonomy";

export type PortfolioImage = SanityImageObject & {
  alt: string;
};

export type Work = ContentTaxonomy & {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  summary: string;
  client?: string;
  year?: string;
  heroImage: PortfolioImage;
  body?: PortableTextBlock[];
  featured: boolean;
  publishedAt?: string;
};
