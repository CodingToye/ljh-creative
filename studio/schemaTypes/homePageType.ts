import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: HomeIcon,

  fields: [
    defineField({
      name: 'featureImages',
      title: 'Feature images',
      type: 'array',
      description: 'Images displayed as prominent visual features on the home page.',
      of: [
        defineArrayMember({
          type: 'featureImage',
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Home page',
      }
    },
  },
})
