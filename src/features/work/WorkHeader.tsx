import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { urlFor } from "../../services/sanity/image";
import type { Work } from "./types/work";

type WorkHeaderProps = {
  project: Work;
};

const headingComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <span className="block">{children}</span>,
  },
};

export function WorkHeader({ project }: WorkHeaderProps) {
  const { category, tags, heading, title, summary } = project;
  const metaItems = [category, ...tags].filter((item) => item != null);

  return (
    <header className="mx-auto flex max-w-5xl flex-col items-center px-6 py-12 text-center">
      {category?.icon && (
        <img
          src={urlFor(category.icon).height(160).auto("format").url()}
          alt=""
          className="mb-6 h-20 w-auto"
        />
      )}

      {metaItems.length > 0 && (
        <ul
          aria-label="Category and tags"
          className="flex flex-wrap justify-center text-xs font-semibold uppercase text-tertiary-500"
        >
          {metaItems.map((item) => (
            <li
              key={item._id}
              className="after:mx-1 after:content-['·'] last:after:content-none"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}

      <h1 className="mt-4 font-heading text-5xl font-medium md:text-[70px]/[80px] [&_em]:font-bold">
        {heading?.length ? (
          <PortableText value={heading} components={headingComponents} />
        ) : (
          title
        )}
      </h1>

      <p className="mt-6 max-w-md font-body text-base/6 font-normal">
        {summary}
      </p>
    </header>
  );
}
