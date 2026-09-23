import * as React from "react";
import { cn } from "cn";

const tones = {
  light: "bg-background text-foreground",
  surface: "bg-surface text-surface-foreground",
  muted: "bg-muted text-foreground",
  lavender: "bg-lavender text-lavender-foreground",
  brand: "bg-brand-700 text-white",
  night: "bg-night text-night-foreground",
} as const;

const paddings = {
  none: "",
  sm: "py-12 sm:py-16",
  default: "py-20 sm:py-28",
  lg: "py-28 sm:py-40",
} as const;

/**
 * A full-bleed page band. `tone` picks a semantic surface; `padding`
 * controls vertical rhythm. Content is expected to bring its own
 * <Container /> so sections can also render edge-to-edge artwork.
 */
export function Section({
  as: Tag = "section",
  className,
  tone = "light",
  padding = "default",
  ...props
}: React.ComponentProps<"section"> & {
  as?: React.ElementType;
  tone?: keyof typeof tones;
  padding?: keyof typeof paddings;
}) {
  return (
    <Tag
      data-slot="section"
      className={cn("relative w-full", tones[tone], paddings[padding], className)}
      {...props}
    />
  );
}
