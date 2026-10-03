import type { CollectionConfig } from 'payload'

import { getRoles, isAdmin, isAdminOrEditor } from '../access'
import {
  commentsTag,
  relationshipId,
  revalidatePublicCache,
} from '../lib/revalidate-cache'

/**
 * Reader comments on a single resource.
 *
 * Visitors do not need an account: the public form posts to a Server Action
 * (`@/lib/engagement-actions`) which writes through the Local API. Every
 * comment starts as `pending`, so nothing reaches the public site until a
 * member of the team approves it in the admin panel.
 */
export const Comments: CollectionConfig = {
  slug: 'comments',
  labels: {
    singular: 'Comment',
    plural: 'Comments',
  },
  admin: {
    group: 'Engagement',
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'resource', 'status', 'createdAt'],
    description:
      'Reader comments held for moderation. Approve a comment to publish it on the resource page.',
  },
  access: {
    // Public submissions arrive through a Server Action that writes with
    // `overrideAccess: true`. Closing the REST/GraphQL surface here keeps the
    // collection from being written to directly.
    create: () => false,
    delete: isAdmin,
    read: ({ req }) => {
      const roles = getRoles(req.user)
      if (roles.includes('admin') || roles.includes('editor')) return true

      // Anonymous visitors only ever see comments the team has approved.
      return { status: { equals: 'approved' } }
    },
    update: isAdminOrEditor,
  },
  hooks: {
    afterChange: [
      ({ doc, operation, previousDoc }) => {
        // Pending comments are invisible publicly, so skip the cache churn
        // unless this write publishes (or un-publishes) a comment.
        const isVisible = doc.status === 'approved'
        const wasVisible = operation === 'update' && previousDoc?.status === 'approved'
        if (!isVisible && !wasVisible) return

        const resourceId = relationshipId(doc.resource)
        if (resourceId) return revalidatePublicCache(commentsTag(resourceId))
      },
    ],
    afterDelete: [
      ({ doc }) => {
        const resourceId = relationshipId(doc.resource)
        if (resourceId) return revalidatePublicCache(commentsTag(resourceId))
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
      name: 'authorName',
      type: 'text',
      required: true,
      maxLength: 80,
    },
    {
      name: 'authorEmail',
      type: 'email',
      admin: {
        description:
          'Optional. Never shown publicly — kept only so the team can follow up.',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      maxLength: 2000,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending review', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Spam', value: 'spam' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Only approved comments are shown on the public site.',
      },
    },
  ],
}
