import {defineArrayMember, defineField} from 'sanity'

export const taxonomyFields = [
  defineField({
    name: 'category',
    group: 'taxonomy',
    title: 'Primary category',
    type: 'reference',
    description: 'Select the main category for this content.',
    to: [{type: 'category'}],
    validation: (rule) => rule.required(),
  }),

  defineField({
    name: 'tags',
    group: 'taxonomy',
    title: 'Tags',
    type: 'array',
    description: 'Tags may be selected from any of the five category groups.',
    of: [
      defineArrayMember({
        type: 'reference',
        to: [{type: 'tag'}],
      }),
    ],
    validation: (rule) => rule.unique().error('The same tag cannot be selected twice.'),
  }),
]
