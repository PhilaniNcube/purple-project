import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

/**
 * Get The Facts hero.
 *
 * Full-bleed opening band for the Get The Facts page: the microscopic cell
 * artwork, washed dark so the headline stays legible, then the brand's two
 * voices in lockup — an outlined display statement ("The Facts") answered by
 * its italic serif counterweight ("Plainly Put") — the one-line summary, and a
 * single call to action. The site navigation floats transparently above it.
 *
 * "THE FACTS" is outlined the CSS way: the fill is knocked out
 * (`-webkit-text-fill-color: transparent`) and a stroke drawn around the live
 * display type (`-webkit-text-stroke`). Both come from the `text-outline-1`
 * utility in `globals.css`, so the effect is real text — it scales and reflows
 * with the type scale, keeps the headline readable to assistive tech, and
 * needs no generated artwork.
 *
 * The photograph is `fill` + `object-cover`, so it always covers the section
 * whatever the viewport. The scrims darken the top edge for the transparent
 * nav and hold the centre steady without hiding the cells at the edges.
 */
export function FactsHero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-brand-950 text-white"
    >
      {/* Background photograph */}
      <Image
        src="/images/facts-hero.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />

      {/* Scrims — lift the nav off the bright corners and settle the centre. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-brand-950/35" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/70 via-transparent to-black/60"
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-32 text-center sm:px-8">
        <h1 className="flex w-full flex-col items-center">
          {/* "THE FACTS" — transparent fill, stroked outline (currentColor =
              white via `text-white`). */}
          <span className="block font-heading text-display-sm uppercase text-white text-outline-1">
            The Facts
          </span>

          <span className="mt-1 block font-display text-script-lg italic text-white sm:mt-2">
            Plainly Put
          </span>
        </h1>

        <p className="mt-8 max-w-6xl text-base leading-relaxed text-pretty text-white/85">
          Five gynaecological cancers. Most people have only heard of one.
          Here&rsquo;s what to know about all of them, in plain language.
        </p>

        <Button
          variant="inverse-outline"
          size="cta"
          nativeButton={false}
          className="mt-9"
          render={<Link href="/quiz" />}
        >
          Take the quiz
        </Button>
      </div>
    </section>
  );
}
