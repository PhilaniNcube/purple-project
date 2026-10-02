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
