import { defineField, defineType } from "sanity";

export const featureImageType = defineType({
  name: "featureImage",
  title: "Feature image",
  type: "object",

  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description:
        "Describe the content and purpose of the image for screen-reader users.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),

    defineField({
      name: "captionPosition",
      title: "Caption position",
      type: "string",
      initialValue: "left",
      options: {
        layout: "radio",
        list: [
          {
            title: "Left",
            value: "left",
          },
          {
            title: "Centre",
            value: "centre",
          },
          {
            title: "Right",
            value: "right",
          },
        ],
      },
    }),
  ],

  preview: {
    select: {
      title: "caption",
      media: "image",
      position: "captionPosition",
    },

    prepare({ title, media, position }) {
      return {
        title: title || "Feature image",
        subtitle: title ? `Caption: ${position ?? "left"}` : "No caption",
        media,
      };
    },
  },
});
