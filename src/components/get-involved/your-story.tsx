import Image from "next/image";
import Link from "next/link";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * "Your story matters."
 *
 * The invitation to share. A portrait of two women — braided hair, green face
 * paint against black — is set in a full circle on the left, so the section
 * opens with faces rather than with type.
 *
 * The copy answers it on the right: the stroke-only "YOUR STORY" over the
 * italic serif "matters", a bold italic pull quote naming who the invitation is
 * for, the reassurance about permission and anonymity in plain body copy, and
 * the outlined call to action.
 */
export function YourStory() {
  return (
    <Section
      id="your-story"
      tone="light"
      padding="none"
      className="bg-mist"
    >
      <Container size="wide" className="py-20 sm:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Circular portrait */}
          <div className="relative mx-auto aspect-square w-full max-w-[34rem] overflow-hidden rounded-full lg:mx-0">
            <Image
              src="/images/faces.webp"
              alt="Two women with braided hair and green face paint, photographed against a dark background"
              fill
              sizes="(min-width: 1024px) 40vw, 88vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="font-heading text-display-sm uppercase">
              <span className="block text-outline-2">Your story</span>
              <span className="block font-display normal-case italic">
                matters
              </span>
            </h2>

            <p className="mt-8 max-w-md font-display text-xl leading-snug font-bold italic text-pretty text-foreground">
              For the patient, survivor, caregiver or someone who has lost a
              loved one, your story can help another woman speak up sooner.
            </p>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-pretty text-ink-700">
              Share as much or as little as you like. You choose whether your
              name is used, and we&rsquo;ll only share your story with your
              permission.
            </p>

            <Button
              variant="brand-outline"
              size="lg"
              nativeButton={false}
              className="mt-8 border-brand-500 px-5 text-brand-600 hover:border-brand-600 hover:bg-brand-500/10 hover:text-brand-700"
              render={<Link href="/share-your-story" />}
            >
              Share your story
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
