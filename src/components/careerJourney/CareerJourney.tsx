import type { CSSProperties } from "react";

import type { CareerJourneyStep } from "../../features/about/types/careerJourney";
import { urlFor } from "../../services/sanity/image";

type CareerJourneyProps = {
  steps: CareerJourneyStep[];
};

export function CareerJourney({ steps }: CareerJourneyProps) {
  // The timeline bar runs from the centre of the first column to the centre of the last
  const barInset = `${50 / steps.length}%`;

  return (
    <div className="flex flex-col">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-heading">My career journey</h2>
      </header>
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute top-3 hidden h-px bg-neutral-400 md:block"
          style={{ left: barInset, right: barInset }}
        />
        <ol
          className="relative grid gap-12 md:grid-cols-[repeat(var(--steps),minmax(0,1fr))] md:gap-x-12 md:gap-y-0"
          style={{ "--steps": steps.length } as CSSProperties}
        >
          {steps.map((step) => (
            <li
              key={step._key}
              // Subgrid shares the ring/icon/subtitle/content rows across steps,
              // so content lines up even when a subtitle wraps onto two lines
              className="relative flex flex-col items-start text-center md:row-span-4 md:grid md:grid-rows-subgrid md:justify-items-center"
            >
              <span
                aria-hidden="true"
                className="mb-8 size-6 rounded-full border-[5px] bg-tertiary-200"
                style={{ borderColor: `var(--color-${step.colour}-500)` }}
              />
              <img
                src={urlFor(step.icon).height(160).auto("format").url()}
                alt={step.iconAlt ?? ""}
                loading="lazy"
                decoding="async"
                className="mb-6 h-20 w-auto"
              />
              <div className="flex flex-col h-full">
                <h3 className="grow mb-6 max-w-full font-heading text-lg/6 font-medium">
                  {step.subtitle}
                </h3>
                <p className="grow max-w-full text-sm/6 whitespace-pre-line">
                  {step.content}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
