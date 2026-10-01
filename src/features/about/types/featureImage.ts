import type { SanityImageObject } from "@sanity/image-url";

export type CaptionPosition = "left" | "centre" | "right";

export type FeatureImageData = {
  _key: string;
  image: SanityImageObject;
  alt: string;
  caption?: string;
  captionPosition?: CaptionPosition;
};
