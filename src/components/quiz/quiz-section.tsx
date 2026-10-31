import { Container, Section } from "@/components/ds";
import { KnowledgeQuiz } from "@/components/quiz/knowledge-quiz";

/**
 * The quiz band.
 *
 * One centred panel on the mist ground, so the questions carry the section
 * without a competing headline. The panel holds the progress, the current
 * question and the result state.
 */
export function QuizSection() {
  return (
    <Section
      id="quiz"
      tone="light"
      padding="none"
      className="scroll-mt-20 bg-mist"
    >
      <Container size="wide" className="py-20 sm:py-24 lg:py-28">
        <h2 className="sr-only">Quiz questions</h2>
        <div className="mx-auto max-w-3xl">
          <KnowledgeQuiz />
        </div>
      </Container>
    </Section>
  );
}
