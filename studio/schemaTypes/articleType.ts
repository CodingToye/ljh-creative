import {defineField, defineType} from 'sanity'
import {taxonomyFields} from './fields/taxonomyFields'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'

export const articleType = defineType({
  name: 'article',
  title: 'Thinking',
  type: 'document',
  icon: BulbOutlineIcon,

  // Tabs in the editor
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'publishing', title: 'Publishing'},
    {name: 'taxonomy', title: 'Category & tags'},
  ],

  fields: [
    defineField({
      name: 'title',
      group: 'content',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      group: 'content',
      title: 'Slug',
      type: 'slug',
      description: 'The URL used for this article.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'excerpt',
      group: 'content',
      title: 'Excerpt',
      type: 'text',
      description: 'A short summary displayed on the Thinking page.',
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),

    defineField({
      name: 'coverImage',
      group: 'content',
      title: 'Cover image',
      type: 'image',
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

        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'body',
      group: 'content',
      title: 'Article content',
      type: 'array',
      of: [
        {
          type: 'block',

          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],

          lists: [
            {title: 'Bullet list', value: 'bullet'},
            {title: 'Numbered list', value: 'number'},
          ],

          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],

            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',

                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto'],
                      }),
                  }),
                ],
              },
            ],
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: 'featured',
      group: 'publishing',
      title: 'Featured article',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'publishedAt',
      group: 'publishing',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    ...taxonomyFields,
  ],

  orderings: [
    {
      title: 'Published date, newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],

  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      media: 'coverImage',
    },

    prepare({title, publishedAt, media}) {
      return {
        title,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString('en-GB')
          : 'No publication date',
        media,
      }
    },
  },
})
