import {defineArrayMember, defineField, defineType} from 'sanity'
import {BlockquoteIcon} from '@sanity/icons/Blockquote'

export const quoteTextBlock = defineArrayMember({
  type: 'block',
  styles: [{title: 'Normal', value: 'normal'}],
  lists: [],
  marks: {
    decorators: [
      {title: 'Strong', value: 'strong'},
      {title: 'Emphasis', value: 'em'},
    ],
    annotations: [],
  },
})

export const pullQuoteType = defineType({
  name: 'pullQuote',
  title: 'Pull quote',
  type: 'document',
  icon: BlockquoteIcon,

  fields: [
    defineField({
      name: 'pullQuote',
      title: 'Pull quote',
      type: 'array',
      description: 'The short, large quote. Emphasised text is highlighted in the variant colour.',
      of: [quoteTextBlock],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'fullQuote',
      title: 'Full quote',
      type: 'array',
      description: 'The full quote, shown alongside the pull quote.',
      of: [quoteTextBlock],
      validation: (rule) => rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      pullQuote: 'pullQuote',
    },

    prepare({pullQuote}) {
      const text = (pullQuote ?? [])
        .flatMap((block: {children?: {text?: string}[]}) => block.children ?? [])
        .map((child: {text?: string}) => child.text ?? '')
        .join('')

      return {
        title: text || 'Untitled pull quote',
      }
    },
  },
})
