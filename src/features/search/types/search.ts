import type { Category, Tag } from "../../taxonomy/types/taxonomy";

export type SearchContentType = "work" | "article";

export type SearchResult = {
  _id: string;
  contentType: SearchContentType;
  title: string;
  slug: string;
  summary: string;
  category: Category;
  tags: Tag[];
  publishedAt?: string;
};

export type SearchContentFilters = {
  search?: string;
  contentType?: SearchContentType;
  categoryId?: string;
  tagIds?: string[];
};
