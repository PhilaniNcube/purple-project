'use server'

import { cookies } from 'next/headers'

import { VISITOR_COOKIE } from '@/lib/engagement'
import type { CommentFormState } from '@/lib/comment-form'
import { getPayloadClient } from '@/lib/payload'

const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // one year

const isPublishedResource = async (resourceId: number): Promise<boolean> => {
  const payload = await getPayloadClient()

  const { totalDocs } = await payload.count({
    collection: 'resources',
    where: {
      id: { equals: resourceId },
      _status: { equals: 'published' },
    },
    overrideAccess: false,
  })

  return totalDocs > 0
}

/**
 * The anonymous visitor id, created on first use. Server Actions are the one
 * request context where cookies can be written, so the id is minted lazily the
 * first time somebody likes a resource.
 */
const ensureVisitorId = async (): Promise<string> => {
  const store = await cookies()
  const existing = store.get(VISITOR_COOKIE)?.value
  if (existing) return existing

  const visitorId = crypto.randomUUID()
  store.set(VISITOR_COOKIE, visitorId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: VISITOR_COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === 'production',
  })

  return visitorId
}

export type ToggleLikeResult =
  | { count: number; liked: boolean; ok: true }
  | { error: string; ok: false }

/** Toggles this visitor's like on a resource and returns the fresh total. */
export async function toggleLike(resourceId: number): Promise<ToggleLikeResult> {
  if (!Number.isInteger(resourceId) || resourceId <= 0) {
    return { ok: false, error: 'Invalid resource.' }
  }

  if (!(await isPublishedResource(resourceId))) {
    return { ok: false, error: 'Resource not found.' }
  }

  const payload = await getPayloadClient()
  const visitorId = await ensureVisitorId()

  const { docs } = await payload.find({
    collection: 'likes',
    where: {
      resource: { equals: resourceId },
      visitorId: { equals: visitorId },
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  let liked: boolean
  const existing = docs[0]

  if (existing) {
    await payload.delete({ collection: 'likes', id: existing.id, overrideAccess: true })
    liked = false
  } else {
    try {
      await payload.create({
        collection: 'likes',
        data: { resource: resourceId, visitorId },
        overrideAccess: true,
      })
      liked = true
    } catch {
      // A concurrent request may have created the like first; the unique index
      // rejects the duplicate, which still means this visitor has liked it.
      liked = true
    }
  }

  const { totalDocs } = await payload.count({
    collection: 'likes',
    where: { resource: { equals: resourceId } },
    overrideAccess: true,
  })

  return { ok: true, liked, count: totalDocs }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Accepts a public comment. Nothing is published here: the comment is written
 * with `status: 'pending'` and only appears once the team approves it.
 */
export async function submitComment(
  _previous: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const resourceId = Number(formData.get('resourceId'))
  const authorName = String(formData.get('authorName') ?? '').trim()
  const authorEmail = String(formData.get('authorEmail') ?? '').trim()
  const body = String(formData.get('body') ?? '').trim()
  const honeypot = String(formData.get('company') ?? '').trim()

  // Bots fill the hidden "company" field. Accept silently so they move on.
  if (honeypot) {
    return { status: 'success', message: 'Thanks — your comment is awaiting review.' }
  }

  const errors: NonNullable<CommentFormState['errors']> = {}
  if (authorName.length < 2) errors.authorName = 'Please add your name.'
  else if (authorName.length > 80) errors.authorName = 'That name is too long.'
  if (authorEmail && !EMAIL_PATTERN.test(authorEmail)) {
    errors.authorEmail = 'That email address does not look right.'
  }
  if (body.length < 2) errors.body = 'Please write a comment.'
  else if (body.length > 2000) errors.body = 'Comments are limited to 2000 characters.'

  if (!Number.isInteger(resourceId) || resourceId <= 0) {
    return { status: 'error', message: 'Something went wrong. Please reload and try again.' }
  }

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors }
  }

  if (!(await isPublishedResource(resourceId))) {
    return { status: 'error', message: 'That resource is not available.' }
  }

  const payload = await getPayloadClient()

  try {
    await payload.create({
      collection: 'comments',
      data: {
        resource: resourceId,
        authorName,
        authorEmail: authorEmail || undefined,
        body,
        status: 'pending',
      },
      overrideAccess: true,
    })
  } catch {
    return { status: 'error', message: 'We could not save your comment. Please try again.' }
  }

  return { status: 'success', message: 'Thanks — your comment is awaiting review.' }
}
