import * as React from "react";
import { cn } from "cn";

const sizes = {
  sm: "text-script-sm",
  md: "text-script-md",
  lg: "text-script-lg",
  xl: "text-script-xl",
} as const;

type ScriptProps = React.ComponentProps<"span"> & {
  as?: React.ElementType;
  size?: keyof typeof sizes;
};

/**
 * Italic serif accent — the counterweight to <Display />.
 */
export function Script({
  as: Tag = "span",
  size = "md",
  className,
  ...props
}: ScriptProps) {
  return (
    <Tag
      data-slot="script"
      className={cn("font-display italic", sizes[size], className)}
      {...props}
    />
  );
}
