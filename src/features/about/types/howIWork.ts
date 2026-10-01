import type { SanityImageObject } from "@sanity/image-url";

import type { ColourToken } from "../../skills/types/skills";

export type HowIWorkItem = {
  _key: string;
  variant: ColourToken;
  icon: SanityImageObject;
  iconAlt?: string;
  title: string;
  content: string;
};
