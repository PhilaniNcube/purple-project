import { Container, Section } from "@/components/ds";

/**
 * Testimonial — "In their words."
 *
 * The quiet lavender band that closes the story sections. A single pull-quote
 * carries the section on its own: the founder's words set in the brand's
 * italic serif and purple — the emotional counterweight to the heavy display
 * statements above it — signed off with the speaker's name and the award the
 * organisation took home.
 */
export function Testimonial() {
  return (
    <Section
      id="testimonial"
      tone="lavender"
      padding="none"
      className="relative overflow-hidden"
    >
      <Container className="relative py-24 sm:py-32">
        <figure className="relative mx-auto max-w-4xl">
          <blockquote className="max-w-4xl font-display text-2xl leading-snug text-brand-700 italic sm:text-3xl">
            &ldquo;Cancer does not have to be a death sentence. There is
            hope.&rdquo;
          </blockquote>

          <figcaption className="mt-6">
            <p className="font-semibold text-foreground">
              Dr Melissa Pietersen, founder
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Winner, Health &amp; Safety category &middot; The Herald Citizens
              of the Year Awards 2026
            </p>
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}
