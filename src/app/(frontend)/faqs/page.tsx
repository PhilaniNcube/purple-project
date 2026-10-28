import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Container, Display, Eyebrow, Script, Section } from "@/components/ds";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to common questions about Purple Project, gynaecological cancer information, donations, volunteering and sharing your story.",
};

const GROUPS = [
  {
    heading: "About Purple Project",
    questions: [
      {
        question: "What is Purple Project?",
        answer:
          "Purple Project is a South African movement founded in 2022. We break the silence around gynaecological cancer through education, early detection and practical support. What began as a sanitary drive for women in cancer care has grown into school talks, community workshops, resources and advocacy.",
      },
      {
        question: "Who do you help?",
        answer:
          "Anyone who needs clear information about women’s health, and anyone supporting someone through a gynaecological cancer diagnosis. Our work is especially focused on reaching young people, patients and communities where conversations about these cancers are still rare.",
      },
      {
        question: "Do you provide medical advice?",
        answer:
          "No. Everything we publish is educational. We do not diagnose, treat or replace a healthcare professional. If you are worried about a symptom, please make an appointment with a doctor or clinic.",
      },
    ],
  },
  {
    heading: "Support and information",
    questions: [
      {
        question: "What are the warning signs of gynaecological cancer?",
        answer:
          "Signs can include unusual bleeding between periods, after sex or after menopause; unusual discharge; persistent pelvic or abdominal pain; bloating that does not go away; a lump or sore on the vulva; pain or bleeding when urinating; and unexplained weight loss or tiredness. Most changes will not be cancer, but they deserve a conversation.",
      },
      {
        question: "I am worried about a symptom. What should I do?",
        answer:
          "Speak to a healthcare professional. You do not need to wait for a screening appointment to ask a question, and it is okay to ask for a second opinion. If you have severe pain or heavy bleeding, seek urgent medical care.",
      },
      {
        question: "Can gynaecological cancer be prevented?",
        answer:
          "Some cancers, especially cervical cancer, can be prevented or found early through HPV vaccination and regular screening. Not all gynaecological cancers have a screening test, which is why knowing your body and acting on persistent changes matters.",
      },
      {
        question: "Do you offer counselling or support groups?",
        answer:
          "We do not currently run a counselling service. We can point you towards trusted resources and organisations, and we would always encourage you to speak to your medical team about the support available to you.",
      },
    ],
  },
  {
    heading: "Giving and getting involved",
    questions: [
      {
        question: "How can I donate?",
        answer:
          "Email hello@purpleproject.org.za with the subject “I’d like to donate” and we will send the current banking details and a receipt. You can also give supplies for dignity packs or offer an in-kind service.",
      },
      {
        question: "Can I volunteer if I do not have a health background?",
        answer:
          "Yes. Volunteers help with events, school talks, social media, admin, packing and professional skills. You will receive an introduction to the work and the materials you need. Tell us what you enjoy doing and how much time you have.",
      },
      {
        question: "Can my business or school partner with you?",
        answer:
          "Absolutely. We work with businesses, schools, clinics, media platforms and funders. Partnerships can be a workshop, an awareness day, employee volunteering, donated media or a programme partnership. Email us with a short note about what you have in mind.",
      },
      {
        question: "How do I share my story?",
        answer:
          "Use the share your story page to send us a few sentences. You can choose to stay anonymous, you can approve the final edit, and you can withdraw your story at any time. Nothing is published without your consent.",
      },
    ],
  },
];

export default function FaqsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        eyebrow="FAQs"
        title="Questions,"
        accent="answered."
        description="A few things people ask us most often. If your question is not here, send us a message — we would rather answer it than leave you guessing."
        tone="lavender"
      >
        <Button
          variant="brand"
          size="cta"
          nativeButton={false}
          render={<Link href="/contact" />}
        >
          Ask us directly
        </Button>
      </PageHero>

      <Section tone="light">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
            <div>
              <Eyebrow rule className="text-primary">
                Common questions
              </Eyebrow>
              <h2 className="mt-5 flex flex-col items-start">
                <Display as="span" size="sm" className="text-brand-950">
                  Start
                </Display>
                <Script size="sm" className="text-brand-700">
                  here.
                </Script>
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
                These answers are a starting point, not a substitute for medical
                advice. For anything personal, speak to a healthcare
                professional.
              </p>
            </div>

            <div className="space-y-12">
              {GROUPS.map((group) => (
                <section key={group.heading}>
                  <h2 className="font-heading text-[0.7rem] font-bold tracking-[0.18em] text-brand-700 uppercase">
                    {group.heading}
                  </h2>
                  <div className="mt-4 divide-y divide-border border-y border-border">
                    {group.questions.map((item) => (
                      <details key={item.question} className="group py-1">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 text-left font-heading text-base font-bold tracking-tight text-brand-950 transition-colors outline-none hover:text-brand-700 focus-visible:text-brand-700 [&::-webkit-details-marker]:hidden">
                          {item.question}
                          <Plus
                            aria-hidden
                            className="mt-0.5 size-4 shrink-0 text-brand-700 transition-transform duration-200 group-open:rotate-45"
                          />
                        </summary>
                        <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                          {item.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="lavender" padding="none">
        <Container size="wide" className="py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-brand-900/75">
              Still stuck? We would rather hear from you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="brand"
                size="cta"
                nativeButton={false}
                render={<Link href="/contact" />}
              >
                Contact us
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
          </div>
        </Container>
      </Section>
    </main>
  );
}
