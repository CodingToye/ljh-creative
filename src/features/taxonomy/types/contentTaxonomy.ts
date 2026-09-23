import type { Category, Tag } from "./taxonomy";

export type ContentTaxonomy = {
  category: Category | null;
  tags: Tag[];
};
