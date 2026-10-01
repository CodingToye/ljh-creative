import type { PortableTextBlock } from "@portabletext/types";

import { sanityClient } from "../../../services/sanity/client";
import {
  type PullQuoteSelection,
  pullQuoteSelectionProjection,
} from "../../pullQuote/types/pullQuote";
import {
  type SocialLinkData,
  socialLinkProjection,
} from "../../socialLinks/types/socialLink";
import {
  type ArticleSummary,
  articleSummaryProjection,
} from "../../thinking/types/article";
import type { CareerJourneyStep } from "../types/careerJourney";
import type { FeatureImageData } from "../types/featureImage";
import type { HowIWorkItem } from "../types/howIWork";

export type AboutContent = {
  featureImages: FeatureImageData[];
  intro: PortableTextBlock[];
  cvDownload: {
    label: string;
    url: string | null;
  } | null;
  creativeLeadershipLeft: PortableTextBlock[];
  creativeLeadershipRight: PortableTextBlock[];
  careerJourney: CareerJourneyStep[];
  pullQuoteOne: PullQuoteSelection | null;
  howIWork: HowIWorkItem[];
  beyondTheWorkLeft: PortableTextBlock[];
  beyondTheWorkRight: PortableTextBlock[];
  elsewhereLinks: SocialLinkData[];
  articles: ArticleSummary[];
  pullQuoteTwo: PullQuoteSelection | null;
};

// "articles" uses the chosen articles, falling back to the 4 most recent when none are chosen
const aboutContentQuery = `
{
    "featureImages": coalesce(
  *[_type == "aboutPage"][0].featureImages[] {
    _key,
    image,
    alt,
    caption,
    captionPosition
  },
  []
),
    "intro": coalesce(*[_type == "aboutPage"][0].intro, []),
    "cvDownload": *[_type == "aboutPage"][0].cvDownload {
      "label": coalesce(label, "Download my CV"),
      "url": file->file.asset->url
    },
    "creativeLeadershipLeft": coalesce(*[_type == "aboutPage"][0].creativeLeadershipLeft, []),
    "creativeLeadershipRight": coalesce(*[_type == "aboutPage"][0].creativeLeadershipRight, []),
    "careerJourney": coalesce(
  *[_type == "aboutPage"][0].careerJourney[] {
    _key,
    colour,
    icon,
    "iconAlt": icon.alt,
    subtitle,
    content
  },
  []
),
    "pullQuoteOne": *[_type == "aboutPage"][0].pullQuoteOne ${pullQuoteSelectionProjection},
    "howIWork": coalesce(
  *[_type == "aboutPage"][0].howIWork[] {
    _key,
    variant,
    icon,
    "iconAlt": icon.alt,
    title,
    content
  },
  []
),
    "pullQuoteTwo": *[_type == "aboutPage"][0].pullQuoteTwo ${pullQuoteSelectionProjection},
    "beyondTheWorkLeft": coalesce(*[_type == "aboutPage"][0].beyondTheWorkLeft, []),
    "beyondTheWorkRight": coalesce(*[_type == "aboutPage"][0].beyondTheWorkRight, []),
    "elsewhereLinks": coalesce(*[_type == "aboutPage"][0].elsewhereLinks[]->${socialLinkProjection}, []),
    "articles": select(
      count(*[_type == "aboutPage"][0].articles) > 0 =>
        *[_type == "aboutPage"][0].articles[]->${articleSummaryProjection},
      *[_type == "article"] | order(publishedAt desc)[0...4] ${articleSummaryProjection}
    )
}
`;

export async function getAboutContent(): Promise<AboutContent> {
  return sanityClient.fetch<AboutContent>(aboutContentQuery);
}
