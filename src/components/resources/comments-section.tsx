import { MessageCircle } from 'lucide-react'

import { CommentForm } from '@/components/resources/comment-form'
import { getApprovedComments } from '@/lib/engagement'
import { formatPublishDate } from '@/lib/resource-format'

/**
 * The public comments thread for a resource: the approved comments, then the
 * form. New comments do not appear here until a moderator approves them.
 */
export async function CommentsSection({ resourceId }: { resourceId: number }) {
  const comments = await getApprovedComments(resourceId)

  return (
    <div id="comments" className="scroll-mt-28">
      <div className="flex items-center gap-3">
        <MessageCircle aria-hidden className="size-5 text-brand-700" />
        <h2 className="font-heading text-xl font-bold tracking-tight text-foreground uppercase">
          Comments
        </h2>
        <span className="text-sm text-muted-foreground">
          {comments.length === 1 ? '1 comment' : `${comments.length} comments`}
        </span>
      </div>

      <CommentForm resourceId={resourceId} />

      {comments.length > 0 ? (
        <ul className="mt-12 space-y-8">
          {comments.map((comment) => (
            <li key={comment.id} className="border-t border-border pt-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-heading text-sm font-bold tracking-wide text-foreground uppercase">
                  {comment.authorName}
                </p>
                <time
                  dateTime={comment.createdAt}
                  className="text-[0.7rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase"
                >
                  {formatPublishDate(comment.createdAt)}
                </time>
              </div>
              <p className="mt-3 leading-relaxed whitespace-pre-line text-muted-foreground">
                {comment.body}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
          No comments yet — be the first to share your thoughts.
        </p>
      )}
    </div>
  )
}
