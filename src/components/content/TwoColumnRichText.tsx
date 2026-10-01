import type { PortableTextBlock } from "@portabletext/types";

import { RichText } from "./RichText";

type TwoColumnRichTextProps = {
  left: PortableTextBlock[];
  right: PortableTextBlock[];
};

export function TwoColumnRichText({ left, right }: TwoColumnRichTextProps) {
  return (
    <div className="grid gap-x-16 md:grid-cols-2">
      <div className="[&>*:first-child]:mt-0">
        <RichText value={left} />
      </div>
      <div className="md:[&>*:first-child]:mt-0">
        <RichText value={right} />
      </div>
    </div>
  );
}
