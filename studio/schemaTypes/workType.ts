import {defineArrayMember, defineField, defineType} from 'sanity'
import {taxonomyFields} from './fields/taxonomyFields'
import {CaseIcon} from '@sanity/icons/Case'

import {colourOptions} from './colourOptions'
import {quoteTextBlock} from './pullQuoteType'

export const workType = defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  icon: CaseIcon,

  // Tabs in the editor
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'workDetails', title: 'Work details'},
    {name: 'reason', title: 'The reason'},
    {name: 'challenge', title: 'The challenge'},
    {name: 'solution', title: 'The solution'},
    {name: 'outcome', title: 'The outcome'},
    {name: 'tookForward', title: 'What I took forward'},
    {name: 'publishing', title: 'Publishing'},
    {name: 'taxonomy', title: 'Category & tags'},
  ],

  fields: [
    defineField({
      name: 'title',
      group: 'content',
      title: 'Title',
      type: 'string',
      description: 'Plain-text title used for the URL, browser tab and work cards.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'heading',
      group: 'content',
      title: 'Page heading',
      type: 'array',
      description:
        'The large heading on the project page. Use emphasis to highlight words. Leave empty to use the title.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [{title: 'Emphasis', value: 'em'}],
            annotations: [],
          },
        }),
      ],
    }),

    defineField({
      name: 'slug',
      group: 'content',
      title: 'Slug',
      type: 'slug',
      description: 'The URL used for this project.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'summary',
      group: 'content',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),

    defineField({
      name: 'studio',
      group: 'workDetails',
      title: 'Studio',
      type: 'string',
    }),

    defineField({
      name: 'role',
      group: 'workDetails',
      title: 'My role',
      type: 'string',
    }),

    defineField({
      name: 'duration',
      group: 'workDetails',
      title: 'Duration',
      type: 'string',
    }),

    defineField({
      name: 'format',
      group: 'workDetails',
      title: 'Format',
      type: 'string',
    }),

    defineField({
      name: 'audience',
      group: 'workDetails',
      title: 'Audience',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'responsibilities',
      group: 'workDetails',
      title: 'Responsibilities',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'theReason',
      group: 'reason',
      title: 'The reason',
      type: 'workSection',
    }),

    defineField({
      name: 'theChallenge',
      group: 'challenge',
      title: 'The challenge',
      type: 'workSection',
      description: 'The first image is shown wide unless a size is set.',
    }),

    defineField({
      name: 'theSolution',
      group: 'solution',
      title: 'The solution',
      type: 'workSection',
    }),

    defineField({
      name: 'theOutcome',
      group: 'outcome',
      title: 'The outcome',
      type: 'workSection',
    }),

    defineField({
      name: 'whatITookForward',
      group: 'tookForward',
      title: 'What I took forward',
      type: 'object',
      options: {
        collapsible: false,
      },
      fields: [
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'array',
          description: 'Emphasised text is highlighted in the variant colour.',
          of: [quoteTextBlock],
        }),
        defineField({
          name: 'variant',
          title: 'Colour variant',
          type: 'string',
          initialValue: 'secondary',
          options: {
            list: colourOptions,
            layout: 'dropdown',
          },
        }),
      ],
    }),

    defineField({
      name: 'heroImage',
      group: 'content',
      title: 'Hero image',
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
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'body',
      group: 'content',
      title: 'Project content',
      type: 'array',
      description: 'The main case-study content for this project.',
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
                  {
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto'],
                      }),
                  },
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
      title: 'Featured project',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'displayOrder',
      group: 'publishing',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first.',
      validation: (rule) => rule.integer().min(0),
    }),

    defineField({
      name: 'publishedAt',
      group: 'publishing',
      title: 'Published at',
      type: 'datetime',
    }),

    ...taxonomyFields,
  ],

  preview: {
    select: {
      title: 'title',
      studio: 'studio',
      role: 'role',
      media: 'heroImage',
    },

    prepare({title, studio, role, media}) {
      const subtitle = [studio, role].filter(Boolean).join(' · ')

      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
