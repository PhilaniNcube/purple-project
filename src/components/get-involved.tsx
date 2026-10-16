import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Display, Eyebrow, Script, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * "Get involved."
 *
 * The band that follows the founder's story and turns it into action: an
 * eyebrow and the two-voice headline ("BE PART OF" + the italic "the movement.")
 * over three equal columns, one per way to help — give, speak, partner.
 *
 * The three columns are separated by thin rules rather than boxed into cards,
 * following the system's preference for tonal bands over chrome. Instead of a
 * border, each column "lights up" on hover: a lavender wash slides up from the
 * foot of the column and the watermark numeral behind the title deepens, so the
 * row reads as three live choices rather than a static list. Each column then
 * ends on the two affordances from the prototype — a solid brand button and the
 * quieter "Get involved, …" arrow link.
 *
 * The wash is `motion-reduce:transition-none`, so with reduced motion the
 * columns simply don't animate; every action stays reachable and legible.
 */

type Action = {
  /** The watermark numeral sitting behind the title. */
  index: string;
  /** The action's name, set in the heavy display face. */
  title: string;
  description: string;
  /** The solid button's label. */
  cta: string;
  /** The quieter arrow link's label, mirroring the prototype's breadcrumb. */
  link: string;
  href: string;
};

const ACTIONS: Action[] = [
  {
    index: "01",
    title: "Give",
    description:
      "Donate sanitary and toiletry items, or fund workshops, so more women keep their dignity through treatment.",
    cta: "Donate",
    link: "Get Involved, Donate",
    href: "/donate",
  },
  {
    index: "02",
    title: "Speak",
    description:
      "Use your voice or your platform to carry the purple message further.",
    cta: "Volunteer",
    link: "Get Involved, Volunteer",
    href: "/volunteer",
  },
  {
    index: "03",
    title: "Partner",
    description:
      "Bring your business or organisation on board and help us reach the WHO\u2019s 2030 targets.",
    cta: "Partner with us",
    link: "Get Involved, Partner",
    href: "/partner-with-us",
  },
];

function ActionColumn({ index, title, description, cta, link, href }: Action) {
  return (
    <li
      className="group relative isolate flex flex-col overflow-hidden border-t border-brand-200/70 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0 lg:first:border-l-0 lg:first:pl-0"
    >
      {/* Hover wash — rises from the foot of the column to tint the whole cell. */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-full translate-y-full bg-lavender transition-transform duration-500 ease-brand group-hover:translate-y-0 motion-reduce:transition-none"
      />

      {/* Watermark numeral. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-1 right-0 font-heading text-display-lg leading-none text-brand-100 select-none transition-colors duration-500 group-hover:text-brand-200 lg:top-0"
      >
        {index}
      </span>

      <Display as="h3" size="xs" className="relative text-brand-700 lg:first:pl-10">
        {title}
      </Display>

      <p className="relative mt-4 flex-1 text-base leading-relaxed text-muted-foreground lg:first:pl-10">
        {description}
      </p>

      <div className="relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 lg:first:pl-10">
        <Button
          variant="brand"
          size="cta"
          nativeButton={false}
          render={<Link href={href} />}
        >
          {cta}
        </Button>

        
      </div>
    </li>
  );
}

export function GetInvolved() {
  return (
    <Section id="get-involved" tone="light">
      <Container size="wide">
        <h2 className="mt-6 flex flex-col items-start">
          <Display as="span" size="md">
            Be part of
          </Display>
          <span  className="text-brand-700 font-display text-2xl sm:text-4xl lg:text-6xl italic">
            the movement.
          </span>
        </h2>

        <ul className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-0">
          {ACTIONS.map((action) => (
            <ActionColumn key={action.href} {...action} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}
