import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { cn } from 'cn'
import { ArrowLeft, Download, ExternalLink } from 'lucide-react'

import { Container, Display, Section } from '@/components/ds'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { getPayloadClient } from '@/lib/payload'
import { formatPublishDate, labelForResourceType } from '@/lib/resource-format'
import type { Category, Resource } from '@/payload-types'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug: string
  }>
}

async function findResource(slug: string, depth: number): Promise<Resource | undefined> {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'resources',
    depth,
    limit: 1,
    overrideAccess: false,
    where: {
      slug: { equals: slug },
      _status: { equals: 'published' },
    },
  })

  return docs[0]
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const resource = await findResource(slug, 1)

  if (!resource) return { title: 'Resource not found' }

  return {
    title: resource.title,
    description: resource.seoDescription ?? resource.summary,
  }
}

const asCategory = (value: Category | number): Category | null =>
  typeof value === 'object' && value !== null ? value : null

export default async function ResourcePage({ params }: Args) {
  const { slug } = await params
  const resource = await findResource(slug, 2)

  if (!resource) notFound()

  const cover =
    typeof resource.coverImage === 'object' && resource.coverImage !== null
      ? resource.coverImage
      : null
  const coverUrl = cover?.sizes?.feature?.url ?? cover?.url ?? null
  const file =
    typeof resource.file === 'object' && resource.file !== null
      ? resource.file
      : null
  const categories = (resource.categories ?? [])
    .map(asCategory)
    .filter((category): category is Category => category !== null)
  const tags = (resource.tags ?? []).filter((tag) => tag.label)
  const date = formatPublishDate(resource.publishDate)
  const hasAction = Boolean(file?.url || resource.externalUrl)

  return (
    <main className="flex flex-1 flex-col">
      <Section padding="none" tone="light" className="pt-32 pb-12 sm:pt-40">
        <Container size="sm">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 font-heading text-[0.7rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-primary"
          >
            <ArrowLeft aria-hidden className="size-3.5" />
            All resources
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge variant="secondary">
              {labelForResourceType(resource.resourceType)}
            </Badge>
            {date ? (
              <time
                dateTime={resource.publishDate ?? undefined}
                className="text-[0.7rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase"
              >
                {date}
              </time>
            ) : null}
          </div>

          <Display as="h1" size="md" className="mt-5 text-brand-950">
            {resource.title}
          </Display>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {resource.summary}
          </p>

          {categories.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/resources?category=${category.slug}`}
                    className="outline-none focus-visible:underline"
                  >
                    <Badge variant="outline">{category.title}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          {hasAction ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {file?.url ? (
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: 'brand', size: 'cta' }))}
                >
                  <Download aria-hidden />
                  Download
                  {file.filename ? ` ${file.filename.split('.').pop()?.toUpperCase()}` : ''}
                </a>
              ) : null}
              {resource.externalUrl ? (
                <a
                  href={resource.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: 'brand-outline', size: 'cta' }))}
                >
                  <ExternalLink aria-hidden />
                  Read the source
                </a>
              ) : null}
            </div>
          ) : null}
        </Container>
      </Section>

      {coverUrl ? (
        <Section padding="none" tone="light" className="pb-4">
          <Container size="default">
            <div className="relative aspect-[16/9] overflow-hidden bg-lavender">
              <Image
                src={coverUrl}
                alt={cover?.alt ?? ''}
                fill
                priority
                sizes="(min-width: 1024px) 72rem, 100vw"
                className="object-cover"
              />
            </div>
            {cover?.caption ? (
              <p className="mt-3 text-xs text-muted-foreground">{cover.caption}</p>
            ) : null}
          </Container>
        </Section>
      ) : null}

      {resource.body ? (
        <Section tone="light">
          <Container size="sm">
            <div className="rich-text">
              <RichText data={resource.body} />
            </div>

            {tags.length > 0 ? (
              <ul className="mt-12 flex flex-wrap gap-2 border-t border-border pt-6">
                {tags.map((tag) => (
                  <li key={tag.id ?? tag.label}>
                    <Badge variant="ghost">{tag.label}</Badge>
                  </li>
                ))}
              </ul>
            ) : null}
          </Container>
        </Section>
      ) : null}
    </main>
  )
}
