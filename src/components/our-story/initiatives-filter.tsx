'use client'

import { useTransition } from 'react'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { useQueryState } from 'nuqs'
import { cn } from 'cn'

import type { Category } from '@/payload-types'

import { initiativesSearchParams } from './initiatives-search-params'

type FilterItem = {
  label: string
  value: null | string
}

/**
 * Category filter for the initiatives grid.
 *
 * State lives in the URL (`?category=<slug>`) via nuqs so it is shareable and
 * server-renderable. `shallow: false` opts into a server round-trip on click,
 * which re-runs the page's Server Components with the new `searchParams`, and
 * `startTransition` keeps the previously rendered grid on screen while the
 * next one streams in.
 *
 * `NuqsAdapter` is mounted here rather than in the root layout on purpose:
 * nuqs reads `useSearchParams()`, which under Cache Components must sit inside
 * a `<Suspense>` boundary. The section wraps this component in one, so the
 * adapter's read is a streamed dynamic hole rather than a blocking parent read.
 */
export function InitiativesFilter({ categories }: { categories: Category[] }) {
  return (
    <NuqsAdapter>
      <InitiativesTabs categories={categories} />
    </NuqsAdapter>
  )
}

function InitiativesTabs({ categories }: { categories: Category[] }) {
  const [isPending, startTransition] = useTransition()
  const [category, setCategory] = useQueryState(
    'category',
    initiativesSearchParams.category.withOptions({
      shallow: false,
      scroll: false,
      startTransition,
    }),
  )

  const items: FilterItem[] = [
    { label: 'View All', value: null },
    ...categories.map((entry) => ({ label: entry.title, value: entry.slug })),
  ]

  return (
    <nav
      aria-label="Filter initiatives by category"
      className="mt-8 border-b border-border"
    >
      <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
        {items.map((item) => {
          const active = (category ?? null) === item.value

          return (
            <li key={item.value ?? 'all'}>
              <button
                type="button"
                onClick={() => setCategory(item.value)}
                aria-current={active ? 'page' : undefined}
                data-pending={isPending ? '' : undefined}
                className={cn(
                  'relative -mb-px pb-3 font-heading text-eyebrow uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50 data-[pending]:opacity-60',
                  active
                    ? 'text-brand-800 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-brand-800'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
