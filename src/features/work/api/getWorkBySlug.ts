import { sanityClient } from "../../../services/sanity/client";
import type { Work } from "../types/work";

const workBySlugQuery = `
  *[_type == "work" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    summary,
    client,
    year,
    disciplines,
    heroImage,
    body,
    featured,
    publishedAt
  }
`;

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  return sanityClient.fetch<Work | null>(workBySlugQuery, {
    slug,
  });
}
