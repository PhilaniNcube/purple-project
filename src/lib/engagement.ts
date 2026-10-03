import { cacheLife, cacheTag } from 'next/cache'
import { cookies } from 'next/headers'

import { getPayloadClient } from '@/lib/payload'
import { commentsTag, likesTag, relationshipId } from '@/lib/revalidate-cache'
import type { Comment } from '@/payload-types'

/**
 * Public engagement data for the resources pages.
 *
 * Approved comments and the like/comment counts are Cache Functions tagged per
 * resource. The Comments and Likes collection hooks drop those tags when a
 * document changes, so an approved comment or a new like shows up on the next
 * request rather than waiting out the `cacheLife` window.
 *
 * Per-visitor state (has this browser already liked?) is *not* cacheable and
 * lives in the uncached `hasVisitorLiked` helper.
 */

/** The cookie holding a visitor's anonymous id. */
export const VISITOR_COOKIE = 'pp_visitor'

/** How many approved comments a resource page renders. */
export const APPROVED_COMMENT_LIMIT = 100

/**
 * The anonymous visitor id from the request cookie, if this browser has one.
 * Reading cookies is request-time work, so this stays outside `'use cache'`.
 */
export async function readVisitorId(): Promise<string | undefined> {
  const store = await cookies()
  return store.get(VISITOR_COOKIE)?.value
}

/** Whether the given visitor has liked this resource. Uncached by design. */
export async function hasVisitorLiked(
  resourceId: number,
  visitorId?: string,
): Promise<boolean> {
  if (!visitorId) return false

  const payload = await getPayloadClient()

  const { totalDocs } = await payload.count({
    collection: 'likes',
    where: {
      resource: { equals: resourceId },
      visitorId: { equals: visitorId },
    },
    overrideAccess: true,
  })

  return totalDocs > 0
}

/** Approved comments for a resource, oldest first. */
export async function getApprovedComments(resourceId: number): Promise<Comment[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag(commentsTag(resourceId))

  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'comments',
    where: {
      resource: { equals: resourceId },
      status: { equals: 'approved' },
    },
    sort: 'createdAt',
    depth: 0,
    limit: APPROVED_COMMENT_LIMIT,
    overrideAccess: false,
  })

  return docs
}

/** Like and approved-comment totals for a resource. */
export async function getEngagementCounts(
  resourceId: number,
): Promise<{ comments: number; likes: number }> {
  'use cache'
  cacheLife('minutes')
  cacheTag(likesTag(resourceId), commentsTag(resourceId))

  const payload = await getPayloadClient()

  const [likes, comments] = await Promise.all([
    payload.count({
      collection: 'likes',
      where: { resource: { equals: resourceId } },
      // Likes are not publicly readable; this aggregate is computed server-side
      // so only the total is ever returned to the page.
      overrideAccess: true,
    }),
    payload.count({
      collection: 'comments',
      where: {
        resource: { equals: resourceId },
        status: { equals: 'approved' },
      },
      overrideAccess: false,
    }),
  ])

  return { comments: comments.totalDocs, likes: likes.totalDocs }
}

export type EngagementCounts = { comments: number; likes: number }

/**
 * Like and approved-comment totals for many resources at once, keyed by
 * resource id. Used by the listing grid so it can show counts without a query
 * per card. Tagged with every resource's tags, so a like or an approval
 * invalidates the batch.
 */
export async function getEngagementCountsForResources(
  resourceIds: number[],
): Promise<Record<number, EngagementCounts>> {
  'use cache'
  cacheLife('minutes')

  const counts: Record<number, EngagementCounts> = {}
  for (const resourceId of resourceIds) {
    counts[resourceId] = { comments: 0, likes: 0 }
  }

  if (resourceIds.length === 0) return counts

  cacheTag(...resourceIds.map(likesTag), ...resourceIds.map(commentsTag))

  const payload = await getPayloadClient()

  const [likes, comments] = await Promise.all([
    payload.find({
      collection: 'likes',
      where: { resource: { in: resourceIds } },
      depth: 0,
      limit: 0,
      pagination: false,
      overrideAccess: true,
    }),
    payload.find({
      collection: 'comments',
      where: {
        resource: { in: resourceIds },
        status: { equals: 'approved' },
      },
      depth: 0,
      limit: 0,
      pagination: false,
      overrideAccess: false,
    }),
  ])

  for (const like of likes.docs) {
    const id = relationshipId(like.resource)
    if (typeof id === 'number' && counts[id]) counts[id].likes += 1
  }

  for (const comment of comments.docs) {
    const id = relationshipId(comment.resource)
    if (typeof id === 'number' && counts[id]) counts[id].comments += 1
  }

  return counts
}
