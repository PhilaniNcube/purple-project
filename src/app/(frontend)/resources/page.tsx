import type { Metadata } from 'next'
import Link from 'next/link'
import type { Where } from 'payload'
import { cn } from 'cn'

import { Container, Display, Eyebrow, Section } from '@/components/ds'
import { ResourceCard } from '@/components/resources/resource-card'
import { getEngagementCountsForResources } from '@/lib/engagement'
import { getPayloadClient } from '@/lib/payload'
import { resourceTypeOptions, type ResourceType } from '@/lib/resource-types'

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Articles, papers, guides and reports on gynaecological cancer — curated by the Purple Project team.',
}

type Args = {
  searchParams: Promise<{
    category?: string
    type?: string
  }>
}

/** Builds a /resources URL, omitting blank filters. */
function resourcesHref({
  category,
  type,
}: {
  category?: null | string
  type?: null | string
}): string {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (type) params.set('type', type)
  const query = params.toString()
  return query ? `/resources?${query}` : '/resources'
}

function FilterChip({
  active,
  children,
  href,
}: {
  active: boolean
  children: React.ReactNode
  href: string
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex items-center rounded-none border px-3 py-1.5 font-heading text-[0.7rem] font-semibold tracking-[0.14em] uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
      )}
    >
      {children}
    </Link>
  )
}

export default async function ResourcesPage({ searchParams }: Args) {
  const { category: categoryParam, type: typeParam } = await searchParams

  const activeCategorySlug =
    typeof categoryParam === 'string' && categoryParam.length > 0
      ? categoryParam
      : undefined
  const activeType: ResourceType | undefined = resourceTypeOptions.find(
    (option) => option.value === typeParam,
  )?.value

  const payload = await getPayloadClient()

  const categories = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 100,
    overrideAccess: false,
    sort: 'title',
  })

  const activeCategory = activeCategorySlug
    ? categories.docs.find((category) => category.slug === activeCategorySlug)
    : undefined

  const where: Where = { _status: { equals: 'published' } }
  if (activeCategory) {
    where.categories = { in: [activeCategory.id] }
  }
  if (activeType) {
    where.resourceType = { equals: activeType }
  }
  // A category was requested that no longer exists — return nothing rather
  // than silently showing every resource.
  if (activeCategorySlug && !activeCategory) {
    where.id = { equals: -1 }
  }

  const resources = await payload.find({
    collection: 'resources',
    depth: 2,
    limit: 60,
    overrideAccess: false,
    sort: '-featured,-publishDate',
    where,
  })

  const counts = await getEngagementCountsForResources(
    resources.docs.map((resource) => resource.id),
  )

  const hasFilters = Boolean(activeCategorySlug || activeType)

  return (
    <main className="flex flex-1 flex-col">
      {/* Header */}
      <Section padding="none" tone="light" className="pt-32 pb-12 sm:pt-40">
        <Container size="wide">
          <Eyebrow className="text-primary" rule>
            Resources
          </Eyebrow>
          <h1 className="mt-5 flex flex-col items-start">
            <Display as="span" size="md" className="text-brand-950">
              Share the knowledge
            </Display>
            <span className="text-brand-700 font-display italic">
              protect women.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {activeCategory?.description ??
              'Browse articles, papers, guides and reports on gynaecological cancer, curated for patients, supporters and healthcare partners.'}
          </p>
        </Container>
      </Section>

      {/* Filters */}
      <Section padding="none" tone="muted" className="border-y border-border py-5">
        <Container size="wide" className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-heading text-[0.7rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
              Category
            </span>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                active={!activeCategorySlug}
                href={resourcesHref({ type: activeType })}
              >
                All
              </FilterChip>
              {categories.docs.map((category) => (
                <FilterChip
                  key={category.id}
                  active={category.slug === activeCategorySlug}
                  href={resourcesHref({ category: category.slug, type: activeType })}
                >
                  {category.title}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-heading text-[0.7rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
              Type
            </span>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                active={!activeType}
                href={resourcesHref({ category: activeCategorySlug })}
              >
                All
              </FilterChip>
              {resourceTypeOptions.map((option) => (
                <FilterChip
                  key={option.value}
                  active={option.value === activeType}
                  href={resourcesHref({
                    category: activeCategorySlug,
                    type: option.value,
                  })}
                >
                  {option.label}
                </FilterChip>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Results */}
      <Section tone="light">
        <Container size="wide">
          <p className="mb-8 text-sm text-muted-foreground">
            {resources.totalDocs}{' '}
            {resources.totalDocs === 1 ? 'resource' : 'resources'}
            {hasFilters ? ' match your filters' : ''}.
          </p>

          {resources.docs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resources.docs.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  counts={counts[resource.id]}
                />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border bg-muted/40 px-6 py-20 text-center">
              <p className="font-heading text-lg font-bold text-foreground">
                Nothing here yet
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                No published resources match these filters. Try a different
                category or type.
              </p>
              {hasFilters ? (
                <Link
                  href="/resources"
                  className="mt-6 inline-flex items-center rounded-none border border-primary/35 px-4 py-2 font-heading text-[0.7rem] font-semibold tracking-[0.14em] text-primary uppercase transition-colors hover:bg-primary/5"
                >
                  Clear filters
                </Link>
              ) : null}
            </div>
          )}
        </Container>
      </Section>
    </main>
  )
}
