import type { PortableTextBlock } from "@portabletext/types";

import { sanityClient } from "../../../services/sanity/client";
import type { CareerJourneyStep } from "../types/careerJourney";
import type { FeatureImageData } from "../types/featureImage";

export type AboutContent = {
  featureImages: FeatureImageData[];
  intro: PortableTextBlock[];
  creativeLeadershipLeft: PortableTextBlock[];
  creativeLeadershipRight: PortableTextBlock[];
  careerJourney: CareerJourneyStep[];
};

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
)
}
`;

export async function getAboutContent(): Promise<AboutContent> {
  return sanityClient.fetch<AboutContent>(aboutContentQuery);
}
