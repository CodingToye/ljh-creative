import { sanityClient } from "../../../services/sanity/client";
import { taxonomyProjection } from "../../taxonomy/api/taxonomyProjection";
import type { ArticleSummary } from "../types/article";

const articlesQuery = `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    featured,
    publishedAt,

    ${taxonomyProjection}
  }
`;

export async function getArticles(): Promise<ArticleSummary[]> {
  return sanityClient.fetch<ArticleSummary[]>(articlesQuery);
}
