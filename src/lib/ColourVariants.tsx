export const colourVariants = {
  primary: {
    500: "var(--color-primary-500)",
    400: "var(--color-primary-400)",
    300: "var(--color-primary-300)",
    200: "var(--color-primary-200)",
  },
  secondary: {
    500: "var(--color-secondary-500)",
    400: "var(--color-secondary-400)",
    300: "var(--color-secondary-300)",
    200: "var(--color-secondary-200)",
  },
  neutral: {
    500: "var(--color-neutral-500)",
    400: "var(--color-neutral-400)",
    300: "var(--color-neutral-300)",
    200: "var(--color-neutral-200)",
  },
  tertiary: {
    500: "var(--color-tertiary-500)",
    400: "var(--color-tertiary-400)",
    300: "var(--color-tertiary-300)",
    200: "var(--color-tertiary-200)",
  },
  tertiary2: {
    500: "var(--color-tertiary2-500)",
    400: "var(--color-tertiary2-400)",
    300: "var(--color-tertiary2-300)",
    200: "var(--color-tertiary2-200)",
  },
};

export type ColourVariant = keyof typeof colourVariants;
