import Link from "next/link";
import { ArrowDown, ArrowUpRight, CreditCard, Package } from "lucide-react";

import { Container, Display, Eyebrow, Script, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

const PAYMENT_HREF =
  process.env.NEXT_PUBLIC_PAYMENT_URL ||
  "mailto:hello@purpleproject.org.za?subject=Online%20donation%20%E2%80%94%20Purple%20Project";

const WAYS_TO_GIVE = [
  {
    index: "01",
    icon: CreditCard,
    lead: "Give",
    accent: "online.",
    title: "Give online.",
    body: "Make a secure online donation to fund the workshops and outreach that take information into communities.",
    cta: "Donate online",
    href: PAYMENT_HREF,
    variant: "brand" as const,
    external: true,
  },
  {
    index: "02",
    icon: Package,
    lead: "Pledge",
    accent: "items.",
    title: "Pledge items.",
    body: "Prefer to give in kind? Tell us what you’d like to donate, such as sanitary towels, soap and body wash, toothbrushes and toothpaste, deodorant, body lotion or other toiletries, and we’ll arrange the hand-over.",
    cta: "Pledge items",
    href: "#pledge-form",
    variant: "secondary" as const,
    external: false,
  },
] as const;

/**
 * "Give online or give in kind." — Section 02 of the Donate page.
 *
 * Sets out the two ways a supporter can contribute: a direct online donation
 * towards community workshops and outreach, or an in-kind pledge of sanitary
 * and toiletry items for women in treatment.
 *
 * Visually draws from the home page's `GetInvolved` columns (oversized
 * watermark numerals and a rising lavender hover wash) and `ShiningALight`'s
 * editorial dot grid and two-voice headline lockup.
 */
export function TwoWaysToGive() {
  return (
    <Section id="ways-to-give" tone="light" className="scroll-mt-20">
      <Container size="wide">
        <div className="relative">
          {/* Decorative dot grid, echoing `ShiningALight` and `OurStoryReason` */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 hidden size-24 text-ink-300 sm:block"
            style={{
              backgroundImage:
                "radial-gradient(currentColor 1.5px, transparent 1.5px)",
              backgroundSize: "18px 18px",
            }}
          />



          <h2 className="flex w-full flex-col items-center">
            <span className="block font-heading text-display-md lg:text-display-md text-brand-800 tracking-[0.02em] uppercase text-outline-2">
              Give Online
            </span>
            <span className="mt-1 block font-display lg:text-script-md italic text-brand-700 sm:mt-2">
              or give in kind
            </span>
          </h2>
        </div>

        <ul className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-0">
          {WAYS_TO_GIVE.map((way) => {
            const Icon = way.icon;

            return (
              <li
                key={way.index}
                className="group relative isolate flex flex-col overflow-hidden border-t border-brand-200/80 p-6 pt-10 sm:p-10 lg:border-t-0 lg:border-l lg:first:border-l-0"
              >
                {/* Hover wash — rises from the foot of the column to tint the cell */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 -z-10 h-full translate-y-full bg-lavender/70 transition-transform duration-500 ease-brand group-hover:translate-y-0 motion-reduce:transition-none"
                />

                {/* Watermark numeral */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-4 right-6 font-heading text-display-lg leading-none text-brand-100 select-none transition-colors duration-500 group-hover:text-brand-200"
                >
                  {way.index}
                </span>

                <span className="relative flex size-12 items-center justify-center bg-lavender text-brand-700 transition-colors duration-300 group-hover:bg-white">
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>

                <h3 className="relative mt-6 font-heading text-display-xs uppercase text-brand-950">
                  <span>{way.lead} </span>
                  <span className="font-display text-script-sm normal-case italic text-brand-700">
                    {way.accent}
                  </span>
                </h3>

                <p className="relative mt-4 max-w-xl flex-1 text-base leading-relaxed text-pretty text-ink-700">
                  <strong className="font-semibold text-foreground">
                    {way.title}
                  </strong>{" "}
                  {way.body}
                </p>

                <div className="relative mt-8 pt-2">
                  {way.external ? (
                    <Button
                      variant="brand"
                      size="cta"
                      nativeButton={false}
                      render={<a href={way.href} />}
                    >
                      {way.cta}
                      <ArrowUpRight aria-hidden className="size-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="cta"
                      nativeButton={false}
                      className="border border-brand-300 bg-lavender text-brand-800 hover:bg-brand-200"
                      render={<Link href={way.href} />}
                    >
                      {way.cta}
                      <ArrowDown aria-hidden className="size-4" />
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

