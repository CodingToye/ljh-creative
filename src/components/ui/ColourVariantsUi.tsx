import { useState } from "react";

import { getContrastingTextColour } from "../../lib/colourContrast";
import { colourVariants } from "../../lib/ColourVariants";

export function ColourVariantsUi() {
  const [copiedClass, setCopiedClass] = useState<string | null>(null);

  async function copyClassName(className: string) {
    try {
      await navigator.clipboard.writeText(className);
      setCopiedClass(className);

      window.setTimeout(() => {
        setCopiedClass((current) => (current === className ? null : current));
      }, 1500);
    } catch (error) {
      console.error("Unable to copy class name:", error);
    }
  }

  return (
    <section className="flex flex-col gap-8">
      {Object.entries(colourVariants).map(([variantType, shades]) => (
        <section key={variantType}>
          <header className="mb-4">
            <h2 className="text-lg font-semibold capitalize">{variantType}</h2>
          </header>

          <div className="grid grid-cols-4 gap-4">
            {Object.entries(shades)
              .reverse()
              .map(([shade, colour]) => {
                const className = `bg-${variantType}-${shade}`;
                const textColour = getContrastingTextColour(colour);
                const hasCopied = copiedClass === className;
                return (
                  <div
                    key={colour}
                    className="flex flex-col items-center shadow shadow-lg border border-black/10 bg-white p-4"
                  >
                    <button
                      key={shade}
                      type="button"
                      onClick={() => void copyClassName(className)}
                      className="flex size-24 flex-col items-center justify-center cursor-pointer border rounded"
                      style={{
                        backgroundColor: colour,
                        borderColor: `color-mix(in srgb, ${colour} 90%, black)`,
                        boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${colour} 85%, white)`,
                        color: textColour,
                      }}
                      aria-label={`Copy ${className}`}
                      title={`Copy ${className}`}
                    >
                      <span className="font-semibold">{shade}</span>
                    </button>
                    <span className="mt-1 text-micro font-bold text-black/50">
                      {hasCopied ? "Copied!" : className}
                    </span>
                  </div>
                );
              })}
          </div>
        </section>
      ))}
    </section>
  );
}
