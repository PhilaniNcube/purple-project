import type { CollectionConfig } from 'payload'

import { adminOrSelf, canAccessAdmin, getRoles, isAdmin } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Admin',
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'roles', 'updatedAt'],
  },
  auth: true,
  access: {
    admin: canAccessAdmin,
    create: isAdmin,
    delete: isAdmin,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: {
        description:
          'Admins manage people and settings. Editors can only manage content.',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, originalDoc, req }) => {
        if (!data) return data

        // The very first account, created through Payload's "create first user"
        // screen, is always an admin so somebody can manage the team.
        if (operation === 'create' && !req.user) {
          const { totalDocs } = await req.payload.count({
            collection: 'users',
            req,
          })

          if (totalDocs === 0) {
            data.roles = ['admin']
          }

          return data
        }

        // Only admins may grant or change roles — otherwise an editor could
        // promote themselves while updating their own profile.
        if (!getRoles(req.user).includes('admin')) {
          data.roles = originalDoc?.roles ?? ['editor']
        }

        return data
      },
    ],
  },
}
