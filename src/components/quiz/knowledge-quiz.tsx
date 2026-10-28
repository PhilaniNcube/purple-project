"use client";

import * as React from "react";
import Link from "next/link";
import { Check, RotateCcw, X } from "lucide-react";

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
    prompt: "Which virus causes most cervical cancers?",
    options: [
      "Human papillomavirus (HPV)",
      "Herpes simplex virus",
      "HIV",
      "Epstein–Barr virus",
    ],
    answer: 0,
    explanation:
      "Persistent infection with high-risk types of HPV causes almost all cervical cancers. The HPV vaccine protects against the types responsible for most cases.",
  },
  {
    prompt: "What is the strongest way to lower your risk of cervical cancer?",
    options: [
      "Avoiding all sugar",
      "HPV vaccination and regular screening",
      "Only having check-ups when something hurts",
      "Taking antibiotics every year",
    ],
    answer: 1,
    explanation:
      "HPV vaccination and regular cervical screening work together: the vaccine prevents most HPV infections, and screening finds changes early, before they become cancer.",
  },
  {
    prompt: "Which of these is a warning sign worth checking?",
    options: [
      "Bleeding between periods or after sex",
      "A headache that goes away",
      "Occasional sneezing",
      "Feeling tired after exercise",
    ],
    answer: 0,
    explanation:
      "Unusual bleeding — between periods, after sex or after menopause — is one of the most important signs to raise with a healthcare professional.",
  },
  {
    prompt: "True or false: cervical cancer is one of the most preventable cancers.",
    options: ["True", "False"],
    answer: 0,
    explanation:
      "It is. Vaccination against HPV and regular screening can prevent most cervical cancers, which is why awareness and access to care matter so much.",
  },
  {
    prompt: "What does a Pap smear mainly screen for?",
    options: [
      "Every gynaecological cancer",
      "Cervical cancer and pre-cancerous changes",
      "Ovarian cancer only",
      "Infertility",
    ],
    answer: 1,
    explanation:
      "A Pap smear looks for abnormal cells on the cervix. It does not screen for ovarian, uterine, vulvar or vaginal cancer, so symptoms elsewhere still need a conversation with a clinician.",
  },
  {
    prompt: "Which of these is NOT a risk factor for gynaecological cancer?",
    options: [
      "Smoking",
      "A family history of some cancers",
      "Regular cervical screening",
      "Persistent HPV infection",
    ],
    answer: 2,
    explanation:
      "Regular screening is protective — it helps find changes early. Smoking, HPV infection and some family histories can raise risk.",
  },
  {
    prompt: "Can gynaecological cancers affect people of any age?",
    options: [
      "Yes, though risk generally rises with age",
      "No, only people over 60",
      "No, only people who have had children",
      "Only people with a family history",
    ],
    answer: 0,
    explanation:
      "Gynaecological cancers can occur at any age. Risk generally increases with age, but knowing your body and acting on changes matters at every stage of life.",
  },
  {
    prompt: "You notice a change that lasts more than a few weeks. What is the best next step?",
    options: [
      "Wait a year and see what happens",
      "Search for a diagnosis online and self-treat",
      "Speak to a healthcare professional",
      "Assume it will pass because you feel fine",
    ],
    answer: 2,
    explanation:
      "Most changes will not turn out to be cancer, but they deserve a proper conversation. You know your body best — it is always okay to ask.",
  },
];

function resultFor(score: number, total: number) {
  const share = score / total;

  if (share === 1) {
    return {
      title: "Fact champion",
      body: "You know the signs, the prevention and the next step. Share this quiz with someone who could use it.",
    };
  }
  if (share >= 0.6) {
    return {
      title: "Strong start",
      body: "You have a solid grasp of the basics. A few small facts could make a real difference — have a look at what you missed.",
    };
  }
  return {
    title: "There is more to learn",
    body: "That is exactly why we are here. The facts are simple, and knowing them could help you or someone you love.",
  };
}

const optionBase =
  "flex w-full items-start gap-3 border px-4 py-3.5 text-left text-sm leading-relaxed transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50";

export function KnowledgeQuiz() {
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [score, setScore] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

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
  }

  if (finished) {
    const result = resultFor(score, QUESTIONS.length);

    return (
      <div className="border border-brand-200 bg-white p-7 sm:p-12">
        <p className="font-heading text-[0.7rem] font-semibold tracking-[0.18em] text-brand-700 uppercase">
          Your result
        </p>
        <p className="mt-6 font-heading text-display-md text-brand-950">
          {score}
          <span className="text-brand-400"> / {QUESTIONS.length}</span>
        </p>
        <h2 className="mt-2 font-display text-script-md text-brand-700 italic">
          {result.title}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          {result.body}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button type="button" variant="brand" size="cta" onClick={restart}>
            <RotateCcw aria-hidden />
            Take it again
          </Button>
          <Button
            variant="brand-outline"
            size="cta"
            nativeButton={false}
            render={<Link href="/get-the-facts" />}
          >
            Read the facts
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-brand-200 bg-white p-7 sm:p-12">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4">
        <p className="font-heading text-[0.7rem] font-semibold tracking-[0.18em] text-brand-700 uppercase">
          Question {index + 1} of {QUESTIONS.length}
        </p>
        <p className="text-xs font-medium text-muted-foreground">
          {score} correct
        </p>
      </div>
      <div
        aria-hidden
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

      <div role="group" aria-labelledby="quiz-question" className="mt-7 grid gap-3">
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
            <span className="font-heading text-[0.65rem] font-bold tracking-[0.16em] text-brand-700 uppercase">
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
