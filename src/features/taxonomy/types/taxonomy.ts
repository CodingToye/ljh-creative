import type { SanityImageObject } from "@sanity/image-url";

import type { ColourToken } from "../../skills/types/skills";

export type Category = {
  _id: string;
  title: string;
  slug: string;
  displayOrder: number;
  icon?: SanityImageObject | null;
  colour?: ColourToken | null;
};

export type Tag = {
  _id: string;
  title: string;
  slug: string;
  category: Category;
};
