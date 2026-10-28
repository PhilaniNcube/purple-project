import Image from "next/image";

import { Container, Section } from "@/components/ds";

/** The five gynaecological cancers named in the roll call. */
const CANCERS = [
  "Cervical",
  "Ovarian",
  "Uterine",
  "Vaginal",
  "Vulval",
] as const;

/**
 * "Five cancers. One conversation."
 *
 * The band beneath the Get the facts hero. Where that hero is dark and
 * photographic, this one opens the page up: the artwork is a floral double
 * helix — a strand of roses and greenery wound around a DNA ladder — bleeding
 * in from the right, its own pale ground picked up by the section so the
 * photograph dissolves into the band and only the helix reads as picture.
 *
 * The copy sits on the left, in the brand's two voices: "FIVE CANCERS" is
 * stroke-only display type (`text-outline-2`), answered by the italic serif
 * "One Conversation". The five cancers then run as a purple roll call, each
 * pair parted by a lighter `//`, before one short paragraph explains why the
 * page covers all of them rather than just the best known.
 *
 * The artwork is decorative, so it is hidden from assistive tech; everything it
 * illustrates is in the heading and the list.
 */
export function FiveCancers() {
  return (
    <Section
      id="five-cancers"
      tone="light"
      padding="none"
      className="isolate flex min-h-svh items-center overflow-hidden bg-mist"
    >
      {/* Background — the helix, pinned to the right and cropped by the band so
          the flowers land at the right-hand edge as in the prototype. The
          artwork is turned anticlockwise and scaled up, which steepens the
          strand and keeps its own pale ground (`bg-mist`) filling the corners,
          so no edge ever shows. A mask fades its left edge into that ground,
          so the strand never ends on a hard line beside the copy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-20 w-[115%] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_34%)] sm:w-[80%] lg:w-[50%]"
      >
        <Image
          src="/images/helix.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 58vw, 115vw"
          className="rotate-[-15deg] scale-125 object-cover object-[72%_50%]"
        />
      </div>

      {/* On narrow screens the helix runs under the copy, so it is knocked back
          into a soft texture there; from `lg` up the two sit side by side and
          the artwork keeps its full colour. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-mist/60 lg:bg-transparent" />

      <Container size="wide" className="relative py-24 sm:py-28 lg:py-32">
        <div className="max-w-4xl">
          <h2 className="flex flex-col items-start">
            {/* "FIVE CANCERS" — stroke-only type. */}
            <span className="block font-heading text-display-lg font-light tracking-normal text-outline-2 uppercase text-foreground">
              Five cancers
            </span>

            <span className="mt-1 block font-display text-script-xl italic text-foreground sm:mt-2 sm:whitespace-nowrap">
              One Conversation
            </span>
          </h2>

          <ul className="mt-8 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-heading text-xl font-semibold text-primary sm:mt-10 sm:gap-x-5 sm:text-2xl lg:text-3xl">
            {CANCERS.map((cancer, index) => (
              <li key={cancer} className="flex items-baseline gap-x-2.5 sm:gap-x-5">
                {cancer}
                {index < CANCERS.length - 1 ? (
                  <span aria-hidden className="font-normal text-primary/35">
                    {"//"}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[38rem] text-base leading-relaxed text-pretty text-foreground/80 sm:text-lg">
            They&rsquo;re different cancers with one problem in common: not
            enough people talk about them, so they&rsquo;re often found late. The
            encouraging part is that cervical cancer is one of the most
            preventable and treatable cancers there is.
          </p>
        </div>
      </Container>
    </Section>
  );
}
