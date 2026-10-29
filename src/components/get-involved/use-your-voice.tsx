import Image from "next/image";
import Link from "next/link";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * The four ways to carry the message further. Each card's headline is split
 * across the brand's two voices — a solid display word over its italic serif
 * counterweight — which is what gives the row its rhythm.
 */
const ACTIONS = [
  {
    lead: "Share",
    accent: "the word",
    body: "Spread the word. Share our posts and start conversations online and in your community.",
  },
  {
    lead: "Join us",
    accent: "at events.",
    body: "Help at our activations and outreach events.",
  },
  {
    lead: "Pack",
    accent: "with purpose.",
    body: "Help prepare dignity packs for women in treatment.",
  },
  {
    lead: "Start a",
    accent: "conversation.",
    body: "Bring a talk about women's health to your workplace, school or group.",
  },
];

/**
 * "Use your voice."
 *
 * The last of the getting-involved bands. Two hands reaching towards each other
 * fill the frame, washed almost to paper so the photograph reads as a grey
 * texture behind the copy rather than as a subject.
 *
 * The heading leads on the left with its one-line promise beneath it, the
 * invitation to share what you know sits opposite, and four translucent cards
 * carry the ways to help. The band closes on a single outlined button — the
 * volunteer sign-up — so the call to action stays quiet against this pale
 * ground but still reads as an action.
 */
export function UseYourVoice() {
  return (
    <Section
      id="use-your-voice"
      tone="light"
      padding="none"
      className="isolate overflow-hidden bg-mist"
    >
      {/* Background photograph, washed back to a pale ground. */}
      <Image
        src="/images/shake.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[50%_45%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-white/80" />

      <Container size="wide" className="relative py-24 sm:py-28 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <h2 className="font-heading text-display-md uppercase text-foreground">
              Use{" "}
              <span className="font-display normal-case italic">your voice</span>
            </h2>
            <p className="mt-4 max-w-sm text-lg leading-snug font-semibold text-balance text-foreground">
              You don&rsquo;t need a medical background to make a difference.
            </p>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-pretty text-ink-700 lg:justify-self-end">
            Share what you know. Start the conversation at work, at school or at
            home. Lend us your platform, or help us build new ones, to carry the
            purple message further.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIONS.map((action) => (
            <li
              key={action.lead}
              className="flex flex-col items-center rounded-xl bg-white/65 px-5 py-8 text-center"
            >
              <h3 className="font-heading text-2xl leading-tight font-bold tracking-tight text-brand-700">
                <span className="block">{action.lead}</span>
                <span className="block font-display text-2xl font-medium normal-case italic">
                  {action.accent}
                </span>
              </h3>

              <p className="mt-5 text-sm leading-relaxed text-pretty text-brand-900/70">
                {action.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center">
          <Button
            variant="brand-outline"
            size="lg"
            nativeButton={false}
            className="border-brand-500 px-5 text-brand-600 hover:border-brand-600 hover:bg-brand-500/10 hover:text-brand-700"
            render={<Link href="/volunteer" />}
          >
            Sign up to Volunteer
          </Button>
        </div>
      </Container>
    </Section>
  );
}
