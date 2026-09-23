import { sanityClient } from "../../../services/sanity/client";
import type { Skill } from "../../skills/types/skills";
import type { ArticleSummary } from "../../thinking/types/article";
import type { Work } from "../../work/types/work";
import type { FeatureImageData } from "../types/featureImage";

export type HomeContent = {
  skills: Skill[];
  featuredWork: Work[];
  latestArticles: ArticleSummary[];
  featureImages: FeatureImageData[];
};

const homeContentQuery = `
  {
    "skills": *[_type == "skill"]
  | order(displayOrder asc, title asc) {
    _id,
    title,
    image,
    "imageAlt": image.alt,
    backgroundColour,
    displayOrder
  },

    "featuredWork": *[
      _type == "work" &&
      featured == true
    ] | order(displayOrder asc, publishedAt desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      summary,
      client,
      year,
      heroImage,
      featured,
      publishedAt
    },

    "latestArticles": *[
      _type == "article"
    ] | order(publishedAt desc)[0...3] {
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
    },

    "featureImages": coalesce(
  *[_type == "homePage"][0].featureImages[] {
    _key,
    image,
    alt,
    caption,
    captionPosition
  },
  []
)
  }
`;

export async function getHomeContent(): Promise<HomeContent> {
  return sanityClient.fetch<HomeContent>(homeContentQuery);
}
