import Link from "next/link";
import { Award, HandHeart, Handshake, Share2 } from "lucide-react";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/** The four ways in, each with its own icon and destination. */
const WAYS = [
  {
    icon: HandHeart,
    title: "Give",
    body: "Donate online, or pledge sanitary and toiletries items for women in cancer care.",
    cta: "Donate",
    href: "/donate",
  },
  {
    icon: Award,
    title: "Volunteer",
    body: "Lend your skills, your time or your platform to carry the Purple message further.",
    cta: "Volunteer",
    href: "/volunteer",
  },
  {
    icon: Handshake,
    title: "Partner",
    body: "Bring your company or organisation on board.",
    cta: "Partner with us",
    href: "/partner-with-us",
  },
  {
    icon: Share2,
    title: "Share",
    body: "Tell your story, so someone else speaks up sooner.",
    cta: "Share your story",
    href: "/share-your-story",
  },
] as const;

/**
 * "Four ways to start."
 *
 * The first band under the get-involved hero: the invitation, itemised. The
 * headline uses the brand's two voices again — the stroke-only "FOUR WAYS"
 * answered by the italic serif "to start" — and each way is a soft card on the
 * pale ground: an icon, a one-line title, a sentence of what it actually
 * involves, and the outlined button that takes the visitor there.
 *
 * Cards are equal-height and centred so the four buttons sit on one line
 * however the copy wraps.
 */
export function WaysToStart() {
  return (
    <Section id="ways" tone="light" padding="none" className="scroll-mt-24 bg-mist">
      <Container size="wide" className="py-20 sm:py-24 lg:py-28">
        <h2 className="flex flex-col items-center text-center font-heading text-display-md uppercase">
          <span className="block text-outline-2">Four ways</span>
          <span className="mt-1 block font-display text-script-lg normal-case italic">
            to start
          </span>
        </h2>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {WAYS.map((way) => {
            const Icon = way.icon;

            return (
              <li
                key={way.href}
                className="flex flex-col items-center rounded-2xl bg-white/70 px-6 py-8 text-center"
              >
                <Icon aria-hidden className="size-6 text-brand-600" strokeWidth={1.75} />

                <h3 className="mt-4 font-heading text-lg font-bold tracking-tight text-brand-700">
                  {way.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-pretty text-ink-700">
                  {way.body}
                </p>

                <Button
                  variant="brand-outline"
                  size="lg"
                  nativeButton={false}
                  className="mt-6 border-brand-500 px-4 text-brand-600 hover:border-brand-600 hover:bg-brand-500/10 hover:text-brand-700"
                  render={<Link href={way.href} />}
                >
                  {way.cta}
                </Button>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
