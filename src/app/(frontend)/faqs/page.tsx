import type { Metadata } from "next";

import { FaqsHero } from "@/components/faqs/hero";
import { FaqQuestions } from "@/components/faqs/questions";
import { JoinUs } from "@/components/join-us";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Questions, answered. What Purple Project is, which cancers we focus on, donating items, our work in schools and how businesses can help.",
};

export default function FaqsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <FaqsHero />

      <FaqQuestions />

      <JoinUs />
    </main>
  );
}
