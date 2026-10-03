'use client'

import { useState, useTransition } from 'react'
import { cn } from 'cn'
import { Heart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { toggleLike } from '@/lib/engagement-actions'

/**
 * Optimistic like toggle. Flips immediately, then reconciles with the count
 * the Server Action returns (and rolls back if the request fails).
 */
export function LikeButton({
  resourceId,
  initialCount,
  initialLiked,
}: {
  resourceId: number
  initialCount: number
  initialLiked: boolean
}) {
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [error, setError] = useState<null | string>(null)
  const [pending, startTransition] = useTransition()

  const handleClick = () => {
    setError(null)

    const nextLiked = !liked
    setLiked(nextLiked)
    setCount((current) => Math.max(0, current + (nextLiked ? 1 : -1)))

    startTransition(async () => {
      const result = await toggleLike(resourceId)

      if (!result.ok) {
        // Roll the optimistic update back.
        setLiked(!nextLiked)
        setCount((current) => Math.max(0, current + (nextLiked ? -1 : 1)))
        setError(result.error)
        return
      }

      setLiked(result.liked)
      setCount(result.count)
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant={liked ? 'brand' : 'brand-outline'}
        size="cta"
        onClick={handleClick}
        disabled={pending}
        aria-pressed={liked}
        aria-label={liked ? 'Remove your like' : 'Like this resource'}
      >
        <Heart aria-hidden className={cn(liked && 'fill-current')} />
        {liked ? 'Liked' : 'Like'}
        <span aria-hidden>·</span>
        <span>{count}</span>
      </Button>
      {error ? (
        <span className="text-xs text-destructive" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}
