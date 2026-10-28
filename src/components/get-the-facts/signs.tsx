import Image from "next/image";
import Link from "next/link";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/** The symptoms the band asks people to take seriously. */
const SIGNS = [
  "Unusual vaginal bleeding or discharge",
  "Bleeding during intercourse",
  "Bleeding after menopause",
  "Lower abdominal pain that won't go away",
  "Urinary or bowel changes",
  "Bloating that lingers",
  "Abnormal growths on the vulva",
];


export function Signs() {
  return (
    <Section
      id="signs"
      tone="light"
      padding="none"
      className="isolate overflow-hidden bg-mist"
    >
      <div className="grid lg:grid-cols-[43%_1fr]">
        {/* Photograph — full height on desktop, a wide band on smaller screens.
            The top-right corner is cut to a long ellipse so the picture curves
            into the page instead of ending on a square join. */}
        <div className="relative aspect-3/2 w-full overflow-hidden rounded-tr-[5rem_55%] lg:aspect-auto lg:h-full lg:rounded-tr-[9rem_60%]">
          <Image
            src="/images/signs.webp"
            alt="Two women embracing at a cancer awareness walk"
            fill
            sizes="(min-width: 1024px) 43vw, 100vw"
            className="object-cover object-[50%_45%]"
          />
        </div>

        <Container
          size="wide"
          className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-0 lg:py-8"
        >
          <div className="lg:pl-6">
            <h2 className="font-heading text-display-sm uppercase">
              <span className="block text-outline-2">Know</span>
              <span className="block text-foreground">The signs.</span>
            </h2>

            <div className="lg:pl-34">
              <p className="mt-8 max-w-xl font-display text-lg leading-snug font-bold italic text-pretty text-foreground">
                Early on, these cancers can be quiet, or look like everyday
                things. These are worth getting checked:
              </p>

              <ul className="mt-6 max-w-xl list-disc space-y-0.5 pl-5 text-sm leading-snug text-ink-800 marker:text-ink-400">
                {SIGNS.map((sign) => (
                  <li key={sign}>{sign}</li>
                ))}
              </ul>

              <p className="mt-6 max-w-xl text-sm leading-relaxed text-pretty text-ink-700">
                Age isn&rsquo;t a reason to brush symptoms aside. Women living
                with HIV have around six times the risk of cervical cancer,
                which makes regular screening especially important. South Africa
                is moving to HPV DNA testing as the main way to screen for
                cervical cancer, so ask your clinic what screening is right for
                you.
              </p>

              <Button
                variant="ghost"
                size="lg"
                nativeButton={false}
                className="mt-6 border border-brand-500 px-6 text-brand-600 hover:bg-brand-500/10 hover:text-brand-700"
                render={<Link href="/resources" />}
              >
                Learn more
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
