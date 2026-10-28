import type { Metadata } from "next";
import Link from "next/link";

import { Container, Display, Eyebrow, Script, Section } from "@/components/ds";
import { PageHero } from "@/components/page-hero";
import { KnowledgeQuiz } from "@/components/quiz/knowledge-quiz";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Quiz",
  description:
    "Test what you know about gynaecological cancer, HPV, screening and the signs worth checking.",
};

export default function QuizPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Quiz"
        title="Think you know"
        accent="the facts?"
        description="Eight quick questions about gynaecological cancer, HPV, screening and the signs worth checking. No pressure — and no score is shared."
        tone="brand"
      />

      <Section tone="light">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
            <div>
              <Eyebrow rule className="text-primary">
                Two minutes
              </Eyebrow>
              <h2 className="mt-5 flex flex-col items-start">
                <Display as="span" size="sm" className="text-brand-950">
                  A little
                </Display>
                <Script size="sm" className="text-brand-700">
                  knowledge.
                </Script>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Most people have never been asked these questions. That is not a
                failure — it is the silence we are trying to break.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                You will see an explanation after each answer. Share the quiz with
                someone who might need it.
              </p>
              <div className="mt-8 border-t border-border pt-5">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  The quiz is educational and does not replace medical advice.
                  If you are worried about a symptom, speak to a healthcare
                  professional.
                </p>
              </div>
            </div>

            <KnowledgeQuiz />
          </div>
        </Container>
      </Section>

      <Section tone="lavender" padding="none">
        <Container size="wide" className="py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-brand-900/75">
              Want the detail behind the answers? The facts page covers the
              signs, prevention and screening in plain language.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="brand"
                size="cta"
                nativeButton={false}
                render={<Link href="/get-the-facts" />}
              >
                Get the facts
              </Button>
              <Button
                variant="brand-outline"
                size="cta"
                nativeButton={false}
                render={<Link href="/resources" />}
              >
                Browse resources
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
