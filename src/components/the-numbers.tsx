import { Container, Section } from "@/components/ds";

/**
 * "The numbers"
 *
 * A quiet statistics band. The headline is set as an oversized, low-contrast
 * watermark (heavy sans + italic serif, in a pale lavender) sitting behind a
 * four-up row of figures. Each figure is a card that lifts into a lavender tint
 * with a soft brand shadow on hover.
 */

type Stat = { value: string; label: string };

/** Placeholder figures — swap for the final dataset. */
const STATS: Stat[] = [
  {
    value: "13,800",
    label: "New cases of cervical cancer annually reported in South Africa",
  },
  {
    value: "13,800",
    label: "New cases of cervical cancer annually reported in South Africa",
  },
  {
    value: "13,800",
    label: "New cases of cervical cancer annually reported in South Africa",
  },
  {
    value: "13,800",
    label: "New cases of cervical cancer annually reported in South Africa",
  },
];

function StatCard({ value, label }: Stat) {
  return (
    // Negative margin + padding lets the hover surface breathe without shifting
    // the resting layout away from the reference.
    <div className="group -m-3 flex flex-col gap-3 rounded-2xl p-3 transition-[background-color,box-shadow,transform] duration-300 ease-brand hover:-translate-y-1 hover:bg-lavender hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:-m-4 sm:p-4">
      <span className="font-heading text-4xl font-extrabold tracking-tight text-primary transition-colors duration-300 group-hover:text-brand-800 sm:text-5xl">
        {value}
      </span>
      <span className="max-w-[22ch] text-sm leading-relaxed text-primary/80 transition-colors duration-300 group-hover:text-primary">
        {label}
      </span>
    </div>
  );
}

export function TheNumbers() {
  return (
    <Section
      id="numbers"
      tone="light"
      padding="none"
      className="pb-20 sm:pb-28"
    >
      <Container>
        {/* Watermark headline — pale, oversized, bleeding slightly left */}
        <h2 className="font-heading text-display-xl leading-[0.85] text-brand-200 select-none lg:-ml-12">
          <span className="mr-[0.12em]">The</span>
          <span className="font-display font-medium italic">numbers</span>
        </h2>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-16">
          {STATS.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
