import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

import {colourOptions} from './colourOptions'

const richTextBlock = defineArrayMember({
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
})

function definePullQuoteField(name: string, title: string) {
  return defineField({
    name,
    title,
    group: 'quotes',
    type: 'object',
    fields: [
      defineField({
        name: 'quote',
        title: 'Quote',
        type: 'reference',
        to: [{type: 'pullQuote'}],
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
        validation: (rule) => rule.required(),
      }),
    ],
  })
}

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  icon: DocumentTextIcon,

  // Tabs in the editor, in the same order as the sections on the page
  groups: [
    {name: 'intro', title: 'Intro', default: true},
    {name: 'leadership', title: 'Craft to leadership'},
    {name: 'career', title: 'Career journey'},
    {name: 'quotes', title: 'Pull quotes'},
    {name: 'howIWork', title: 'How I work'},
    {name: 'beyond', title: 'Beyond the work'},
    {name: 'elsewhere', title: 'Elsewhere'},
    {name: 'articles', title: 'Articles'},
  ],

  fields: [
    defineField({
      name: 'featureImages',
      group: 'intro',
      title: 'Feature images',
      type: 'array',
      description: 'Images displayed as prominent visual features on the home page.',
      of: [
        defineArrayMember({
          type: 'featureImage',
        }),
      ],
    }),
    defineField({
      name: 'intro',
      group: 'intro',
      title: 'Intro content',
      type: 'array',
      of: [richTextBlock],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'cvDownload',
      group: 'intro',
      title: 'CV download button',
      type: 'object',
      description: 'The download button in the intro. Hidden until a file is selected.',
      fields: [
        defineField({
          name: 'label',
          title: 'Button text',
          type: 'string',
          initialValue: 'Download my CV',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'file',
          title: 'File',
          type: 'reference',
          to: [{type: 'fileAsset'}],
        }),
      ],
    }),
    defineField({
      name: 'creativeLeadershipLeft',
      group: 'leadership',
      title: 'Creative leadership – left column',
      type: 'array',
      description: 'Left column under "From craft to creative leadership".',
      of: [richTextBlock],
    }),
    defineField({
      name: 'creativeLeadershipRight',
      group: 'leadership',
      title: 'Creative leadership – right column',
      type: 'array',
      description: 'Right column under "From craft to creative leadership".',
      of: [richTextBlock],
    }),
    defineField({
      name: 'careerJourney',
      group: 'career',
      title: 'Career journey',
      type: 'array',
      description: 'Timeline steps under "My career journey", shown left to right. Up to 5.',
      of: [
        defineArrayMember({
          name: 'careerJourneyStep',
          title: 'Career journey step',
          type: 'object',
          fields: [
            defineField({
              name: 'colour',
              title: 'Timeline colour',
              type: 'string',
              initialValue: 'primary',
              options: {
                list: colourOptions,
                layout: 'dropdown',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                  description: 'Leave blank if the icon is purely decorative.',
                }),
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'subtitle',
              subtitle: 'content',
              media: 'icon',
            },
          },
        }),
      ],
      validation: (rule) => rule.max(5),
    }),
    definePullQuoteField('pullQuoteOne', 'Pull quote – first'),
    defineField({
      name: 'howIWork',
      group: 'howIWork',
      title: 'How I work',
      type: 'array',
      description: 'Boxes under "How I work", shown left to right. Up to 3.',
      of: [
        defineArrayMember({
          name: 'howIWorkItem',
          title: 'How I work item',
          type: 'object',
          fields: [
            defineField({
              name: 'variant',
              title: 'Colour variant',
              type: 'string',
              initialValue: 'primary',
              options: {
                list: colourOptions,
                layout: 'dropdown',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                  description: 'Leave blank if the icon is purely decorative.',
                }),
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'text',
              rows: 2,
              description: 'Press enter to control where the title wraps.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'content',
              media: 'icon',
            },
          },
        }),
      ],
      validation: (rule) => rule.max(3),
    }),
    definePullQuoteField('pullQuoteTwo', 'Pull quote – second'),
    defineField({
      name: 'beyondTheWorkLeft',
      group: 'beyond',
      title: 'Beyond the work – left column',
      type: 'array',
      description: 'Left column under "Beyond the work".',
      of: [richTextBlock],
    }),
    defineField({
      name: 'beyondTheWorkRight',
      group: 'beyond',
      title: 'Beyond the work – right column',
      type: 'array',
      description: 'Right column under "Beyond the work".',
      of: [richTextBlock],
    }),
    defineField({
      name: 'elsewhereLinks',
      group: 'elsewhere',
      title: 'Elsewhere links',
      type: 'array',
      description: 'Links shown under "Elsewhere", chosen from Social Links. Up to 3.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'socialLink'}],
        }),
      ],
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({
      name: 'articles',
      group: 'articles',
      title: 'Ideas and perspectives articles',
      type: 'array',
      description:
        'Articles shown under "Ideas and perspectives". Up to 4. Leave empty to show the 4 most recent.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'article'}],
        }),
      ],
      validation: (rule) => rule.max(4).unique(),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'About page',
      }
    },
  },
})
