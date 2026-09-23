import type { SanityImageObject } from "@sanity/image-url";

export type ColourToken =
  | "primary"
  | "secondary"
  | "neutral"
  | "tertiary"
  | "tertiary2";

export type Skill = {
  _id: string;
  title: string;
  image: SanityImageObject;
  imageAlt: string;
  backgroundColour: ColourToken;
  displayOrder: number;
};
