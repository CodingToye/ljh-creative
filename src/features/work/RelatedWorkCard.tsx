import { Link } from "react-router";

import { PlayButton } from "../../components/ui/PlayButton";
import { urlFor } from "../../services/sanity/image";
import type { RelatedWork } from "./types/work";

type RelatedWorkCardProps = {
  project: RelatedWork;
};

export function RelatedWorkCard({ project }: RelatedWorkCardProps) {
  const href = `/work/${project.slug}`;

  return (
    <article className="flex flex-col items-center gap-3">
      {/* Duplicates the title link below, so it's hidden from keyboard and screen readers */}
      <Link
        to={href}
        tabIndex={-1}
        aria-hidden="true"
        className="group flex h-36 w-full overflow-hidden rounded-lg bg-secondary-300"
      >
        <div className="flex-1">
          {project.heroImage?.asset && (
            <img
              src={urlFor(project.heroImage)
                .width(560)
                .height(288)
                .fit("crop")
                .auto("format")
                .url()}
              alt={project.heroImage.alt ?? ""}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          )}
        </div>
        <div className="flex w-12 shrink-0 items-center justify-center bg-neutral-500 transition-opacity group-hover:opacity-90">
          <PlayButton className="bg-secondary-300 text-neutral-500" />
        </div>
      </Link>

      <Link to={href} className="text-sm text-neutral-500 underline">
        {project.title} &gt;
      </Link>
    </article>
  );
}
