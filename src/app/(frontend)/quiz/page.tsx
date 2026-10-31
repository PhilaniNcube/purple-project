import type { Metadata } from "next";

import { QuizHero } from "@/components/quiz/hero";
import { QuizSection } from "@/components/quiz/quiz-section";

export const metadata: Metadata = {
  title: "Quiz",
  description:
    "Seven quick questions about gynaecological cancer, HPV, screening and the signs worth checking.",
};

export default function QuizPage() {
  return (
    <main className="flex flex-1 flex-col">
      <QuizHero />

      <QuizSection />
    </main>
  );
}
