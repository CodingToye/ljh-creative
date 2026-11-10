import { sanityClient } from "../../../services/sanity/client";
import { taxonomyProjection } from "../../taxonomy/api/taxonomyProjection";
import { articleSummaryProjection } from "../../thinking/types/article";
import type { WorkDetail } from "../types/work";

// The related sections at the end of the page:
// - moreInCategory: up to 3 other projects in this project's category
// - otherCategories: every other category
// - relatedArticles: 4 articles, same-category ones first, then the most recent

const workSectionProjection = `{
  ...,
  images[]{
    ...,
    _type == "file" => {
      "url": asset->url
    }
  }
}`;

const workBySlugQuery = `
  *[_type == "work" && slug.current == $slug][0] {
    _id,
    title,
    heading,
    "slug": slug.current,
    summary,
    studio,
    role,
    duration,
    format,
    audience,
    responsibilities,
    theReason ${workSectionProjection},
    theChallenge ${workSectionProjection},
    theSolution ${workSectionProjection},
    theOutcome ${workSectionProjection},
    whatITookForward,
        heroImage,
    body,
    images[]{
      ...,
      _type == "file" => {
        "url": asset->url
      }
    },
    featured,
    publishedAt,

    ${taxonomyProjection},

    "moreInCategory": *[
      _type == "work" &&
      category._ref == ^.category._ref &&
      _id != ^._id
    ] | order(displayOrder asc, publishedAt desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      heroImage
    },

    "otherCategories": *[
      _type == "category" &&
      _id != ^.category._ref
    ] | order(displayOrder asc) {
      _id,
      title,
      "slug": slug.current,
      displayOrder,
      icon,
      colour
    },

    "relatedArticles": *[_type == "article"]
      | order((category._ref == ^.category._ref) desc, publishedAt desc)[0...4]
      ${articleSummaryProjection}
  }
`;

export async function getWorkBySlug(slug: string): Promise<WorkDetail | null> {
  return sanityClient.fetch<WorkDetail | null>(workBySlugQuery, {
    slug,
  });
}
