import { sanityClient } from "../../../services/sanity/client";
import { taxonomyProjection } from "../../taxonomy/api/taxonomyProjection";
import type { Article } from "../types/article";

const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    body,
    featured,
    publishedAt,

    ${taxonomyProjection}
  }
`;

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return sanityClient.fetch<Article | null>(articleBySlugQuery, {
    slug,
  });
}
