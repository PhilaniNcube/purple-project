import * as React from "react";
import { cn } from "cn";

const sizes = {
  sm: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
} as const;

/**
 * Horizontal rhythm for the whole site. Keeps gutters and max-widths
 * consistent so sections can be composed without re-deciding layout.
 */
export function Container({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: keyof typeof sizes }) {
  return (
    <div
      data-slot="container"
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
