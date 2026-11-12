import { Section, type SectionVariant } from "../../components/layout/Section";
import { urlFor } from "../../services/sanity/image";
import type {
  WorkSectionData,
  WorkSectionImage,
  WorkSectionImageSize,
  WorkSectionMedia,
} from "./types/work";

export type WorkSectionImageLayout = "equal" | "featured";

type WorkSectionProps = {
  title: string;
  section?: WorkSectionData | null;
  variant?: SectionVariant;
  imageLayout?: WorkSectionImageLayout;
};

type GridSize = Exclude<WorkSectionImageSize, "bleed">;

type MediaEntry = {
  item: WorkSectionMedia;
  index: number;
};

type GalleryGroup =
  | { type: "grid"; entries: MediaEntry[] }
  | { type: "bleed"; entry: MediaEntry };

const sizeClasses: Record<GridSize, string> = {
  standard: "aspect-square sm:aspect-auto",
  wide: "aspect-[2/1] sm:col-span-2 sm:aspect-auto",
  full: "aspect-[2/1] sm:col-span-3 sm:aspect-auto",
};

const sizeColumns: Record<GridSize, number> = {
  standard: 1,
  wide: 2,
  full: 3,
};

function getMediaSize(
  media: WorkSectionMedia,
  index: number,
  imageLayout: WorkSectionImageLayout,
): WorkSectionImageSize {
  if (media.size) {
    return media.size;
  }

  return imageLayout === "featured" && index === 0 ? "wide" : "standard";
}

function getImageUrl(image: WorkSectionImage, size: GridSize) {
  return urlFor(image)
    .width(640 * sizeColumns[size])
    .height(640)
    .fit("crop")
    .auto("format")
    .url();
}

function isValidMedia(media: WorkSectionMedia): boolean {
  if (media._type === "image") {
    return Boolean(media.asset);
  }

  if (media._type === "file") {
    return Boolean(media.url);
  }

  return false;
}

// Split media into grid groups and full-bleed items,
// preserving the original order defined in Sanity.
function groupMedia(
  media: WorkSectionMedia[],
  imageLayout: WorkSectionImageLayout,
): GalleryGroup[] {
  const groups: GalleryGroup[] = [];

  media.forEach((item, index) => {
    const size = getMediaSize(item, index, imageLayout);
    const entry = { item, index };

    if (size === "bleed") {
      groups.push({ type: "bleed", entry });
      return;
    }

    const lastGroup = groups[groups.length - 1];

    if (lastGroup?.type === "grid") {
      lastGroup.entries.push(entry);
    } else {
      groups.push({
        type: "grid",
        entries: [entry],
      });
    }
  });

  return groups;
}

// Render either an image or a video.
// Full-bleed media retains its original aspect ratio.
function MediaItem({
  item,
  size,
}: {
  item: WorkSectionMedia;
  size: WorkSectionImageSize;
}) {
  const isBleed = size === "bleed";

  const classes = isBleed
    ? "block h-auto w-full"
    : `size-full ${sizeClasses[size]}`;

  if (item._type === "file") {
    return (
      <video
        src={item.url ?? undefined}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={item.title ?? "Project video"}
        className={isBleed ? classes : `${classes} bg-black object-contain`}
      />
    );
  }

  const src = isBleed
    ? urlFor(item).width(3200).auto("format").url()
    : getImageUrl(item, size);

  return (
    <img
      src={src}
      alt={item.alt ?? ""}
      loading="lazy"
      decoding="async"
      className={isBleed ? classes : `${classes} object-cover`}
    />
  );
}

export function WorkSection({
  title,
  section,
  variant = "white",
  imageLayout = "equal",
}: WorkSectionProps) {
  const content = section?.content;

  const media = (section?.images ?? []).filter(isValidMedia);
  const groups = groupMedia(media, imageLayout);

  const caption = section?.caption;

  const bannerImage = section?.bannerImage?.asset ? section.bannerImage : null;

  if (!content && media.length === 0 && !bannerImage) {
    return null;
  }

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

          {media.length > 0 && (
            <figure className="mt-12">
              <div className="space-y-6 md:space-y-10">
                {groups.map((group, groupIndex) => {
                  // Full-bleed media breaks out of the
                  // content container to fill the viewport.
                  if (group.type === "bleed") {
                    return (
                      <div
                        key={group.entry.item._key}
                        className="relative left-1/2 w-screen max-w-none -translate-x-1/2"
                      >
                        <MediaItem item={group.entry.item} size="bleed" />
                      </div>
                    );
                  }

                  // Standard media stays in the existing
                  // 3-column grid.
                  return (
                    <div key={`grid-${groupIndex}`} className="@container">
                      <div className="grid gap-6 sm:grid-cols-3 sm:auto-rows-[calc((100cqw-3rem)/3)] md:gap-10 md:auto-rows-[calc((100cqw-5rem)/3)]">
                        {group.entries.map(({ item, index }) => (
                          <MediaItem
                            key={item._key}
                            item={item}
                            size={getMediaSize(item, index, imageLayout)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
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
