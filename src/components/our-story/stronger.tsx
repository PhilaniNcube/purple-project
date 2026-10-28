import Image from "next/image";
import Link from "next/link";

import { Container, Display, Script, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";
import { PARTNERS } from "@/lib/partners";

/**
 * "Stronger together."
 *
 * The partner band beneath `OurStoryReason`: the two-voice headline centred on
 * the band, a single line of supporting copy, the logos of the organisations
 * Purple Project works alongside, and an invitation to partner.
 *
 * Both headline lines are set in the brand purple rather than the usual
 * outline + solid pairing — the statement is meant to read as a plain,
 * confident claim, not another scroll-drawn headline. The logos are rendered
 * at their native pixel sizes so the lock-ups keep the proportions they were
 * drawn with (each file has its own transparent padding), and the row only
 * tightens below `sm`, where the three stack and shrink to fit the column.
 *
 * The button is deliberately quiet: an outlined ghost at rest that picks up a
 * faint brand wash on hover, keeping the invitation secondary to the names
 * above it.
 */

export function OurStoryStronger() {
  return (
    <Section id="stronger" tone="muted">
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2 className="flex flex-col items-center text-brand-700">
            <Display as="span" size="md">
              Stronger
            </Display>
            <Script size="md" className="mt-1 sm:mt-2">
              Together
            </Script>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-8">
            We work alongside organisations that share our goal.
          </p>

          <ul
            aria-label="Our partners"
            className="mt-14 grid w-full max-w-4xl items-center justify-items-center gap-y-10 sm:mt-20 sm:grid-cols-3 sm:gap-x-8 lg:gap-x-12"
          >
            {PARTNERS.map((partner) => (
              <li key={partner.src} className="flex w-full justify-center">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className={`h-auto w-full ${partner.maxWidth}`}
                />
              </li>
            ))}
          </ul>

          <Button
            variant="brand-outline"
            size="cta"
            nativeButton={false}
            className="mt-12 sm:mt-14"
            render={<Link href="/partner-with-us" />}
          >
            Partner with us
          </Button>
        </div>
      </Container>
    </Section>
  );
}
