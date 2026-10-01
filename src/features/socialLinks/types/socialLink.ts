import type { SanityImageObject } from "@sanity/image-url";

export type SocialLinkData = {
  _id: string;
  label: string;
  icon: SanityImageObject;
  linkType: "url" | "file";
  href: string | null;
};

// GROQ projection for a dereferenced socialLink. File links get ?dl= so
// Sanity's CDN sends them as a download with their original filename.
export const socialLinkProjection = `{
  _id,
  label,
  icon,
  linkType,
  "href": select(
    linkType == "file" => file->file.asset->url + "?dl=",
    url
  )
}`;
