import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons/Link'

export const socialLinkType = defineType({
  name: 'socialLink',
  title: 'Social link',
  type: 'document',
  icon: LinkIcon,

  fields: [
    defineField({
      name: 'label',
      title: 'Link text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link type',
      type: 'string',
      initialValue: 'url',
      options: {
        list: [
          {title: 'Web link', value: 'url'},
          {title: 'File download', value: 'file'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'url',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https', 'mailto']}).custom((value, {parent}) => {
          const linkType = (parent as {linkType?: string} | undefined)?.linkType

          return linkType === 'url' && !value ? 'A URL is required for a web link.' : true
        }),
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'reference',
      to: [{type: 'fileAsset'}],
      description: 'Choose a file from the Files section.',
      hidden: ({parent}) => parent?.linkType !== 'file',
      validation: (rule) =>
        rule.custom((value, {parent}) => {
          const linkType = (parent as {linkType?: string} | undefined)?.linkType

          return linkType === 'file' && !value ? 'A file is required for a file download.' : true
        }),
    }),
  ],

  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      url: 'url',
      fileTitle: 'file.title',
      media: 'icon',
    },

    prepare({title, linkType, url, fileTitle, media}) {
      return {
        title,
        subtitle: linkType === 'file' ? `File: ${fileTitle ?? '—'}` : url,
        media,
      }
    },
  },
})
