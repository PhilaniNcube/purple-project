import Image from "next/image";
import Link from "next/link";

import { Container, Eyebrow, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * "Palliative care — Comfort & Dignity."
 *
 * The closing note of the facts page, and the only band that speaks about the
 * end of the story. Two pairs of clasped hands fill the frame, washed almost to
 * paper so the photograph reads as texture rather than subject — the band is
 * about calm, not about another image.
 *
 * Everything is centred on one axis: a wide-tracked purple eyebrow, the
 * headline split into a solid display "COMFORT" and its italic serif
 * counterweight "& Dignity", one measured paragraph, and a single quiet call to
 * action. The section carries a generous minimum height so the whitespace does
 * the work the copy can't.
 */
export function PalliativeCare() {
  return (
    <Section
      id="palliative-care"
      tone="light"
      padding="none"
      className="isolate flex min-h-[34rem] items-center overflow-hidden bg-white sm:min-h-[40rem] lg:min-h-[45rem]"
    >
      {/* Background photograph, washed back to a pale ground. */}
      <Image
        src="/images/paliative care.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[50%_45%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-white/80" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-mist/30" />

      <Container className="relative flex flex-col items-center py-24 text-center sm:py-28">
        <div className="text-brand-600">
          <Eyebrow className="justify-center tracking-[0.3em]">
            Palliative care
          </Eyebrow>
        </div>

        <h2 className="mt-5 flex flex-wrap items-baseline justify-center gap-x-4 font-heading text-display-sm uppercase text-brand-600">
          Comfort
          <span className="font-display text-script-lg normal-case italic text-foreground">
            &amp; Dignity
          </span>
        </h2>

        <p className="mt-10 max-w-3xl text-base leading-relaxed text-pretty text-ink-700">
          Too often, these cancers are found late. When cure is no longer
          possible, the focus shifts to easing pain, bleeding and distress, and
          to making sure no one faces the end of life alone. Palliative care is a
          core part of cancer care. Our support focuses on preserving dignity,
          with comprehensive counselling for patients and their families while
          assisting in end-of-life care.
        </p>

        <Button
          variant="brand-outline"
          size="lg"
          nativeButton={false}
          className="mt-10 border-brand-500 px-5 text-brand-600 hover:border-brand-600 hover:bg-brand-500/10 hover:text-brand-700"
          render={<Link href="/contact" />}
        >
          Get in touch
        </Button>
      </Container>
    </Section>
  );
}
