import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import type { EngagementCounts } from '@/lib/engagement'
import { formatPublishDate, labelForResourceType } from '@/lib/resource-format'
import type { Category, Resource } from '@/payload-types'

const asCategory = (value: Category | number): Category | null =>
  typeof value === 'object' && value !== null ? value : null

/** A single resource in the public grid. */
export function ResourceCard({
  resource,
  counts,
}: {
  resource: Resource
  counts?: EngagementCounts
}) {
  const cover =
    typeof resource.coverImage === 'object' && resource.coverImage !== null
      ? resource.coverImage
      : null
  const coverUrl = cover?.sizes?.card?.url ?? cover?.url ?? null
  const href = `/resources/${resource.slug}`
  const categories = (resource.categories ?? [])
    .map(asCategory)
    .filter((category): category is Category => category !== null)
  const date = formatPublishDate(resource.publishDate)

  return (
    <article className="group relative flex flex-col overflow-hidden bg-card ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-lavender">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={cover?.alt ?? ''}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-heading text-[0.7rem] tracking-[0.2em] text-brand-700/50 uppercase">
            Purple Project
          </span>
        )}
        <Badge className="absolute top-3 left-3 bg-white text-brand-800 shadow-sm">
          {labelForResourceType(resource.resourceType)}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {categories.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <li key={category.id}>
                <Badge variant="outline">{category.title}</Badge>
              </li>
            ))}
          </ul>
        ) : null}

        <h3 className="font-heading text-lg leading-snug font-bold text-foreground">
          <Link
            href={href}
            className="outline-none after:absolute after:inset-0 focus-visible:underline"
          >
            {resource.title}
          </Link>
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {resource.summary}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-2">
          {date ? (
            <time
              dateTime={resource.publishDate ?? undefined}
              className="text-[0.7rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase"
            >
              {date}
            </time>
          ) : null}

          {counts ? (
            <div className="ml-auto flex items-center gap-3 text-xs font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Heart aria-hidden className="size-3.5" />
                {counts.likes}
                <span className="sr-only">{counts.likes === 1 ? 'like' : 'likes'}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <MessageCircle aria-hidden className="size-3.5" />
                {counts.comments}
                <span className="sr-only">
                  {counts.comments === 1 ? 'comment' : 'comments'}
                </span>
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}
