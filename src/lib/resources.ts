import { cacheLife, cacheTag } from 'next/cache'
import type { Where } from 'payload'

import { getPayloadClient } from '@/lib/payload'
import type { Category, Resource } from '@/payload-types'

/**
 * Data-access layer for the public resources surfaces.
 *
 * Every function here is a Cache Function: it declares `'use cache'`, a
 * `cacheLife` profile and a `cacheTag`, so the Payload query runs once and its
 * serialisable result is reused across requests. Request-time values (like the
 * active category slug) are always passed in as arguments — Cache Functions
 * cannot read `searchParams` themselves, and doing so would pull the caller out
 * of the static shell.
 *
 * Tags are the hook for future on-demand invalidation: a Payload `afterChange`
 * hook (or server action) can call `revalidateTag('resources')` /
 * `updateTag('resources')` to drop the entry the moment content changes.
 */

/** How many resources the initiatives grid shows at once. */
export const INITIATIVES_RESOURCE_LIMIT = 6

/**
 * All categories, alphabetically. Cached for hours because the taxonomy
 * changes rarely; served in the static shell so the filter tabs are part of
 * the first paint.
 */
export async function getResourceCategories(): Promise<Category[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('categories')

  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 100,
    overrideAccess: false,
    sort: 'title',
  })

  return docs
}

/**
 * The latest published resources, newest first, optionally narrowed to a
 * single category slug. Cached for minutes so a freshly published resource
 * appears without a redeploy.
 */
export async function getLatestResources({
  categorySlug,
  limit = INITIATIVES_RESOURCE_LIMIT,
}: {
  categorySlug?: string
  limit?: number
} = {}): Promise<Resource[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('resources')

  const payload = await getPayloadClient()

  const where: Where = { _status: { equals: 'published' } }
  if (categorySlug) {
    where['categories.slug'] = { equals: categorySlug }
  }

  const { docs } = await payload.find({
    collection: 'resources',
    depth: 2,
    limit,
    overrideAccess: false,
    sort: '-publishDate',
    where,
  })

  return docs
}
