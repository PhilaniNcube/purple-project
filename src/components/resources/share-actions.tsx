'use client'

import { useState } from 'react'
import { Check, Link2, Share2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

/**
 * Share affordances, no account required:
 * - "Share" uses the native Web Share sheet where the browser supports it.
 * - "Copy link" always works, and falls back to a selectable field when the
 *   Clipboard API is unavailable (e.g. an insecure context).
 */
export function ShareActions({ path, title }: { path: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const [manualUrl, setManualUrl] = useState<null | string>(null)

  const absoluteUrl = () =>
    path.startsWith('http') ? path : new URL(path, window.location.origin).toString()

  const copy = async () => {
    const url = absoluteUrl()

    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setManualUrl(null)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setManualUrl(url)
    }
  }

  const share = async () => {
    const url = absoluteUrl()

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // The visitor dismissed the sheet, or sharing failed — fall back.
      }
    }

    await copy()
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button" variant="brand-outline" size="cta" onClick={share}>
        <Share2 aria-hidden />
        Share
      </Button>
      <Button type="button" variant="ghost" size="cta" onClick={copy} aria-live="polite">
        {copied ? <Check aria-hidden /> : <Link2 aria-hidden />}
        {copied ? 'Link copied' : 'Copy link'}
      </Button>
      {manualUrl ? (
        <Input
          readOnly
          value={manualUrl}
          onFocus={(event) => event.currentTarget.select()}
          className="w-full sm:w-64"
          aria-label="Resource link"
        />
      ) : null}
    </div>
  )
}
