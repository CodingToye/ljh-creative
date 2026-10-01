import { Section, type SectionVariant } from "../../components/layout/Section";
import { urlFor } from "../../services/sanity/image";
import type {
  WorkSectionData,
  WorkSectionImage,
  WorkSectionImageSize,
} from "./types/work";

// Default sizing for images with no size set in Sanity.
// equal: every image is standard. featured: the first image is wide.
export type WorkSectionImageLayout = "equal" | "featured";

type WorkSectionProps = {
  title: string;
  section?: WorkSectionData | null;
  variant?: SectionVariant;
  imageLayout?: WorkSectionImageLayout;
};

// Column span on the 3-column grid, plus an aspect ratio for the stacked mobile layout
const sizeClasses: Record<WorkSectionImageSize, string> = {
  standard: "aspect-square sm:aspect-auto",
  wide: "aspect-[2/1] sm:col-span-2 sm:aspect-auto",
  full: "aspect-[2/1] sm:col-span-3 sm:aspect-auto",
};

const sizeColumns: Record<WorkSectionImageSize, number> = {
  standard: 1,
  wide: 2,
  full: 3,
};

function getImageSize(
  image: WorkSectionImage,
  index: number,
  imageLayout: WorkSectionImageLayout,
): WorkSectionImageSize {
  if (image.size) {
    return image.size;
  }

  return imageLayout === "featured" && index === 0 ? "wide" : "standard";
}

function getImageUrl(image: WorkSectionImage, size: WorkSectionImageSize) {
  return urlFor(image)
    .width(640 * sizeColumns[size])
    .height(640)
    .fit("crop")
    .auto("format")
    .url();
}

export function WorkSection({
  title,
  section,
  variant = "white",
  imageLayout = "equal",
}: WorkSectionProps) {
  const content = section?.content;
  // Skip images that have fields filled in (size, alt) but no file uploaded yet
  const images = (section?.images ?? []).filter((image) => image.asset);
  const caption = section?.caption;
  const bannerImage = section?.bannerImage?.asset ? section.bannerImage : null;

  if (!content && images.length === 0 && !bannerImage) {
    return null;
  }

  // A blank line in the text box starts a new paragraph
  const paragraphs = content?.split(/\n\s*\n/) ?? [];

  return (
    <>
      {bannerImage && (
        <img
          src={urlFor(bannerImage)
            .width(2400)
            .height(1300)
            .fit("crop")
            .auto("format")
            .url()}
          alt={bannerImage.alt ?? ""}
          loading="lazy"
          decoding="async"
          className="aspect-[24/13] w-full object-cover"
        />
      )}

      <Section variant={variant} container="content">
        <div className="mx-auto max-w-5xl">
          <header className="mb-8 text-center">
            <h2 className="text-4xl font-heading">{title}</h2>
          </header>

          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="mt-3 font-body text-base/6 whitespace-pre-line first:mt-0"
            >
              {paragraph}
            </p>
          ))}

          {images.length > 0 && (
            <figure className="mt-12">
              {/* Rows are one column-width tall (container width minus the two gaps, / 3),
                so every image in a row shares the same height whatever it spans */}
              <div className="@container">
                <div className="grid gap-6 sm:grid-cols-3 sm:auto-rows-[calc((100cqw-3rem)/3)] md:gap-10 md:auto-rows-[calc((100cqw-5rem)/3)]">
                  {images.map((image, index) => {
                    const size = getImageSize(image, index, imageLayout);

                    return (
                      <img
                        key={image._key}
                        src={getImageUrl(image, size)}
                        alt={image.alt ?? ""}
                        loading="lazy"
                        decoding="async"
                        className={`size-full object-cover ${sizeClasses[size]}`}
                      />
                    );
                  })}
                </div>
              </div>

              {caption && (
                <figcaption className="mt-8 text-center font-serif text-sm italic text-neutral-400">
                  {caption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </Section>
    </>
  );
}
