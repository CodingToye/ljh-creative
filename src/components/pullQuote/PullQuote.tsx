import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { CSSProperties } from "react";

import type { PullQuoteData } from "../../features/pullQuote/types/pullQuote";
import type { ColourToken } from "../../features/skills/types/skills";

type PullQuoteProps = {
  quote: PullQuoteData;
  variant?: ColourToken;
};

// One rounded "6"-style mark; drawn twice to form the opening quote
const QUOTE_MARK_PATH =
  "M23 28A11 11 0 1 1 1.6 24.5C3 14 9 6 20 2A2 2 0 0 1 22.5 5.5C16 9 12.5 13 11.5 17A11 11 0 0 1 23 28Z";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-4 first:mt-0">{children}</p>,
  },
};

export function PullQuote({ quote, variant = "secondary" }: PullQuoteProps) {
  // Each variant uses the same shades: 300 background, 400 quote mark, 500 emphasis
  const variantStyles = {
    "--pull-quote-bg": `var(--color-${variant}-300)`,
    "--pull-quote-mark": `var(--color-${variant}-400)`,
    "--pull-quote-em": `var(--color-${variant}-500)`,
  } as CSSProperties;

  return (
    <section
      className="bg-(--pull-quote-bg) [&_em]:text-(--pull-quote-em) [&_em]:font-bold"
      style={variantStyles}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,470px)] md:py-8">
        <figure className="flex gap-6">
          <svg
            aria-hidden="true"
            viewBox="0 0 50 40"
            className="h-auto w-[52px] shrink-0 self-start fill-(--pull-quote-mark)"
          >
            <path d={QUOTE_MARK_PATH} />
            <path d={QUOTE_MARK_PATH} transform="translate(26 0)" />
          </svg>
          <blockquote className="font-heading text-4xl/10 font-medium">
            <PortableText value={quote.pullQuote} components={components} />
          </blockquote>
        </figure>

        <div className="font-body text-base/6 font-normal">
          <PortableText value={quote.fullQuote} components={components} />
        </div>
      </div>
    </section>
  );
}
