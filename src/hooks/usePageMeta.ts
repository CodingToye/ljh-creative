import { useEffect } from "react";

const SITE_NAME = "LJH Creative Portfolio";

type UsePageMetaOptions = {
  title?: string;
  description: string;
};

export function usePageMeta({ title, description }: UsePageMetaOptions) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

    let descriptionElement = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    if (!descriptionElement) {
      descriptionElement = document.createElement("meta");
      descriptionElement.name = "description";
      document.head.appendChild(descriptionElement);
    }

    descriptionElement.content = description;
  }, [title, description]);
}
