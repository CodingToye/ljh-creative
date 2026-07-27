import { sanityClient } from "../../../services/sanity/client";
import type { ArticleSummary } from "../../thinking/types/article";
import type { Work } from "../../work/types/work";

export type HomeContent = {
  featuredWork: Work[];
  latestArticles: ArticleSummary[];
};

const homeContentQuery = `
  {
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
      disciplines,
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
      tags,
      featured,
      publishedAt
    }
  }
`;

export async function getHomeContent(): Promise<HomeContent> {
  return sanityClient.fetch<HomeContent>(homeContentQuery);
}
