import * as React from "react";
import { cn } from "cn";

/**
 * Placeholder butterfly mark.
 *
 * NOTE: This is an approximation of the Project Purple logo — replace the
 * paths with the official SVG exported from Figma when it is available.
 */
export function ButterflyMark({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-6", className)}
      {...props}
    >
      <ellipse cx="10.5" cy="12.5" rx="7" ry="8" transform="rotate(-22 10.5 12.5)" />
      <ellipse cx="21.5" cy="12.5" rx="7" ry="8" transform="rotate(22 21.5 12.5)" />
      <ellipse cx="12.5" cy="24" rx="4.5" ry="5.5" transform="rotate(-16 12.5 24)" />
      <ellipse cx="19.5" cy="24" rx="4.5" ry="5.5" transform="rotate(16 19.5 24)" />
      <rect x="15.1" y="5" width="1.8" height="23" rx="0.9" />
    </svg>
  );
}

type LogoProps = React.ComponentProps<"span"> & {
  markClassName?: string;
  showWordmark?: boolean;
};

export function Logo({
  className,
  markClassName,
  showWordmark = true,
  ...props
}: LogoProps) {
  return (
    <span
      data-slot="logo"
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    >
      <ButterflyMark className={cn("size-6 text-brand-600", markClassName)} />
      {showWordmark ? (
        <span className="font-heading text-[0.8rem] leading-none font-extrabold tracking-[0.18em] uppercase">
          Project <span className="font-medium">Purple</span>
        </span>
      ) : null}
    </span>
  );
}
