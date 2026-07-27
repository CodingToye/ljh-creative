import { sanityClient } from "../../../services/sanity/client";
import type { Work } from "../types/work";

const workQuery = `
*[_type == "work"] | order(displayOrder asc, publishedAt desc) {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    summary,
    client,
    year,
    disciplines,
    heroImage,
    featured,
    publishedAt
}`;

export async function getWork(): Promise<Work[]> {
  return sanityClient.fetch<Work[]>(workQuery);
}
