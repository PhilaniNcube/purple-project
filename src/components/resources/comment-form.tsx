'use client'

import { useActionState, useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { initialCommentFormState } from '@/lib/comment-form'
import { submitComment } from '@/lib/engagement-actions'

/**
 * Public comment form. No account needed; every submission is queued for
 * moderation, which the confirmation message makes clear.
 */
export function CommentForm({ resourceId }: { resourceId: number }) {
  const [state, formAction, pending] = useActionState(submitComment, initialCommentFormState)
  const formRef = useRef<HTMLFormElement>(null)

  // Clear the fields once a comment is accepted.
  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset()
  }, [state])

  const errorFor = (field: 'authorEmail' | 'authorName' | 'body') => state.errors?.[field]

  return (
    <form ref={formRef} action={formAction} className="mt-8 grid gap-5">
      <input type="hidden" name="resourceId" value={resourceId} />

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="authorName">Name</Label>
          <Input
            id="authorName"
            name="authorName"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errorFor('authorName'))}
            aria-describedby={errorFor('authorName') ? 'authorName-error' : undefined}
          />
          {errorFor('authorName') ? (
            <p id="authorName-error" className="text-xs text-destructive">
              {errorFor('authorName')}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="authorEmail">
            Email <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="authorEmail"
            name="authorEmail"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errorFor('authorEmail'))}
            aria-describedby={errorFor('authorEmail') ? 'authorEmail-error' : undefined}
          />
          {errorFor('authorEmail') ? (
            <p id="authorEmail-error" className="text-xs text-destructive">
              {errorFor('authorEmail')}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="body">Comment</Label>
        <Textarea
          id="body"
          name="body"
          required
          rows={5}
          maxLength={2000}
          placeholder="Share your thoughts…"
          aria-invalid={Boolean(errorFor('body'))}
          aria-describedby={errorFor('body') ? 'body-error' : undefined}
        />
        {errorFor('body') ? (
          <p id="body-error" className="text-xs text-destructive">
            {errorFor('body')}
          </p>
        ) : null}
      </div>

      <p className="text-xs text-muted-foreground">
        Your email is never published, and comments are reviewed before they appear.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="brand" size="cta" disabled={pending}>
          {pending ? 'Sending…' : 'Post comment'}
        </Button>
        {state.status === 'success' ? (
          <p role="status" className="text-sm text-brand-700">
            {state.message}
          </p>
        ) : null}
        {state.status === 'error' && state.message ? (
          <p role="alert" className="text-sm text-destructive">
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  )
}
