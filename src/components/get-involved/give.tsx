import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/** What a donation actually pays for, listed in the closing card. */
const IMPACT = [
  {
    lead: "Protect more young people.",
    body: "Support vaccination initiatives that help prevent HPV-related cancers.",
  },
  {
    lead: "Bring screening closer.",
    body: "Help more women access cervical screening, especially in underserved regions.",
  },
  {
    lead: "Stand with women in treatment.",
    body: "Fund emotional and medical support, and compassionate care at the end of life.",
  },
];

/**
 * "Give — what you can."
 *
 * The giving band. Two hands holding a tangle of fairy lights fill the frame,
 * washed to brand violet so the light becomes the only bright thing in an
 * otherwise deep purple field.
 *
 * The copy runs down one centred axis: the statement in the brand's two voices,
 * one line on what a gift does, then the two ways to give either side of a
 * plain "or" — cash through the site, or goods handed over in person — and a
 * single outlined button beneath them.
 */
export function Give() {
  return (
    <Section
      id="give"
      tone="brand"
      padding="none"
      className="isolate flex min-h-svh items-center overflow-hidden"
    >
      {/* Background photograph */}
      <Image
        src="/images/hands.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-30 object-cover object-[50%_60%]"
      />

      {/* Violet wash — brand hue over the photograph, then a flat tint that
          settles the sky into the band's mid purple. */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-brand-600 mix-blend-color" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-brand-800/70" />

      <Container className="relative py-24 text-center sm:py-28 lg:py-32">
        <h2 className="flex flex-col items-center font-heading text-display-md uppercase">
          <span className="block">Give</span>
          <span className="mt-1 block font-display text-script-lg normal-case italic">
            What you can
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-4xl text-base leading-relaxed text-pretty text-white/85">
          Every gift helps a woman keep her dignity through treatment, and helps
          another recognise the signs sooner.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-10">
          <div className="flex flex-col justify-start">
            <h3 className="font-heading text-display-sm uppercase text-white">
              Give{" "}
              <span className="font-display text-script-md normal-case italic">
                online
              </span>
            </h3>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-pretty text-white/80 sm:text-base">
              Make a secure online donation to fund the workshops and outreach
              that take information into communities.
            </p>
          </div>

          <p className="font-heading text-2xl font-bold uppercase text-white lg:self-center">
            or
          </p>

          <div className="flex flex-col justify-start">
            <h3 className="font-heading text-display-sm uppercase text-white">
              Give{" "}
              <span className="font-display text-script-md normal-case italic">
                in kind
              </span>
            </h3>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-pretty text-white/80 sm:text-base">
              Prefer to give in kind? Tell us what you&rsquo;d like to donate,
              such as sanitary towels, soap and body wash, toothbrushes and
              toothpaste, deodorant, body lotion or other toiletries, and
              we&rsquo;ll arrange the hand-over.
            </p>
          </div>
        </div>

        <Button
          variant="inverse-outline"
          size="lg"
          nativeButton={false}
          className="mx-auto mt-14 flex w-fit px-5"
          render={<Link href="/donate" />}
        >
          Donate online
        </Button>

        {/* Where the money goes — the receipt for the ask above. */}
        <div className="mt-12 rounded-xl bg-brand-950/70 px-6 py-7 text-left sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[13rem_1fr] lg:items-start lg:gap-12">
            <p className="font-heading text-xl leading-tight font-bold text-white">
              Where your support goes
            </p>

            <ul className="space-y-3">
              {IMPACT.map((item) => (
                <li
                  key={item.lead}
                  className="flex items-start gap-3 text-sm leading-relaxed text-white/85"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[3px] bg-white text-brand-800"
                  >
                    <Check className="size-3" strokeWidth={3.5} />
                  </span>
                  <span>
                    <strong className="font-semibold text-white">
                      {item.lead}
                    </strong>{" "}
                    {item.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
