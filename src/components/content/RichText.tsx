import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

type RichTextProps = {
  value: PortableTextBlock[];
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 leading-7 text-slate-700">{children}</p>
    ),

    h2: ({ children }) => (
      <h2 className="mt-12 text-3xl font-semibold tracking-tight">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mt-8 text-2xl font-semibold">{children}</h3>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-4 border-slate-300 pl-6 text-xl italic text-slate-600">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-slate-700">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-slate-700">
        {children}
      </ol>
    ),
  },

  marks: {
    link: ({ children, value }) => {
      const href = value?.href as string | undefined;
      const isExternal = href?.startsWith("http");

      if (!href) {
        return <>{children}</>;
      }

      return (
        <a
          href={href}
          className="underline decoration-slate-400 underline-offset-4 hover:decoration-slate-900"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer noopener" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export function RichText({ value }: RichTextProps) {
  return <PortableText value={value} components={components} />;
}
