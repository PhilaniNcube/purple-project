import Link from "next/link";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * "A note of support."
 *
 * The quiet closing band on the story page. Sharing can bring difficult
 * feelings back, so the page ends by slowing down: one line of care in the
 * brand's italic serif, a plain offer to listen, and a single route to contact
 * the team. The faint brand glow keeps the dark ground from feeling flat
 * without competing with the type.
 */
export function SupportNote() {
  return (
    <Section
      id="support"
      tone="night"
      padding="none"
      className="isolate overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(111,52,168,0.28),transparent_68%)]"
      />

      <Container className="flex flex-col items-center py-20 text-center sm:py-24">
        <h2 className="sr-only">A note of support</h2>

        <p className="max-w-3xl font-display text-2xl leading-snug font-medium text-pretty text-white italic sm:text-3xl">
          If sharing brings up difficult feelings, you don&rsquo;t have to face
          them alone.
        </p>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
          Reach out, and we&rsquo;ll listen first.
        </p>

        <Button
          variant="inverse-outline"
          size="cta"
          nativeButton={false}
          className="mt-9"
          render={<Link href="/contact" />}
        >
          Contact us
        </Button>
      </Container>
    </Section>
  );
}
