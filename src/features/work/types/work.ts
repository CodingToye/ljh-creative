import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageObject } from "@sanity/image-url";

import type { ColourToken } from "../../skills/types/skills";
import type { ContentTaxonomy } from "../../taxonomy/types/contentTaxonomy";
import type { Category } from "../../taxonomy/types/taxonomy";
import type { ArticleSummary } from "../../thinking/types/article";

export type PortfolioImage = SanityImageObject & {
  alt: string;
};

export type WorkSectionImageSize = "standard" | "wide" | "full";

export type WorkSectionImage = SanityImageObject & {
  _key: string;
  alt?: string;
  size?: WorkSectionImageSize | null;
};

// A case-study section: text followed by a row of captioned images
export type WorkSectionData = {
  bannerImage?: (SanityImageObject & { alt?: string }) | null;
  content?: string | null;
  images?: WorkSectionImage[] | null;
  caption?: string | null;
};

export type Work = ContentTaxonomy & {
  _id: string;
  title: string;
  heading?: PortableTextBlock[] | null;
  slug: string;
  summary: string;
  studio?: string | null;
  role?: string | null;
  duration?: string | null;
  format?: string | null;
  audience?: string | null;
  responsibilities?: string | null;
  theReason?: WorkSectionData | null;
  theChallenge?: WorkSectionData | null;
  theSolution?: WorkSectionData | null;
  theOutcome?: WorkSectionData | null;
  whatITookForward?: {
    quote?: PortableTextBlock[] | null;
    variant?: ColourToken | null;
  } | null;
  heroImage: PortfolioImage;
  body?: PortableTextBlock[];
  featured: boolean;
  publishedAt?: string;
};

export type RelatedWork = Pick<Work, "_id" | "title" | "slug" | "heroImage">;

// A single project as loaded for its page, with the related content shown at the end
export type WorkDetail = Work & {
  moreInCategory: RelatedWork[];
  otherCategories: Category[];
  relatedArticles: ArticleSummary[];
};
