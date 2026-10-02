import { Suspense } from 'react'
import type { SearchParams } from 'nuqs/server'

import { Container, Section } from '@/components/ds'
import { ResourceCard } from '@/components/resources/resource-card'
import { getLatestResources, getResourceCategories } from '@/lib/resources'

import { InitiativesFilter } from './initiatives-filter'
import { loadInitiativesSearchParams } from './initiatives-search-params'

type InitiativesProps = {
  searchParams: Promise<SearchParams>
}

/**
 * "Initiatives & Campaigns".
 *
 * The latest published resources, filterable by category. Categories are read
 * through the cached data layer in `@/lib/resources`, so the taxonomy is part
 * of the static shell; the grid itself depends on the `?category=` search
 * parameter and streams in behind a Suspense boundary.
 *
 * The filter writes to the URL through nuqs and opts into a server round-trip
 * (`shallow: false`), so the selected category is shareable and the list is
 * always rendered by the server from the cached query.
 */
export default async function Initiatives({ searchParams }: InitiativesProps) {
  const categories = await getResourceCategories()

  return (
    <Section id="initiatives" tone="light" padding="sm">
      <Container size="wide">
        <h2 className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-heading text-display-sm uppercase text-brand-800">
            Initiatives
          </span>
          <span className="font-display text-script-md italic text-foreground">
            &amp; Campaigns
          </span>
        </h2>

        <Suspense fallback={<InitiativesSkeleton />}>
          <InitiativesContent
            categories={categories}
            searchParams={searchParams}
          />
        </Suspense>
      </Container>
    </Section>
  )
}

/** Resolves the active category and streams the matching resources. */
async function InitiativesContent({
  categories,
  searchParams,
}: InitiativesProps & { categories: Awaited<ReturnType<typeof getResourceCategories>> }) {
  const { category } = await loadInitiativesSearchParams(searchParams)
  const resources = await getLatestResources({
    categorySlug: category ?? undefined,
  })

  return (
    <>
      <InitiativesFilter categories={categories} />

      {resources.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <p className="mt-10 border border-dashed border-border bg-muted/40 px-6 py-16 text-center text-sm leading-relaxed text-muted-foreground">
          No published resources in this category yet. Try another category.
        </p>
      )}
    </>
  )
}

/** Static placeholder shown while the filter and grid resolve. */
function InitiativesSkeleton() {
  return (
    <div aria-hidden>
      <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 border-b border-border pb-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className="h-3 w-16 bg-muted" />
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col">
            <div className="aspect-[16/10] bg-muted" />
            <div className="mt-4 h-4 w-3/4 bg-muted" />
            <div className="mt-3 h-3 w-full bg-muted" />
            <div className="mt-2 h-3 w-1/2 bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}
