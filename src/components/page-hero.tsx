import * as React from "react";
import { cn } from "cn";

import { Container, Display, Eyebrow, Script, Section } from "@/components/ds";

const tones = {
  light: {
    eyebrow: "text-primary",
    title: "text-brand-950",
    accent: "text-brand-700",
    description: "text-muted-foreground",
  },
  lavender: {
    eyebrow: "text-brand-700",
    title: "text-brand-950",
    accent: "text-brand-700",
    description: "text-brand-900/75",
  },
  muted: {
    eyebrow: "text-primary",
    title: "text-brand-950",
    accent: "text-brand-700",
    description: "text-muted-foreground",
  },
  brand: {
    eyebrow: "text-white/80",
    title: "text-white",
    accent: "text-brand-200",
    description: "text-white/80",
  },
  night: {
    eyebrow: "text-white/70",
    title: "text-white",
    accent: "text-brand-300",
    description: "text-white/75",
  },
} as const;

type PageHeroProps = {
  eyebrow: string;
  title: string;
  /** The short italic serif counterweight to the display line. */
  accent?: string;
  description?: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
  children?: React.ReactNode;
};

/**
 * The opening band for interior pages.
 *
 * Keeps every new route in the same rhythm as Resources and Our Story: an
 * eyebrow, the brand's two-voice headline lockup and a single measure of
 * supporting copy beneath, all clearing the fixed navigation.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  tone = "lavender",
  className,
  children,
}: PageHeroProps) {
  const palette = tones[tone];

  return (
    <Section
      tone={tone}
      padding="none"
      className={cn("pt-32 pb-16 sm:pt-40 sm:pb-20", className)}
    >
      <Container size="wide">
        <Eyebrow rule className={palette.eyebrow}>
          {eyebrow}
        </Eyebrow>

        <h1 className="mt-5 flex flex-col items-start">
          <Display as="span" size="md" className={palette.title}>
            {title}
          </Display>
          {accent ? (
            <Script size="md" className={cn("mt-1 sm:mt-2", palette.accent)}>
              {accent}
            </Script>
          ) : null}
        </h1>

        {description ? (
          <p
            className={cn(
              "mt-6 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg",
              palette.description,
            )}
          >
            {description}
          </p>
        ) : null}

        {children ? (
          <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div>
        ) : null}
      </Container>
    </Section>
  );
}
