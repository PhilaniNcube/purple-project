/**
 * Invalidate Next.js cache tags from a Payload collection hook.
 *
 * The public data layer in `@/lib/resources` tags its Cache Functions with
 * `'resources'` and `'categories'`. The hooks below call this after a write so
 * the next request reflects the change instead of waiting out the `cacheLife`
 * window.
 *
 * Two deliberate constraints:
 *
 * - `next/cache` is imported dynamically, so the collection config can still be
 *   loaded by tools that never run inside Next (the `payload` CLI, seed
 *   scripts, migrations). A top-level import would pull Next's server runtime
 *   into those processes.
 * - `revalidateTag` only works inside a Next.js request (Server Function or
 *   Route Handler). The admin writes do come through one, but the Local API
 *   does not, so a missing request context is swallowed rather than crashing a
 *   write.
 *
 * `{ expire: 0 }` means stale content is never served: the next request waits
 * for fresh data. That is the "editor saves, then sees their change" behaviour.
 * `updateTag` would be the API for that, but it is only callable from a Server
 * Action, which a Payload hook is not.
 */
export async function revalidatePublicCache(...tags: string[]): Promise<void> {
  try {
    const { revalidateTag } = await import('next/cache')

    for (const tag of tags) {
      revalidateTag(tag, { expire: 0 })
    }
  } catch {
    // No Next.js cache to revalidate (e.g. CLI or seed context).
  }
}

/**
 * Cache tags owned by the public engagement data layer (`@/lib/engagement`)
 * and dropped by the Comments/Likes collection hooks when a document changes.
 *
 * These are plain string builders with no Next.js imports, so a collection
 * config can use them without pulling the framework runtime into the CLI.
 */
export const likesTag = (resourceId: number | string): string => `likes:${resourceId}`

export const commentsTag = (resourceId: number | string): string => `comments:${resourceId}`

/**
 * Reads the id off a relationship value that may be a bare id or a populated
 * document, so a hook can build a per-resource cache tag either way.
 */
export const relationshipId = (value: unknown): number | string | undefined => {
  if (typeof value === 'number' || typeof value === 'string') return value

  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: unknown }).id
    if (typeof id === 'number' || typeof id === 'string') return id
  }

  return undefined
}
