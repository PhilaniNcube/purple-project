import { Container, Section } from "@/components/ds";
import { PageHero } from "@/components/page-hero";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

type LegalPageProps = {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

/**
 * Shared reading layout for the policy pages in the footer.
 *
 * Long-form legal copy lives in the page files; this component only supplies
 * the hero, the updated date and the reading measure.
 */
export function LegalPage({ title, intro, updated, sections }: LegalPageProps) {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero eyebrow="Legal" title={title} description={intro} tone="light" />

      <Section tone="light" padding="none" className="pb-20 sm:pb-28">
        <Container size="sm">
          <p className="font-heading text-[0.7rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Last updated {updated}
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-heading text-xl font-bold tracking-tight text-brand-950 uppercase">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
