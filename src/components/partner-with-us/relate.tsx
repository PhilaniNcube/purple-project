import { ArrowUpRight } from "lucide-react";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * "Relate Bracelets."
 *
 * A narrow dark band between the ways to partner and the enquiry form. The
 * bracelet programme is an external route rather than one of our own, so the
 * section stays deliberately quiet: the name in the brand's italic serif, one
 * line of explanation, and a single outlined link away.
 */
export function Relate() {
  return (
    <Section id="relate" tone="night" padding="none">
      <Container
        size="wide"
        className="flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="max-w-2xl">
          <h2 className="font-display text-script-md italic text-brand-300">
            Relate Bracelets
          </h2>
          <p className="mt-3 text-base leading-relaxed text-pretty text-white/80">
            You can also support Purple Project through Relate Bracelets. Find
            out how at relate.org.za.
          </p>
        </div>

        <Button
          variant="inverse-outline"
          size="cta"
          nativeButton={false}
          className="w-fit"
          render={
            <a
              href="https://relate.org.za"
              target="_blank"
              rel="noreferrer"
            />
          }
        >
          Visit Relate
          <ArrowUpRight aria-hidden />
        </Button>
      </Container>
    </Section>
  );
}
