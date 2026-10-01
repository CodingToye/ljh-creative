import type { SanityImageObject } from "@sanity/image-url";
import type { CSSProperties } from "react";
import { Link } from "react-router";

import type { ColourToken } from "../../features/skills/types/skills";
import { urlFor } from "../../services/sanity/image";

type CTABoxProps = {
  icon: SanityImageObject;
  iconAlt?: string;
  title: string;
  content: string;
  variant?: ColourToken;
  // Optional destination for the play button; without it the strip is decorative
  to?: string;
};

function PlayButton() {
  return (
    <span className="flex size-10 items-center justify-center rounded-full bg-(--cta-box-button) text-white">
      <svg aria-hidden="true" viewBox="0 0 12 14" className="ml-0.5 h-3.5 w-3 fill-current">
        <path d="M0 0v14l12-7z" />
      </svg>
    </span>
  );
}

export function CTABox({
  icon,
  iconAlt,
  title,
  content,
  variant = "primary",
  to,
}: CTABoxProps) {
  // Each variant uses the same shades: 200 box, 300 strip, 500 button
  const variantStyles = {
    "--cta-box-bg": `var(--color-${variant}-200)`,
    "--cta-box-strip": `var(--color-${variant}-300)`,
    "--cta-box-button": `var(--color-${variant}-500)`,
  } as CSSProperties;

  const stripClasses =
    "flex w-16 shrink-0 items-center justify-center bg-(--cta-box-strip)";

  return (
    <article
      className="flex overflow-hidden rounded-lg bg-(--cta-box-bg)"
      style={variantStyles}
    >
      <div className="flex-1 p-8">
        <header className="flex items-center gap-8">
          <img
            src={urlFor(icon).height(160).auto("format").url()}
            alt={iconAlt ?? ""}
            loading="lazy"
            decoding="async"
            className="h-20 w-auto shrink-0"
          />
          <h3 className="font-heading text-2xl/8 whitespace-pre-line">
            {title}
          </h3>
        </header>
        <p className="mt-6 text-sm/6 whitespace-pre-line">{content}</p>
      </div>

      {to ? (
        <Link
          to={to}
          aria-label={title}
          className={`${stripClasses} transition-opacity hover:opacity-80`}
        >
          <PlayButton />
        </Link>
      ) : (
        <div aria-hidden="true" className={stripClasses}>
          <PlayButton />
        </div>
      )}
    </article>
  );
}
