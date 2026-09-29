import type { CollectionConfig } from 'payload'

import { anyone, isAdmin, isAdminOrEditor } from '../access'
import { slugField } from '../fields/slug'

/** Categories used to filter the public resources page. */
export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Topics used to categorise and filter resources.',
  },
  access: {
    create: isAdminOrEditor,
    delete: isAdmin,
    read: anyone,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
    },
    slugField('title'),
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description:
          'Optional. Shown beside the heading when this category is the active filter.',
      },
    },
  ],
}
