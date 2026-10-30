import Image from "next/image";

import { PledgeInKindForm } from "@/components/donate/pledge-in-kind-form";
import { Container, Section } from "@/components/ds";

/**
 * "Pledge form" — Section 04 of the Donate page.
 *
 * Allows supporters to pledge dignity-pack supplies in kind and choose how to
 * hand them over. Pairs an editorial left column (headline lockup, guidance and
 * photography) with a sharp, square-cornered form panel on the right.
 */
export function PledgeForm() {
  return (
    <Section id="pledge-form" tone="lavender" className="scroll-mt-20">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          {/* Editorial intro column */}
          <div>
            <h2 className="flex w-full flex-col items-start">
              <span className="block font-heading text-display-md lg:text-display-md text-brand-800 tracking-[0.02em] uppercase text-outline-2">
                Pledge
              </span>
              <span className="mt-1 block font-display lg:text-script-md italic text-brand-700 sm:mt-2">
                in kind
              </span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-pretty text-brand-900/80">
              Prefer to give practical items? Tell us what you&rsquo;d like to
              donate for women in cancer care, and we&rsquo;ll be in touch to
              arrange the hand-over.
            </p>

            {/* Arched editorial image, echoing `ShiningALight` and `OurStoryReason` */}
            <div className="relative mt-10 aspect-4/3 w-full max-w-md overflow-hidden rounded-arch bg-brand-200">
              <Image
                src="/images/womens-health.png"
                alt="Women sitting together in support and solidarity"
                fill
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-brand-900/20 mix-blend-multiply"
              />
            </div>
          </div>

          {/* Form panel */}
          <div className="border border-brand-200 bg-white p-7 shadow-xs sm:p-10">
            <PledgeInKindForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
