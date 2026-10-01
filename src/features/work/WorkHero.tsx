import { urlFor } from "../../services/sanity/image";
import type { Work } from "./types/work";

type WorkHeroProps = {
  project: Work;
};

type WorkDetail = {
  label: string;
  value?: string | null;
};

type DetailsPanelProps = {
  details: WorkDetail[];
  // Columns each item spans in the shared 4-column grid
  span: 1 | 2;
  className?: string;
};

function DetailsPanel({ details, span, className = "" }: DetailsPanelProps) {
  const filledDetails = details.filter((detail) => detail.value);

  if (filledDetails.length === 0) {
    return null;
  }

  return (
    <dl
      className={`grid grid-cols-2 gap-x-6 gap-y-4 rounded-lg border border-white/60 bg-white/75 px-4 py-3 backdrop-blur-sm md:grid-cols-4 ${className}`}
    >
      {filledDetails.map(({ label, value }) => (
        <div key={label} className={span === 2 ? "col-span-2" : undefined}>
          <dt className="font-heading text-sm font-semibold uppercase text-tertiary-500">
            {label}
          </dt>
          <dd className="mt-2 font-heading text-sm whitespace-pre-line">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function WorkHero({ project }: WorkHeroProps) {
  return (
    <div className="relative">
      <img
        src={urlFor(project.heroImage)
          .width(2000)
          .height(1200)
          .fit("crop")
          .auto("format")
          .url()}
        alt={project.heroImage.alt}
        className="aspect-[5/3] w-full object-cover"
      />

      {/* Overlaid on the image from md up; stacked below it on mobile */}
      <div className="flex flex-col gap-4 px-6 pt-6 md:absolute md:inset-x-[9%] md:inset-y-6 md:px-0 md:pt-0">
        <DetailsPanel
          span={1}
          details={[
            { label: "Studio", value: project.studio },
            { label: "My role", value: project.role },
            { label: "Duration", value: project.duration },
            { label: "Format", value: project.format },
          ]}
        />
        <DetailsPanel
          span={2}
          className="md:mt-auto"
          details={[
            { label: "Audience", value: project.audience },
            { label: "Responsibilities", value: project.responsibilities },
          ]}
        />
      </div>
    </div>
  );
}
