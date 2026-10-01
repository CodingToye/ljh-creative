import type { SanityImageObject } from "@sanity/image-url";

import type { ColourToken } from "../../skills/types/skills";

export type CareerJourneyStep = {
  _key: string;
  colour: ColourToken;
  icon: SanityImageObject;
  iconAlt?: string;
  subtitle: string;
  content: string;
};
