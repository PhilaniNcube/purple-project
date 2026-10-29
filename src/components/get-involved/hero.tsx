import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Get involved hero.
 *
 * Full-viewport opening band: a flock of birds caught mid-flight against the
 * sky, washed to brand violet so the silhouettes read as dark brush marks
 * across the purple rather than as wildlife photography.
 *
 * The lockup keeps the brand's two voices, both centred on one axis — the
 * stroke-only "BE PART OF" carrying the invitation, its italic serif
 * counterweight "The movement" answering it — then one sentence of scope and a
 * single outlined call to action. The site navigation floats above it.
 */
export function InvolvedHero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-brand-800 text-white"
    >
      {/* Background photograph */}
      <Image
        src="/images/birds.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-center"
      />

      {/* Violet wash — brand hue over the birds' own light and shade, then a
          flat brand tint that settles the band into mid purple and softens the
          silhouettes into brush marks. */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-brand-600 mix-blend-color" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-brand-800/75" />

      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-32 text-center sm:px-8">
        <h1 className="flex w-full flex-col items-center font-heading text-display-md uppercase">
          <span className="block tracking-[0.02em] text-outline-2">
            Be part of
          </span>
          <span className="mt-2 block font-display text-script-lg normal-case italic">
            The movement
          </span>
        </h1>

        <p className="mt-20 max-w-4xl text-base leading-relaxed text-pretty text-white/85 sm:text-lg">
          With your support, we can help South Africa climb closer to its 2030
          goal of eliminating cervical cancer, and improve cancer care and
          prevention for women across the country.
        </p>

        <Button
          variant="inverse-outline"
          size="lg"
          nativeButton={false}
          className="mt-10 px-5"
          render={<Link href="#ways" />}
        >
          Explore ways to get involved
        </Button>
      </div>
    </section>
  );
}
