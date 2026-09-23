import * as React from "react";
import { cn } from "cn";

const sizes = {
  xs: "text-display-xs",
  sm: "text-display-sm",
  md: "text-display-md",
  lg: "text-display-lg",
  xl: "text-display-xl",
} as const;

type DisplayProps = React.ComponentProps<"h2"> & {
  as?: React.ElementType;
  size?: keyof typeof sizes;
  /** Render as stroke-only type (the outlined headlines in the prototype). */
  outline?: boolean;
};

/**
 * The heavy uppercase headline. Pair with <Script /> for the
 * "solid + italic serif" lockup seen throughout the prototype.
 */
export function Display({
  as: Tag = "h2",
  size = "md",
  outline = false,
  className,
  ...props
}: DisplayProps) {
  return (
    <Tag
      data-slot="display"
      className={cn(
        "font-heading uppercase",
        sizes[size],
        outline && "text-outline",
        className,
      )}
      {...props}
    />
  );
}
