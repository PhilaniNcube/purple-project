import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
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
    <Card className="group relative aspect-5/4 gap-0 overflow-hidden bg-brand-950 py-0 text-white ring-1 ring-foreground/10 transition-all duration-300 hover:shadow-lg">
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={cover?.alt ?? ''}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 "
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center bg-brand-gradient font-heading text-[0.7rem] tracking-[0.2em] text-white/50 uppercase">
          Purple Project
        </span>
      )}

      {/* Darken the lower half of the image so the overlaid copy stays legible. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black via-black/45 to-transparent"
      />

      <Badge className="absolute top-3 left-3 z-10 bg-brand-600 text-white shadow-sm">
        {labelForResourceType(resource.resourceType)}
      </Badge>

      <CardContent className="z-10 mt-auto flex flex-col gap-3 p-5">
        {categories.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <li key={category.id}>
                <Badge className="bg-brand-600 text-white">{category.title}</Badge>
              </li>
            ))}
          </ul>
        ) : null}

        <CardTitle
          role="heading"
          aria-level={3}
          className="font-heading text-lg leading-snug font-bold text-white"
        >
          <Link
            href={href}
            className="outline-none after:absolute after:inset-0 focus-visible:underline"
          >
            {resource.title}
          </Link>
        </CardTitle>

        <CardDescription className="line-clamp-2 text-sm leading-relaxed text-white/80">
          {resource.summary}
        </CardDescription>

        <CardFooter className="mt-1 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-0 bg-transparent p-0">
          {date ? (
            <time
              dateTime={resource.publishDate ?? undefined}
              className="text-[0.7rem] font-semibold tracking-[0.18em] text-white/70 uppercase"
            >
              {date}
            </time>
          ) : null}

          {counts ? (
            <div className="ml-auto flex items-center gap-3 text-xs font-medium text-white/70">
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
        </CardFooter>
      </CardContent>
    </Card>
  )
}
