import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * Share your story hero.
 *
 * Three women standing close together, washed to brand violet so the
 * photograph reads as a warm, human ground for the headline. The lockup keeps
 * the brand's two voices — the stroke-only "YOUR STORY" answered by the italic
 * serif "matters." — then the invitation in two short measures: who the story
 * can help, and how much of it to share.
 *
 * The photograph is `fill` + `object-cover`, so it always covers the band
 * whatever the viewport. The scrims darken the top and bottom edges so the
 * transparent nav and the headline keep their contrast.
 */
export function ShareStoryHero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-brand-900 text-white"
    >
      <Image
        src="/images/reason.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[50%_24%]"
      />

      {/* Violet wash, then neutral scrims for contrast. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-brand-700/60 mix-blend-multiply"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-brand-950/80 via-brand-900/30 to-brand-950/85"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(20,5,30,0.42),transparent_68%)]"
      />

      <Container className="relative flex flex-1 flex-col items-center justify-center py-32 text-center">
        <h1 className="flex w-full flex-col items-center">
          <span className="block font-heading text-display-lg uppercase tracking-[0.02em] text-white text-outline-2">
            Your story
          </span>

          <span className="mt-1 block font-display text-script-xl italic text-white sm:mt-2">
            matters.
          </span>
        </h1>

        <p className="mt-10 max-w-3xl text-lg leading-snug font-semibold text-balance text-white sm:text-xl">
          For the patient, survivor, caregiver or someone who has lost a loved
          one, your story can help another woman speak up sooner.
        </p>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-white/85">
          Share as much or as little as you like. You choose whether your name
          is used, and we&rsquo;ll only share your story with your permission.
        </p>

        <Button
          variant="inverse-outline"
          size="cta"
          nativeButton={false}
          className="mt-10"
          render={<Link href="#story" />}
        >
          Share my story
        </Button>
      </Container>
    </section>
  );
}
