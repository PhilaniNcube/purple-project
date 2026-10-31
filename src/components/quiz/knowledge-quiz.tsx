"use client";

import * as React from "react";
import Link from "next/link";
import { Check, RotateCcw, Share2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "cn";

type Question = {
  prompt: string;
  options: string[];
  /** Index into `options`. */
  answer: number;
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    prompt: "How many gynaecological cancers are there?",
    options: ["Two", "Five", "Eight"],
    answer: 1,
    explanation:
      "Cervical, ovarian, uterine, vaginal and vulval. Most people only hear about one.",
  },
  {
    prompt: "What causes nearly all cervical cancers?",
    options: [
      "A bacterial infection",
      "HPV (human papillomavirus)",
      "A vitamin deficiency",
    ],
    answer: 1,
    explanation:
      "HPV is behind nearly all cervical cancer cases, and a vaccine helps protect against it.",
  },
  {
    prompt: "Who does South Africa’s school programme offer the HPV vaccine to?",
    options: ["Girls aged 9 to 15", "Women over 30", "Boys only"],
    answer: 0,
    explanation:
      "The programme reaches more than 1.5 million girls every year, and the country plans to extend vaccination to boys when feasible.",
  },
  {
    prompt:
      "How many doses does South Africa’s HPV vaccine schedule need now?",
    options: ["One", "Two", "Three"],
    answer: 0,
    explanation:
      "South Africa has adopted the single-dose schedule recommended by the WHO.",
  },
  {
    prompt: "Which of these is worth getting checked?",
    options: [
      "Unusual vaginal bleeding or discharge",
      "Bleeding after menopause",
      "Lower abdominal pain or bloating that won’t go away",
      "All of the above",
    ],
    answer: 3,
    explanation:
      "Any of these can need urgent attention. If something feels off, ask.",
  },
  {
    prompt:
      "How much higher is the risk of cervical cancer for women living with HIV?",
    options: ["About the same", "Double", "Around six times higher"],
    answer: 2,
    explanation: "That’s why regular screening matters so much.",
  },
  {
    prompt:
      "What is becoming South Africa’s main screening test for cervical cancer?",
    options: ["A Pap smear only", "An HPV DNA test", "A blood test"],
    answer: 1,
    explanation:
      "HPV is behind nearly all cervical cancer, so South Africa is moving to HPV DNA testing as the main way to screen.",
  },
];

function resultFor(score: number, total: number) {
  return score === total
    ? "You know your stuff. Now share the quiz with someone who needs to hear it."
    : "Now you know more than you did a minute ago. Share what you learned with someone you love.";
}

const optionBase =
  "flex w-full items-start gap-3 border px-4 py-3.5 text-left text-sm leading-relaxed transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50";

export function KnowledgeQuiz() {
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [score, setScore] = React.useState(0);
  const [finished, setFinished] = React.useState(false);
  const [shareMessage, setShareMessage] = React.useState("");

  const question = QUESTIONS[index];
  const answered = selected !== null;
  const isLast = index === QUESTIONS.length - 1;

  function choose(option: number) {
    if (answered) return;
    setSelected(option);
    if (option === question.answer) setScore((value) => value + 1);
  }

  function next() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShareMessage("");
  }

  async function shareQuiz() {
    const url = window.location.href;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "Purple Project quiz",
          text: "Seven quick questions, no judgement. Find out what you know, and what’s worth knowing.",
          url,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setShareMessage("Link copied. Share it with someone who needs it.");
    } catch {
      setShareMessage("Copy this page’s address to share the quiz.");
    }
  }

  if (finished) {
    return (
      <div className="border border-brand-200 bg-white p-7 sm:p-12">
        <h2 className="sr-only">Your result</h2>

        <p className="font-heading text-display-lg text-brand-950">
          {score}
          <span className="text-brand-300"> / {QUESTIONS.length}</span>
        </p>

        <p className="mt-4 max-w-xl text-lg leading-snug font-semibold text-brand-900/85 text-pretty sm:text-xl">
          {resultFor(score, QUESTIONS.length)}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button type="button" variant="brand" size="cta" onClick={shareQuiz}>
            <Share2 aria-hidden />
            Share this quiz
          </Button>

          <Button
            variant="brand-outline"
            size="cta"
            nativeButton={false}
            render={<Link href="/get-the-facts" />}
          >
            Get the facts
          </Button>
        </div>

        {shareMessage ? (
          <p
            role="status"
            className="mt-4 border-l-2 border-primary bg-lavender px-4 py-3 text-sm leading-relaxed text-brand-900/80"
          >
            {shareMessage}
          </p>
        ) : null}

        <div className="mt-8 border-t border-brand-200 pt-5">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={restart}
            className="px-0 text-brand-700 hover:bg-transparent hover:text-brand-800"
          >
            <RotateCcw aria-hidden />
            Take it again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-brand-200 bg-white p-7 sm:p-10 lg:p-12">
      <div className="flex items-center justify-between gap-4">
        <p className="font-heading text-sm font-bold text-brand-700">
          Question {index + 1} of {QUESTIONS.length}
        </p>
      </div>

      <div
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={1}
        aria-valuemax={QUESTIONS.length}
        aria-valuenow={index + 1}
        className="mt-3 h-1 w-full overflow-hidden bg-brand-100"
      >
        <div
          className="h-full bg-primary transition-[width] duration-300 ease-brand"
          style={{ width: `${((index + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <h2
        id="quiz-question"
        className="mt-8 font-heading text-2xl font-bold tracking-tight text-brand-950 text-balance sm:text-3xl"
      >
        {question.prompt}
      </h2>

      <div
        role="group"
        aria-labelledby="quiz-question"
        className="mt-7 grid gap-3"
      >
        {question.options.map((option, optionIndex) => {
          const isAnswer = optionIndex === question.answer;
          const isSelected = optionIndex === selected;

          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(optionIndex)}
              disabled={answered}
              aria-pressed={isSelected}
              className={cn(
                optionBase,
                answered
                  ? isAnswer
                    ? "border-primary bg-primary/10 text-brand-900"
                    : isSelected
                      ? "border-destructive/50 bg-destructive/5 text-muted-foreground"
                      : "border-border bg-white text-muted-foreground"
                  : "border-border bg-white text-foreground hover:border-primary/50 hover:bg-brand-50/60",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center border text-[0.65rem] font-bold",
                  answered && isAnswer
                    ? "border-primary bg-primary text-white"
                    : answered && isSelected
                      ? "border-destructive text-destructive"
                      : "border-border text-muted-foreground",
                )}
              >
                {answered && isAnswer ? (
                  <Check className="size-3.5" />
                ) : answered && isSelected ? (
                  <X className="size-3.5" />
                ) : (
                  String.fromCharCode(65 + optionIndex)
                )}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="min-h-20">
        {answered ? (
          <div className="mt-6 border-l-2 border-primary bg-lavender px-4 py-3 text-sm leading-relaxed text-brand-900/80">
            <span className="font-heading text-xs font-bold text-brand-700">
              {selected === question.answer ? "Correct" : "Not quite"}
            </span>
            <p className="mt-1.5">{question.explanation}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex items-center justify-end">
        <Button
          type="button"
          variant="brand"
          size="cta"
          onClick={next}
          disabled={!answered}
        >
          {isLast ? "See my result" : "Next question"}
        </Button>
      </div>
    </div>
  );
}
