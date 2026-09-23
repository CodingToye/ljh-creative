import { sanityClient } from "../../../services/sanity/client";
import type { Category, Tag } from "../types/taxonomy";

export type CategoryWithTags = Category & {
  tags: Tag[];
};

const taxonomyQuery = `
  *[_type == "category"] | order(displayOrder asc) {
    _id,
    title,
    "slug": slug.current,
    displayOrder,

    "tags": *[
      _type == "tag" &&
      category._ref == ^._id
    ] | order(title asc) {
      _id,
      title,
      "slug": slug.current,

      category-> {
        _id,
        title,
        "slug": slug.current,
        displayOrder
      }
    }
  }
`;

export async function getTaxonomy(): Promise<CategoryWithTags[]> {
  return sanityClient.fetch<CategoryWithTags[]>(taxonomyQuery);
}
