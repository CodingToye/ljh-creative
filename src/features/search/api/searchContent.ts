import { sanityClient } from "../../../services/sanity/client";
import type { SearchContentFilters, SearchResult } from "../types/search";

const searchContentQuery = `
  *[
    _type in ["work", "article"] &&

    (
      $searchPatterns == null ||
      title match $searchPatterns
    ) &&

    (
      $contentType == null ||
      _type == $contentType
    ) &&

    (
      $categoryId == null ||
      category._ref == $categoryId
    ) &&

    (
      count($tagIds) == 0 ||
      count(tags[@._ref in $tagIds]) > 0
    )
  ] | order(publishedAt desc) {
    _id,
    "contentType": _type,
    title,
    "slug": slug.current,

    "summary": select(
      _type == "work" => summary,
      _type == "article" => excerpt
    ),

    category-> {
      _id,
      title,
      "slug": slug.current,
      displayOrder
    },

    tags[]-> {
      _id,
      title,
      "slug": slug.current,

      category-> {
        _id,
        title,
        "slug": slug.current,
        displayOrder
      }
    },

    publishedAt
  }
`;

export async function searchContent({
  search,
  contentType,
  categoryId,
  tagIds = [],
}: SearchContentFilters): Promise<SearchResult[]> {
  const searchPatterns = search
    ?.trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => `${word}*`);

  return sanityClient.fetch<SearchResult[]>(searchContentQuery, {
    searchPatterns:
      searchPatterns && searchPatterns.length > 0 ? searchPatterns : null,
    contentType: contentType ?? null,
    categoryId: categoryId ?? null,
    tagIds,
  });
}
