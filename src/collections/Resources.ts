import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, publishedOrStaff } from '../access'
import { slugField } from '../fields/slug'
import { resourceTypeOptions } from '../lib/resource-types'

/**
 * The content the client asked for: articles, papers and other resources,
 * categorised and filterable, editable by the team.
 *
 * Drafts are enabled, so the team can prepare a resource and publish it when
 * ready — anonymous visitors only ever see published documents.
 */
export const Resources: CollectionConfig = {
  slug: 'resources',
  labels: {
    singular: 'Resource',
    plural: 'Resources',
  },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'resourceType', 'publishDate', '_status', 'updatedAt'],
    description: 'Articles, papers, guides and other resources shown on /resources.',
  },
  access: {
    create: isAdminOrEditor,
    delete: isAdmin,
    read: publishedOrStaff,
    update: isAdminOrEditor,
  },
  versions: {
    drafts: {
      autosave: false,
    },
    maxPerDoc: 20,
  },
  defaultSort: '-publishDate',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 320,
      admin: {
        description: 'One or two sentences. Used on cards and in search results.',
      },
    },
    {
      name: 'resourceType',
      type: 'select',
      required: true,
      defaultValue: 'article',
      options: [...resourceTypeOptions],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        description: 'Used to filter the resources page.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      labels: {
        singular: 'Tag',
        plural: 'Tags',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'coverImage',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'body',
      type: 'richText',
    },
    {
      name: 'file',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Optional downloadable file, e.g. a PDF of a paper or report.',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: {
        description: 'Optional link to an external article, paper or video.',
      },
    },
    slugField('title'),
    {
      name: 'publishDate',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured resources can be surfaced ahead of the list.',
      },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      maxLength: 160,
      admin: {
        position: 'sidebar',
        description: 'Optional meta description for search and social sharing.',
      },
    },
  ],
}
