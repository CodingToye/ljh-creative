import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'

export const fileAssetType = defineType({
  name: 'fileAsset',
  title: 'File',
  type: 'document',
  icon: DocumentIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Used to find this file when attaching it elsewhere, e.g. "CV 2026".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      description: 'The downloaded file keeps the name it was uploaded with.',
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'file.asset.originalFilename',
    },
  },
})
