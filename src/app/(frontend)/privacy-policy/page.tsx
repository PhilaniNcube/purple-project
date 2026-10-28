import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Purple Project collects, uses and protects personal information, in line with South Africa’s Protection of Personal Information Act.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="We only ask for what we need, and we treat it with care. This policy explains what information Purple Project collects, why we collect it and what you can ask us to do with it."
      updated="28 October 2026"
      sections={[
        {
          heading: "Who we are",
          paragraphs: [
            "Purple Project is a South African non-profit movement that raises awareness of gynaecological cancer through education, early detection and practical support.",
            "For the purposes of this policy, Purple Project is the responsible party for the personal information described below. You can reach us at hello@purpleproject.org.za.",
          ],
        },
        {
          heading: "Information we collect",
          paragraphs: [
            "Information you give us: your name, email address, message, story submission, volunteer or partnership enquiry, or any other detail you choose to send us by email, WhatsApp or a form on this site.",
            "Comments and likes: when you comment on a resource, we store the name, optional email address and comment you submit. When you like a resource, we set an anonymous visitor identifier cookie so the site can remember your like.",
            "Technical information: like most websites, our hosting provider may process basic request information such as your IP address, browser type and the pages you visit, in order to keep the site secure and working.",
          ],
        },
        {
          heading: "How we use information",
          paragraphs: [
            "We use your information to respond to your message, review a story or comment, arrange a donation, volunteer role or partnership, publish approved content, and keep the site secure.",
            "We do not sell your personal information, and we do not use it for advertising profiles.",
          ],
        },
        {
          heading: "Our legal basis",
          paragraphs: [
            "We process personal information in line with the Protection of Personal Information Act, 2013 (POPIA). Depending on the context, we rely on your consent, the need to respond to a request you have made, our legitimate interest in running the movement, or a legal obligation.",
            "Where we rely on consent — for example, to publish a story — you may withdraw it at any time.",
          ],
        },
        {
          heading: "Sharing information",
          paragraphs: [
            "We share information only with service providers who help us run the site and our work (for example, hosting and email providers), and only to the extent they need it. They are expected to protect it and to use it only for the service they provide.",
            "We may also disclose information if the law requires it, or to protect the rights and safety of people using the site.",
          ],
        },
        {
          heading: "How long we keep it",
          paragraphs: [
            "We keep personal information only for as long as we need it for the purpose it was collected, or as long as the law requires. Story submissions that are not published are deleted when they are no longer needed. Comments may remain published unless you ask us to remove them.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Under POPIA you may ask to access the personal information we hold about you, ask us to correct or delete it, object to certain processing, or withdraw consent. You may also complain to the Information Regulator of South Africa.",
            "To make a request, email hello@purpleproject.org.za. We may need to verify your identity before we act on it.",
          ],
        },
        {
          heading: "Security",
          paragraphs: [
            "We take reasonable technical and organisational steps to protect personal information against loss, misuse and unauthorised access. No website or email system can be completely secure, so please do not send sensitive medical records through a general contact form.",
          ],
        },
        {
          heading: "Children",
          paragraphs: [
            "Our site is intended for a general audience. We do not knowingly collect personal information from children without the consent of a parent or guardian. If you believe a child has sent us information, contact us and we will remove it.",
          ],
        },
        {
          heading: "Changes to this policy",
          paragraphs: [
            "We may update this policy from time to time. The date at the top of the page shows when it was last changed. Please check back if you want to see the current version.",
          ],
        },
        {
          heading: "Contact us",
          paragraphs: [
            "Questions about this policy or your information can be sent to hello@purpleproject.org.za.",
          ],
        },
      ]}
    />
  );
}
