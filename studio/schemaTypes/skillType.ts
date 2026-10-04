import {defineField, defineType} from 'sanity'
import {SparkleIcon} from '@sanity/icons/Sparkle'

import {colourOptions} from './colourOptions'

export const skillType = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  icon: SparkleIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'backgroundColour',
      title: 'Background colour',
      type: 'string',
      initialValue: 'primary',
      options: {
        list: colourOptions,
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],

  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [
        {
          field: 'displayOrder',
          direction: 'asc',
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      displayOrder: 'displayOrder',
    },

    prepare({title, displayOrder}) {
      return {
        title,
        subtitle: `Order: ${displayOrder ?? 0}`,
      }
    },
  },
})
