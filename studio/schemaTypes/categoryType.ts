import {defineField, defineType} from 'sanity'
import {FolderIcon} from '@sanity/icons/Folder'

import {colourOptions} from './colourOptions'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: FolderIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Shown above the title on work pages in this category.',
    }),

    defineField({
      name: 'colour',
      title: 'Colour',
      type: 'string',
      description: 'Colour scheme for this category\'s box under "Other categories".',
      initialValue: 'neutral',
      options: {
        list: colourOptions,
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],

  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{field: 'displayOrder', direction: 'asc'}],
    },
  ],

  preview: {
    select: {
      title: 'title',
      displayOrder: 'displayOrder',
      media: 'icon',
    },

    prepare({title, displayOrder, media}) {
      return {
        title,
        subtitle: `Order: ${displayOrder ?? 0}`,
        media,
      }
    },
  },
})
