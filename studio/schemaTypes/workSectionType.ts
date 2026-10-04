import {defineArrayMember, defineField, defineType} from 'sanity'

// A reusable case-study section: text followed by a row of captioned images
export const workSectionType = defineType({
  name: 'workSection',
  title: 'Work section',
  type: 'object',
  options: {
    collapsible: false,
  },

  fields: [
    defineField({
      name: 'bannerImage',
      title: 'Banner image',
      type: 'image',
      description: 'Optional full-width image shown above the section.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Describe the image for accessibility.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Laid out on a 3-column grid below the content, in order.',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'size',
              title: 'Size',
              type: 'string',
              description: 'How many of the 3 grid columns this image spans.',
              options: {
                list: [
                  {title: 'Standard (1 column)', value: 'standard'},
                  {title: 'Wide (2 columns)', value: 'wide'},
                  {title: 'Full width (3 columns)', value: 'full'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            }),
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              description: 'Describe the image for accessibility.',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Shown below the images.',
    }),
  ],
})
