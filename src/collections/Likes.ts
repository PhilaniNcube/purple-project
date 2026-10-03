import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor } from '../access'
import { likesTag, relationshipId, revalidatePublicCache } from '../lib/revalidate-cache'

/**
 * Anonymous likes on a resource.
 *
 * There are no public accounts, so a like is keyed to a random visitor id
 * stored in an httpOnly cookie. The compound unique index on
 * `resource + visitorId` means a visitor can only ever hold one like per
 * resource, and the toggle in `@/lib/engagement-actions` flips it on and off.
 */
export const Likes: CollectionConfig = {
  slug: 'likes',
  labels: {
    singular: 'Like',
    plural: 'Likes',
  },
  admin: {
    group: 'Engagement',
    useAsTitle: 'visitorId',
    defaultColumns: ['resource', 'visitorId', 'createdAt'],
    description: 'One like per anonymous visitor, per resource.',
  },
  access: {
    // Likes are only created or removed through the Server Action, which uses
    // `overrideAccess: true`. The public REST/GraphQL surface stays read-only.
    create: () => false,
    delete: isAdmin,
    read: isAdminOrEditor,
    update: () => false,
  },
  indexes: [
    {
      fields: ['resource', 'visitorId'],
      unique: true,
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        const resourceId = relationshipId(doc.resource)
        if (resourceId) return revalidatePublicCache(likesTag(resourceId))
      },
    ],
    afterDelete: [
      ({ doc }) => {
        const resourceId = relationshipId(doc.resource)
        if (resourceId) return revalidatePublicCache(likesTag(resourceId))
      },
    ],
  },
  defaultSort: '-createdAt',
  fields: [
    {
      name: 'resource',
      type: 'relationship',
      relationTo: 'resources',
      required: true,
      index: true,
    },
    {
      name: 'visitorId',
      type: 'text',
      required: true,
      index: true,
      admin: {
        readOnly: true,
        description: 'Anonymous cookie value used to keep likes unique.',
      },
    },
  ],
}
