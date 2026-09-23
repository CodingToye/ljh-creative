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
      <header className="mb-4">
        <h1 className="text-4xl font-serif">What I bring together</h1>
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
            className="flex flex-col gap-4 p-4"
            style={{
              backgroundColor: `var(--color-${skill.backgroundColour}-300)`,
            }}
          >
            <div className="flex gap-4">
              <img
                src={getImageUrl(skill.image, 70)}
                alt={skill.imageAlt}
                loading="lazy"
                decoding="async"
                className="h-[70px] w-auto"
              />
              <h3 className="text-[20px] font-serif">{skill.title}</h3>
            </div>
            <div className="flex justify-end">
              <ActionButton variant={skill.backgroundColour} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
