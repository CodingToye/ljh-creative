import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

export const tagType = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,

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
      name: 'category',
      title: 'Category group',
      type: 'reference',
      description: 'The category under which this tag is organised in the filter UI.',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      categoryTitle: 'category.title',
    },

    prepare({title, categoryTitle}) {
      return {
        title,
        subtitle: categoryTitle ?? 'No category',
      }
    },
  },
})
