import * as React from "react";
import { cn } from "cn";

/**
 * Small uppercase, letter-spaced label used above headlines and stats.
 */
export function Eyebrow({
  className,
  rule = false,
  children,
  ...props
}: React.ComponentProps<"p"> & { rule?: boolean }) {
  return (
    <p
      data-slot="eyebrow"
      className={cn(
        "flex items-center gap-3 text-eyebrow uppercase",
        className,
      )}
      {...props}
    >
      {rule ? (
        <span aria-hidden className="h-px w-8 shrink-0 bg-current opacity-40" />
      ) : null}
      <span>{children}</span>
    </p>
  );
}
