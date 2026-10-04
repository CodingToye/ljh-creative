import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Creative Portfolio',

  projectId: 'v3qzp4r8',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('homePage').title('Home Page'),
            S.documentTypeListItem('aboutPage').title('About Page'),
            S.documentTypeListItem('work').title('Work'),
            S.documentTypeListItem('article').title('Articles'),
            S.documentTypeListItem('skill').title('Skills'),
            S.documentTypeListItem('pullQuote').title('Pull Quotes'),
            S.documentTypeListItem('fileAsset').title('Files'),
            S.documentTypeListItem('socialLink').title('Social Links'),

            S.divider(),

            S.listItem()
              .id('taxonomy')
              .title('Taxonomy')
              .child(
                S.list()
                  .title('Taxonomy')
                  .items([
                    S.documentTypeListItem('category').title('Categories'),
                    S.documentTypeListItem('tag').title('Tags'),
                  ]),
              ),
          ]),
    }),

    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
