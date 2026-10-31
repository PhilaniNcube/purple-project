import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Container, Section } from "@/components/ds";

type Faq = {
  question: string;
  answer: ReactNode;
};

/** Questions and answers from 7. FAQs in the copy deck. */
const FAQS: Faq[] = [
  {
    question: "What is Purple Project?",
    answer:
      "A South African movement, founded in 2022, breaking the silence around gynaecological cancer through education, early detection and practical support.",
  },
  {
    question: "Which cancers do you focus on?",
    answer:
      "All five gynaecological cancers: cervical, ovarian, uterine, vaginal and vulval.",
  },
  {
    question: "Can I donate items instead of money?",
    answer: (
      <>
        Yes. Sanitary and toiletry items help us support women in cancer care.
        Use the pledge form on the{" "}
        <Link
          href="/donate#pledge-form"
          className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900"
        >
          Donate page
        </Link>
        , and we&rsquo;ll arrange it.
      </>
    ),
  },
  {
    question: "Do you work in schools?",
    answer:
      "Yes. We run HPV education in primary and secondary schools, and work with schools, parents and teachers to support vaccination registration.",
  },
  {
    question: "How can my business help?",
    answer: (
      <>
        Through partnership, funding workshops, donating items or lending your
        platform to spread the message.{" "}
        <Link
          href="/partner-with-us"
          className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900"
        >
          Partner with us
        </Link>
        .
      </>
    ),
  },
];

/**
 * The questions list — the body of the FAQs page.
 *
 * Pairs an editorial left column (two-voice lockup, a short note and the
 * arched photograph used on `PledgeForm`) with a numbered accordion on the
 * right. Each row is a native `<details>` element, so it opens without
 * JavaScript and stays fully keyboard and screen-reader accessible. The first
 * question opens by default so the pattern is obvious at a glance.
 */
export function FaqQuestions() {
  return (
    <Section id="questions" tone="light" className="scroll-mt-20">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
          {/* Editorial intro column */}
          <div className="lg:sticky lg:top-28">
            <h2 className="flex w-full flex-col items-start">
              <span className="block font-heading text-display-md tracking-[0.02em] text-brand-800 uppercase text-outline-2">
                Ask away
              </span>
              <span className="mt-1 block font-display italic text-brand-700 sm:mt-2 lg:text-script-md">
                no shame here
              </span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-pretty text-ink-700">
              These answers are a starting point, not a substitute for medical
              advice. For anything personal, speak to a healthcare professional
              or{" "}
              <Link
                href="/contact"
                className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900"
              >
                get in touch
              </Link>
              .
            </p>

            <div className="relative mt-10 hidden aspect-4/3 w-full max-w-md overflow-hidden rounded-arch bg-brand-200 lg:block">
              <Image
                src="/images/womens-health.png"
                alt="Women sitting together in support and solidarity"
                fill
                sizes="(min-width: 1024px) 36vw, 90vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-brand-900/20 mix-blend-multiply"
              />
            </div>
          </div>

          {/* Accordion */}
          <ol className="border-t border-brand-200">
            {FAQS.map((faq, index) => (
              <li key={faq.question} className="border-b border-brand-200">
                <details
                  className="group relative isolate"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-start gap-5 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:gap-8 sm:py-7 [&::-webkit-details-marker]:hidden">
                    <span
                      aria-hidden
                      className="pt-1 font-heading text-xs font-bold tracking-[0.2em] text-brand-400 transition-colors group-open:text-brand-700"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-heading text-lg leading-snug font-bold tracking-tight text-brand-950 transition-colors group-hover:text-brand-700 sm:text-xl">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden
                      className="flex size-9 shrink-0 items-center justify-center border border-brand-200 text-brand-700 transition-colors duration-300 group-open:border-brand-700 group-open:bg-brand-700 group-open:text-white"
                    >
                      <Plus className="size-4 transition-transform duration-300 group-open:rotate-45" />
                    </span>
                  </summary>

                  <p className="-mt-1 max-w-2xl pr-14 pb-7 pl-10 text-base leading-relaxed text-pretty text-ink-700 sm:pl-14">
                    {faq.answer}
                  </p>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
