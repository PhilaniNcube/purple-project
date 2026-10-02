import { createLoader, parseAsString } from 'nuqs/server'

/**
 * The URL contract for the initiatives filter.
 *
 * Declared once so the server loader and the client `<InitiativesFilter />`
 * parse the same keys the same way. `category` is the category slug; absent or
 * blank means "View All".
 */
export const initiativesSearchParams = {
  category: parseAsString,
}

/** Server-side parser used by the Our Story page and the initiatives section. */
export const loadInitiativesSearchParams = createLoader(initiativesSearchParams)
