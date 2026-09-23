type TypographyStyle = {
  name: string;
  className: string;
  sample: string;
};

const urbanistHeadings: TypographyStyle[] = [
  {
    name: "H1",
    className: "font-heading font-medium text-5xl",
    sample: "Creative ideas made visible",
  },
];

const interHeadings: TypographyStyle[] = [
  {
    name: "H2",
    className: "font-body text-4xl",
    sample: "Creative ideas made visible",
  },
  {
    name: "H3",
    className: "font-body text-3xl",
    sample: "Creative ideas made visible",
  },
  {
    name: "H4",
    className: "font-body text-lg",
    sample: "Creative ideas made visible",
  },
  {
    name: "H5",
    className: "font-body text-base",
    sample: "Creative ideas made visible",
  },
  {
    name: "H6",
    className: "font-body text-sm",
    sample: "Creative ideas made visible",
  },
];

const instrumentSerifStyles: TypographyStyle[] = [
  {
    name: "Regular",
    className: "font-serif text-3xl font-normal",
    sample: "Creative ideas made visible",
  },
  {
    name: "Italic",
    className: "font-serif text-3xl font-normal italic",
    sample: "Creative ideas made visible",
  },
];

export function TypographyVariantsUi() {
  return (
    <section className="flex flex-col gap-16">
      <TypographySection title="Inter — Body">
        <TypographyPreview
          name="Regular"
          className="font-body text-base font-normal"
          sample="Design is the process of giving ideas a clear and meaningful form."
        />

        <TypographyPreview
          name="Bold"
          className="font-body text-base font-bold"
          sample="Design is the process of giving ideas a clear and meaningful form."
        />
      </TypographySection>

      <TypographySection title="Urbanist — Jumbo Headings">
        {urbanistHeadings.map((style) => (
          <TypographyPreview
            key={`extra-bold-${style.name}`}
            {...style}
            className={`${style.className} font-extrabold`}
          />
        ))}
      </TypographySection>

      <TypographySection title="Inter — Extra Bold Headings">
        {interHeadings.map((style) => (
          <TypographyPreview
            key={`extra-bold-${style.name}`}
            {...style}
            className={`${style.className} font-extrabold`}
          />
        ))}
      </TypographySection>

      <TypographySection title="Inter — Regular Headings">
        {interHeadings.map((style) => (
          <TypographyPreview
            key={`regular-${style.name}`}
            {...style}
            className={`${style.className} font-normal`}
          />
        ))}
      </TypographySection>

      <TypographySection title="Instrument Serif">
        {instrumentSerifStyles.map((style) => (
          <TypographyPreview key={style.name} {...style} />
        ))}
      </TypographySection>
    </section>
  );
}

type TypographySectionProps = {
  title: string;
  children: React.ReactNode;
};

function TypographySection({ title, children }: TypographySectionProps) {
  return (
    <section>
      <header className="mb-4">
        <h2 className="text-lg font-semibold capitalize">{title}</h2>
      </header>

      <div className="flex flex-col gap-8">{children}</div>
    </section>
  );
}

type TypographyPreviewProps = TypographyStyle;

function TypographyPreview({
  name,
  className,
  sample,
}: TypographyPreviewProps) {
  return (
    <div className="grid gap-3 md:grid-cols-[10rem_minmax(0,1fr)] md:items-baseline shadow shadow-lg border border-black/10 bg-white p-4">
      <div className="font-body text-xs text-slate-500">
        <p className="font-bold uppercase tracking-wider">{name}</p>

        <code className="mt-1 block break-words">
          {className
            .split(" ")
            .map((value) => `.${value}`)
            .join(" ")}
        </code>
      </div>

      <p className={className}>{sample}</p>
    </div>
  );
}
