import type { SanityImageObject } from "@sanity/image-url";
import type { CSSProperties } from "react";
import { Link } from "react-router";

import type { ColourToken } from "../../features/skills/types/skills";
import { urlFor } from "../../services/sanity/image";
import { PlayButton } from "../ui/PlayButton";

// inline: icon beside a large title, with body text below.
// stacked: compact box with the icon above a small title, no body text.
export type CTABoxLayout = "inline" | "stacked";

type CTABoxProps = {
  icon?: SanityImageObject | null;
  iconAlt?: string;
  title: string;
  content?: string;
  variant?: ColourToken;
  layout?: CTABoxLayout;
  // Optional destination for the play button; without it the strip is decorative
  to?: string;
};

export function CTABox({
  icon,
  iconAlt,
  title,
  content,
  variant = "primary",
  layout = "inline",
  to,
}: CTABoxProps) {
  // Each variant uses the same shades: 200 box, 300 strip, 500 button
  const variantStyles = {
    "--cta-box-bg": `var(--color-${variant}-200)`,
    "--cta-box-strip": `var(--color-${variant}-300)`,
    "--cta-box-button": `var(--color-${variant}-500)`,
  } as CSSProperties;

  const isStacked = layout === "stacked";

  const stripClasses = `flex shrink-0 items-center justify-center bg-(--cta-box-strip) ${
    isStacked ? "w-12" : "w-16"
  }`;

  // An icon with alt text but no upload has no asset
  const iconImage = icon?.asset && (
    <img
      src={urlFor(icon).height(160).auto("format").url()}
      alt={iconAlt ?? ""}
      loading="lazy"
      decoding="async"
      // self-start stops the stacked (flex column) layout stretching it to full width
      className={`w-auto shrink-0 self-start object-contain ${isStacked ? "h-16" : "h-20"}`}
    />
  );

  return (
    <article
      className="flex overflow-hidden rounded-lg bg-(--cta-box-bg)"
      style={variantStyles}
    >
      {isStacked ? (
        <div className="flex flex-1 flex-col justify-between gap-4 p-5">
          {iconImage}
          <h3 className="font-heading text-sm/5 font-medium whitespace-pre-line">
            {title}
          </h3>
        </div>
      ) : (
        <div className="flex-1 p-8">
          <header className="flex items-center gap-8">
            {iconImage}
            <h3 className="font-heading text-2xl/8 whitespace-pre-line">
              {title}
            </h3>
          </header>
          {content && (
            <p className="mt-6 text-sm/6 whitespace-pre-line">{content}</p>
          )}
        </div>
      )}

      {to ? (
        <Link
          to={to}
          aria-label={title}
          className={`${stripClasses} transition-opacity hover:opacity-80`}
        >
          <PlayButton className="bg-(--cta-box-button) text-white" />
        </Link>
      ) : (
        <div aria-hidden="true" className={stripClasses}>
          <PlayButton className="bg-(--cta-box-button) text-white" />
        </div>
      )}
    </article>
  );
}
