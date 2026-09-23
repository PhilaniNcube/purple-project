import * as React from "react";
import { cn } from "cn";

type StatProps = React.ComponentProps<"div"> & {
  value: React.ReactNode;
  label: React.ReactNode;
};

/**
 * Big-number stat used in the "The numbers" band.
 */
export function Stat({ value, label, className, ...props }: StatProps) {
  return (
    <div data-slot="stat" className={cn("flex flex-col gap-3", className)} {...props}>
      <span className="font-heading text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
        {value}
      </span>
      <span className="max-w-[22ch] text-sm leading-relaxed text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
