import type { SanityImageObject } from "@sanity/image-url";

import type { Skill } from "../../features/skills/types/skills";
import { urlFor } from "../../services/sanity/image";
import { ActionButton } from "../ui/ActionButton";

type SkillsProps = {
  skills: Skill[];
};

function getImageUrl(image: SanityImageObject, width: number) {
  return urlFor(image).width(width).auto("format").url();
}

export function Skills({ skills }: SkillsProps) {
  return (
    <div className="flex flex-col">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-heading">What I bring together</h1>
      </header>
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${skills.length}, minmax(0, 1fr))`,
        }}
      >
        {skills.map((skill) => (
          <article
            key={skill._id}
            className="flex flex-col gap-4 rounded-2xl"
            style={{
              backgroundColor: `var(--color-${skill.backgroundColour}-300)`,
            }}
          >
            <div className="flex h-full justify-between">
              <div className="p-4">
                <img
                  src={getImageUrl(skill.image, 70)}
                  alt={skill.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-[70px] w-auto mb-4"
                />
                <h3 className="text-base/5 font-medium">{skill.title}</h3>
              </div>
              <div
                className="flex flex-col justify-center rounded-r-2xl p-4 bg-red-500"
                style={{
                  backgroundColor: `var(--color-${skill.backgroundColour}-400)`,
                }}
              >
                <ActionButton variant={skill.backgroundColour} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
