import { sanityClient } from "../../../services/sanity/client";
import type { ArticleSummary } from "../types/article";

const articlesQuery = `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    tags,
    featured,
    publishedAt
  }
`;

export async function getArticles(): Promise<ArticleSummary[]> {
  return sanityClient.fetch<ArticleSummary[]>(articlesQuery);
}
