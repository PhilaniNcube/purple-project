import * as React from "react";
import { cn } from "cn";

type QuoteProps = React.ComponentProps<"blockquote">;

/**
 * Centred pull-quote with the oversized serif quotation glyph.
 */
export function Quote({ className, children, ...props }: QuoteProps) {
  return (
    <blockquote
      data-slot="quote"
      className={cn("flex flex-col items-center text-center", className)}
      {...props}
    >
      <span
        aria-hidden
        className="font-display text-7xl leading-[0.4] text-primary select-none"
      >
        &ldquo;
      </span>
      <p className="mt-6 max-w-3xl text-balance text-lg leading-snug font-medium sm:text-2xl">
        {children}
      </p>
    </blockquote>
  );
}
