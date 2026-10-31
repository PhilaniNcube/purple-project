import { Container, Section } from "@/components/ds";

/** The four ways to partner named on the page. */
const WAYS = [
  {
    title: "Financial support.",
    body: "Fund education, outreach and care.",
  },
  {
    title: "In-kind gifts.",
    body: "Sanitary towels and toiletries for women in treatment.",
  },
  {
    title: "Campaign support.",
    body: "Sponsor a social media campaign or printed educational materials.",
  },
  {
    title: "Community outreach.",
    body: "Support the events and school sessions that take information to where it’s needed.",
  },
] as const;

/**
 * "Ways to partner."
 *
 * The light band beneath the partner hero. The heading is centred on one axis
 * in the brand's two voices — stroke-only "WAYS" answered by the italic serif
 * "to partner." — with the four routes to support running beneath it as quiet
 * cards on the mist ground.
 */
export function WaysToPartner() {
  return (
    <Section
      id="ways"
      tone="light"
      padding="none"
      className="scroll-mt-20 bg-mist"
    >
      <Container size="wide" className="py-20 sm:py-24 lg:py-28">
        <h2 className="flex flex-col items-center text-center font-heading text-display-md uppercase">
          <span className="block text-outline-2 text-foreground">Ways</span>
          <span className="mt-1 block font-display text-script-lg normal-case italic text-brand-700 sm:mt-2">
            to partner.
          </span>
        </h2>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {WAYS.map((way, index) => (
            <li
              key={way.title}
              className="flex flex-col rounded-2xl bg-white/70 px-6 py-8"
            >
              <span
                aria-hidden
                className="font-heading text-sm font-bold tracking-[0.18em] text-brand-400"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-4 font-heading text-xl leading-tight font-bold tracking-tight text-brand-950">
                {way.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-pretty text-ink-700">
                {way.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
