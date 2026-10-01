import type { PortableTextBlock } from "@portabletext/types";

import type { ColourToken } from "../../skills/types/skills";

export type PullQuoteData = {
  _id: string;
  pullQuote: PortableTextBlock[];
  fullQuote: PortableTextBlock[];
};

export type PullQuoteSelection = {
  variant: ColourToken;
  quote: PullQuoteData | null;
};

// GROQ projection for a pull quote selection field (e.g. aboutPage.pullQuoteOne)
export const pullQuoteSelectionProjection = `{
  variant,
  "quote": quote->{
    _id,
    pullQuote,
    fullQuote
  }
}`;
