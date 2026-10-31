import { Container, Section } from "@/components/ds";
import { ShareStoryForm } from "@/components/share-your-story/story-form";

const CONTACT_EMAIL = "hello@purpleproject.org.za";

/**
 * "Share your story."
 *
 * The lavender band carrying the story form. The left column sets the tone —
 * one line of reassurance, and a direct email route for anyone who would rather
 * write separately — while the form itself sits in a white panel on the right.
 */
export function ShareStoryFormSection() {
  return (
    <Section
      id="story"
      tone="lavender"
      padding="none"
      className="scroll-mt-20"
    >
      <Container
        size="wide"
        className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16 lg:py-28"
      >
        <div>
          <h2 className="flex flex-col items-start font-heading text-display-md uppercase">
            <span className="block text-outline-2 text-brand-800">Share</span>
            <span className="mt-1 block font-display text-script-md normal-case italic text-brand-700 sm:mt-2">
              your story.
            </span>
          </h2>

          <p className="mt-8 max-w-md text-base leading-relaxed text-pretty text-brand-900/80">
            We&rsquo;ll read it with care, and we&rsquo;ll be in touch before
            anything is shared.
          </p>

          <p className="mt-6 text-sm leading-relaxed text-brand-900/70">
            Prefer to write separately? Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Share%20your%20story`}
              className="font-medium text-brand-700 underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>

        <div className="border border-brand-200 bg-white p-7 shadow-xs sm:p-10">
          <ShareStoryForm />
        </div>
      </Container>
    </Section>
  );
}
