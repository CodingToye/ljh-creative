import type { SocialLinkData } from "../../features/socialLinks/types/socialLink";
import { urlFor } from "../../services/sanity/image";

type SocialLinkProps = {
  link: SocialLinkData;
};

export function SocialLink({ link }: SocialLinkProps) {
  if (!link.href) {
    return null;
  }

  const isWebLink = link.linkType === "url";

  return (
    <a
      href={link.href}
      target={isWebLink ? "_blank" : undefined}
      rel={isWebLink ? "noreferrer noopener" : undefined}
      className="group flex items-center gap-6"
    >
      <img
        src={urlFor(link.icon).height(96).auto("format").url()}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-12 w-auto shrink-0"
      />
      <span className="text-sm text-primary-500 underline underline-offset-2 group-hover:text-primary-600">
        {link.label} &gt;
      </span>
    </a>
  );
}
