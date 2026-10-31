import { Container, Section } from "@/components/ds";
import { VolunteerSignUpForm } from "@/components/volunteer/sign-up-form";

const CONTACT_EMAIL = "hello@purpleproject.org.za";

/**
 * "Sign me up."
 *
 * The closing band: a lavender ground carrying the two-voice heading and one
 * sentence of guidance on the left, with the sign-up form set in a white panel
 * on the right. The split follows the Pledge Form on the Donate page, keeping
 * the form itself quiet and easy to scan.
 */
export function VolunteerSignUp() {
  return (
    <Section
      id="sign-up"
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
            <span className="block text-outline-2 text-brand-800">Sign</span>
            <span className="mt-1 block font-display text-script-md normal-case italic text-brand-700 sm:mt-2">
              me up.
            </span>
          </h2>

          <p className="mt-8 max-w-md text-base leading-relaxed text-pretty text-brand-900/80">
            Tell us how you&rsquo;d like to help, and we&rsquo;ll be in touch
            soon to find the right fit.
          </p>

          <p className="mt-6 text-sm leading-relaxed text-brand-900/70">
            Prefer email? Write to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=I%27d%20like%20to%20volunteer`}
              className="font-medium text-brand-700 underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>

        <div className="border border-brand-200 bg-white p-7 shadow-xs sm:p-10">
          <VolunteerSignUpForm />
        </div>
      </Container>
    </Section>
  );
}
