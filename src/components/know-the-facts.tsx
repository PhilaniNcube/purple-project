import Link from "next/link";

import { Container, Display, Script, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * "Think you know the facts?"
 *
 * The short prompt that closes the statistics band and hands the reader on to
 * the quiz. It sits directly beneath "The numbers" and just above the knowledge
 * band, so it works as a breath between the two: a soft lavender ground, the
 * brand's two-voice headline lockup set centred (the heavy uppercase statement
 * with the italic serif counterweight carrying the question), the invitation to
 * share beneath it, and a single brand button.
 *
 * The band is deliberately quiet — no artwork, no motion — so the call to action
 * reads as the natural next step after the figures rather than competing with
 * the knowledge band below it.
 */
export function KnowTheFacts() {
  return (
    <Section id="know-the-facts" tone="lavender" padding="none">
      <Container className="flex flex-col items-center py-16 text-center sm:py-20">
        <h2 className="flex flex-col items-center">
          <Display as="span" size="md">
            Think you know
          </Display>
          <span className="mt-1 font-display text-2xl sm:text-4xl lg:text-6xl italic text-brand-700">
            the facts?
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-900/75 sm:text-lg">
          Take the quiz, then share it with someone who needs to hear it.
        </p>

        <Button
          variant="brand"
          size="cta"
          nativeButton={false}
          className="mt-8"
          render={<Link href="/quiz" />}
        >
          Take the quiz
        </Button>
      </Container>
    </Section>
  );
}
