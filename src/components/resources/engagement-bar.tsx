import Link from 'next/link'
import { cn } from 'cn'
import { MessageCircle } from 'lucide-react'

import { LikeButton } from '@/components/resources/like-button'
import { ShareActions } from '@/components/resources/share-actions'
import { buttonVariants } from '@/components/ui/button'

/**
 * The like / share / comment row that sits under a resource's body. The comment
 * link jumps to the thread, which is rendered separately.
 */
export function EngagementBar({
  resourceId,
  resourceTitle,
  resourcePath,
  likeCount,
  commentCount,
  liked,
}: {
  resourceId: number
  resourceTitle: string
  resourcePath: string
  likeCount: number
  commentCount: number
  liked: boolean
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <LikeButton
        resourceId={resourceId}
        initialCount={likeCount}
        initialLiked={liked}
      />
      <ShareActions title={resourceTitle} path={resourcePath} />
      <Link
        href="#comments"
        className={cn(buttonVariants({ variant: 'ghost', size: 'cta' }))}
      >
        <MessageCircle aria-hidden />
        {commentCount === 1 ? '1 comment' : `${commentCount} comments`}
      </Link>
    </div>
  )
}
