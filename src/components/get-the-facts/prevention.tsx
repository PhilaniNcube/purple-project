import Image from "next/image";
import Link from "next/link";

import { Container, Display, Script, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * "Prevention starts with the vaccine."
 *
 * The dark band after the colour story. A vaccination under way — gloved hands,
 * a syringe, a patterned wrap — fills the frame and is dimmed almost to a
 * ground, so the band reads as the page's quiet closing statement rather than
 * another photograph. Everything is centred on one axis: the two-voice
 * headline, three short paragraphs on HPV and South Africa's school programme,
 * and a single outlined call to action.
 *
 * The scrim is deliberately heavy and neutral (black, not brand purple) so the
 * photograph's blues stay blue and the white type keeps its contrast.
 */
export function Prevention() {
  return (
    <Section
      id="vaccine"
      tone="night"
      padding="none"
      className="isolate overflow-hidden"
    >
      {/* Background photograph */}
      <Image
        src="/images/prevention.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[50%_24%]"
      />

      {/* Scrims — a flat dim for the whole frame, then a soft centre falloff so
          the gloves stay readable at the edges while the type sits on depth. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/50" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55),rgba(0,0,0,0.2)_70%)]"
      />

      <Container className="relative flex flex-col items-center py-24 text-center sm:py-28 lg:py-32">
        <h2 className="flex flex-col items-center">
          <Display as="span" size="md">
            Prevention
          </Display>
          <Script size="md">Starts with the vaccine</Script>
        </h2>

        <div className="mt-10 max-w-3xl space-y-3 text-base leading-snug text-pretty text-white/85">
          <p>
            HPV, the human papillomavirus, is behind nearly all cervical cancers.
            The US Centers for Disease Control and Prevention (CDC) estimates it
            causes over 90% of cervical and anal cancers, and about 70% of
            vaginal and vulvar cancers.
          </p>
          <p>
            South Africa&rsquo;s school-based programme has offered the HPV
            vaccine free in public schools since 2014, and now reaches more than
            1.5 million girls every year. It uses a single dose, as the World
            Health Organization (WHO) recommends, and is being strengthened to
            reach girls aged 9 to 15 who are out of school. The country also
            plans to extend vaccination to boys when feasible.
          </p>
          <p>
            Having questions about the vaccine is normal. We work with parents,
            teachers and schools to answer them and help young people register.
          </p>
        </div>

        <Button
          variant="inverse-outline"
          size="lg"
          nativeButton={false}
          className="mt-16 px-6 sm:mt-20"
          render={<Link href="/get-the-facts#prevention" />}
        >
          Read about the vaccine
        </Button>
      </Container>
    </Section>
  );
}
