/**
 * Shared shape for the public comment form's `useActionState`.
 *
 * Kept out of the `'use server'` action file because that boundary only allows
 * async function exports, and the client component needs the initial state.
 */
export type CommentFormState = {
  status: 'error' | 'idle' | 'success'
  message?: string
  errors?: Partial<Record<'authorEmail' | 'authorName' | 'body', string>>
}

export const initialCommentFormState: CommentFormState = { status: 'idle' }
