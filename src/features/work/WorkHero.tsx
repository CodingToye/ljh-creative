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
    <dl className={`grid grid-cols-4 gap-4 ${className}`}>
      {filledDetails.map(({ label, value }) => (
        <div key={label} className={span === 2 ? "col-span-2" : "col-span-1"}>
          <dt className="font-heading font-bold uppercase text-tertiary-500">
            {label}
          </dt>
          <dd className="mt-2 font-heading font-medium whitespace-pre-line">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function WorkHero({ project }: WorkHeroProps) {
  return (
    <div className="">
      <div className="mx-auto max-w-5xl mb-8 p-5 rounded-xl border border-tertiary-500 bg-white">
        <DetailsPanel
          span={1}
          details={[
            { label: "Studio", value: project.studio },
            { label: "My role", value: project.role },
            { label: "Duration", value: project.duration },
            { label: "Format", value: project.format },
          ]}
          className="mb-10"
        />
        <DetailsPanel
          span={2}
          className=""
          details={[
            { label: "Audience", value: project.audience },
            { label: "Responsibilities", value: project.responsibilities },
          ]}
        />
      </div>
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
    </div>
  );
}
