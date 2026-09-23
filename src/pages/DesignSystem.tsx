import { ColourVariantsUi } from "../components/ui/ColourVariantsUi";
import { TypographyVariantsUi } from "../components/ui/TypographyVariantsUi";
import { usePageMeta } from "../hooks/usePageMeta";

export function DesignSystem() {
  usePageMeta({
    title: "Design System",
    description: "Temporary Design System.",
  });
  return (
    <main>
      <section className="mx-auto gap-16 grid max-w-7xl px-6 py-16 grid-cols-2 md:py-24">
        <div className="flex flex-col gap-4">
          <header>
            <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
              Colours
            </p>
          </header>
          <ColourVariantsUi />
        </div>

        <div className="flex flex-col gap-4">
          <header>
            <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
              Typography
            </p>
          </header>
          <TypographyVariantsUi />
        </div>
      </section>
    </main>
  );
}
