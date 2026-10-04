import { ArrowDown } from "lucide-react";

import { Container } from "@/components/ds";
import Link from "next/link";
import Image from "next/image";

/**
 * Our Story hero.
 *
 * Full-bleed opening band for the Our Story page: the community group
 * photograph, washed dark so the headline stays legible, the brand's two
 * voices in lockup — a heavy uppercase statement ("No shame") answered by its
 * italic serif counterweight ("Just support") — the one-line promise beneath,
 * and a scroll cue. The site navigation floats transparently above it.
 *
 * "NO SHAME" is outlined the CSS way: the fill is knocked out
 * (`-webkit-text-fill-color: transparent`) and a stroke is drawn around the
 * live display type (`-webkit-text-stroke`). Both come from the `text-outline-2`
 * utility in `globals.css`, so the same effect is available anywhere via
 * `text-outline` (1.5px) or `text-outline-<n>` (n px). Because it is real text,
 * it scales and reflows with the type scale and needs no generated artwork.
 *
 * The photograph is `fill` + `object-cover`, so it always covers the section
 * whatever the viewport. The neutral scrims darken the top and bottom edges so
 * the transparent nav and the scroll cue keep their contrast while the group
 * stays visible through the middle of the frame.
 */
export function OurStoryHero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-brand-950 text-white"
    >
      {/* Background photograph */}
      <Image
        src="/images/our-story-hero.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />

      {/* Dark scrims — keep the headline legible against the busy frame while
          letting the community read through the centre. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/45" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/80 via-black/10 to-black/85"
      />

      <Container className="relative flex flex-1 flex-col items-center justify-center py-32 text-center">
        <h1 className="flex w-full flex-col items-center">
          {/* "NO SHAME" — transparent fill, stroked outline (currentColor =
              white via `text-white`). */}
          <span className="block font-heading text-display-sm md:text-display-md uppercase text-white text-outline-1">
            No shame
          </span>

          <span className="mt-1 block font-display text-script-lg italic text-white sm:mt-2">
            Just support
          </span>
        </h1>

        <p className="mt-20 text-base leading-relaxed text-white/85 sm:text-lg ">
          This is our story.
        </p>
      </Container>

      <Link
        href="#founder"
        aria-label="Scroll to explore"
        className="relative mx-auto mb-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-white/60 text-white transition-colors outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <ArrowDown aria-hidden className="size-6 animate-float" />
      </Link>
    </section>
  );
}
