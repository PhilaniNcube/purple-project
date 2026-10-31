import { Container, Section } from "@/components/ds";
import { PartnerEnquiryForm } from "@/components/partner-with-us/enquiry-form";

const CONTACT_EMAIL = "hello@purpleproject.org.za";

/**
 * "Send an enquiry."
 *
 * The closing band on the partner page: the lavender ground carries the
 * two-voice heading and the guidance on the left, with the enquiry form set in
 * a white panel on the right. The split follows the volunteer and pledge forms.
 */
export function PartnerEnquiry() {
  return (
    <Section
      id="enquiry"
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
            <span className="block text-outline-2 text-brand-800">Send</span>
            <span className="mt-1 block font-display text-script-md normal-case italic text-brand-700 sm:mt-2">
              an enquiry.
            </span>
          </h2>

          <p className="mt-8 max-w-md text-base leading-relaxed text-pretty text-brand-900/80">
            Tell us a little about your organisation and how you&rsquo;d like
            to partner. We&rsquo;ll be in touch shortly to talk through the
            possibilities.
          </p>

          <p className="mt-6 text-sm leading-relaxed text-brand-900/70">
            Prefer email? Write to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Partnership%20with%20Purple%20Project`}
              className="font-medium text-brand-700 underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>

        <div className="border border-brand-200 bg-white p-7 shadow-xs sm:p-10">
          <PartnerEnquiryForm />
        </div>
      </Container>
    </Section>
  );
}
