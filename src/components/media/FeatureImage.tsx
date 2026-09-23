import type { SanityImageObject } from "@sanity/image-url";

import type { CaptionPosition } from "../../features/home/types/featureImage";
import { urlFor } from "../../services/sanity/image";

type FeatureImageProps = {
  image: SanityImageObject;
  alt: string;
  caption?: string;
  captionPosition?: CaptionPosition;
  className?: string;
  loading?: "eager" | "lazy";
};

const captionPositionClasses: Record<CaptionPosition, string> = {
  left: "text-left",
  centre: "text-center",
  right: "text-right",
};

function getImageUrl(image: SanityImageObject, width: number) {
  return urlFor(image).width(width).auto("format").url();
}

export function FeatureImage({
  image,
  alt,
  caption,
  captionPosition = "left",
  className = "",
  loading = "lazy",
}: FeatureImageProps) {
  const imageWidths = [640, 960, 1280, 1600];

  const srcSet = imageWidths
    .map((width) => `${getImageUrl(image, width)} ${width}w`)
    .join(", ");

  return (
    <figure className={className}>
      <img
        src={getImageUrl(image, 1600)}
        srcSet={srcSet}
        sizes="(min-width: 1440px) 1440px, 100vw"
        alt={alt}
        loading={loading}
        decoding="async"
        className="h-auto w-full"
      />

      {caption && (
        <figcaption
          className={[
            "leading-6 font-serif italic text-neutral-500",
            captionPositionClasses[captionPosition],
          ].join(" ")}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
