import type { ReactNode } from "react";

import type { ColourToken } from "../../features/skills/types/skills";

export type SectionVariant = ColourToken | "white" | "none";
export type SectionBorderPosition = "top" | "bottom" | "both";
export type SectionContainer = "content" | "site";

type SectionProps = {
  children: ReactNode;
  variant?: SectionVariant;
  borderPosition?: SectionBorderPosition;
  borderVariant?: ColourToken;
  // Wraps children in a standard inner container; omit to render children directly
  container?: SectionContainer;
  containerClassName?: string;
  className?: string;
};

const containerClasses: Record<SectionContainer, string> = {
  content: "mx-auto max-w-7xl px-6 py-16",
  site: "site-container",
};

// Full class names so Tailwind can detect them
const backgroundClasses: Record<SectionVariant, string> = {
  none: "",
  white: "bg-white",
  primary: "bg-primary-200",
  secondary: "bg-secondary-200",
  neutral: "bg-neutral-200",
  tertiary: "bg-tertiary-200",
  tertiary2: "bg-tertiary2-200",
};

const borderColourClasses: Record<ColourToken, string> = {
  primary: "border-primary-400",
  secondary: "border-secondary-400",
  neutral: "border-neutral-400",
  tertiary: "border-tertiary-400",
  tertiary2: "border-tertiary2-400",
};

const borderPositionClasses: Record<SectionBorderPosition, string> = {
  top: "border-t",
  bottom: "border-b",
  both: "border-y",
};

export function Section({
  children,
  variant = "none",
  borderPosition,
  borderVariant = "tertiary",
  container,
  containerClassName = "",
  className = "",
}: SectionProps) {
  const classes = [
    backgroundClasses[variant],
    borderPosition && borderPositionClasses[borderPosition],
    borderPosition && borderColourClasses[borderVariant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes}>
      {container ? (
        <div className={`${containerClasses[container]} ${containerClassName}`}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
