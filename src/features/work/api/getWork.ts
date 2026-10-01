import { sanityClient } from "../../../services/sanity/client";
import { taxonomyProjection } from "../../taxonomy/api/taxonomyProjection";
import type { Work } from "../types/work";

const workQuery = `
*[_type == "work"] | order(displayOrder asc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    heroImage,
    featured,
    publishedAt,

    ${taxonomyProjection}
}`;

export async function getWork(): Promise<Work[]> {
  return sanityClient.fetch<Work[]>(workQuery);
}
