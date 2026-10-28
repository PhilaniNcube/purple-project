import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The terms that apply when you use the Purple Project website and its resources.",
};

export default function TermsOfUsePage() {
  return (
    <LegalPage
      title="Terms of use"
      intro="These terms apply when you visit or use the Purple Project website. By using the site, you agree to them."
      updated="28 October 2026"
      sections={[
        {
          heading: "About these terms",
          paragraphs: [
            "This website is operated by Purple Project, a South African non-profit movement. If you have a question about these terms, email hello@purpleproject.org.za.",
          ],
        },
        {
          heading: "Educational information, not medical advice",
          paragraphs: [
            "The content on this site — including articles, resources, quizzes and answers to common questions — is for general education and awareness. It is not medical advice, diagnosis or treatment.",
            "Always speak to a qualified healthcare professional about your own health or the health of someone you care for. Never delay seeking medical help because of something you read here. If you have severe pain, heavy bleeding or another urgent symptom, seek emergency care.",
          ],
        },
        {
          heading: "Using the site",
          paragraphs: [
            "You may use the site for lawful, personal and non-commercial purposes. You may share links to our pages and resources for awareness purposes.",
            "You may not attempt to disrupt the site, gain unauthorised access to it, scrape it at scale, upload malicious code, impersonate someone else, or use it to send spam or unlawful content.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The Purple Project name, logo, design and original written content are owned by or licensed to Purple Project. You may not reproduce them for commercial use without our written permission.",
            "You may quote short excerpts with clear attribution and a link back to the original page. Partner logos remain the property of their respective organisations.",
          ],
        },
        {
          heading: "Comments, stories and other submissions",
          paragraphs: [
            "If you submit a comment, story or other content, you confirm that it is yours to share and that it does not infringe anyone else’s rights. You give us permission to review, edit for length or clarity, and publish it — but only after the consent process described on the relevant page.",
            "We may decline or remove content that is abusive, misleading, unlawful, identifies someone without consent, or gives specific medical advice. We are not obliged to publish every submission.",
          ],
        },
        {
          heading: "Third-party links",
          paragraphs: [
            "The site may link to other organisations, research or resources. Those sites are not under our control, and a link does not mean we endorse everything on them. Check their terms and privacy policies before using them.",
          ],
        },
        {
          heading: "Availability",
          paragraphs: [
            "We try to keep the site accurate and available, but we do not promise that it will always be online, error-free or complete. We may change, suspend or remove parts of the site without notice.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "To the extent allowed by South African law, Purple Project is not liable for loss or damage arising from your use of the site, reliance on its general information, or any interruption or technical problem. Nothing in these terms limits rights you cannot legally waive.",
          ],
        },
        {
          heading: "Privacy",
          paragraphs: [
            "Our privacy policy explains how we handle personal information. It forms part of these terms.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "We may update these terms from time to time. The date at the top of the page shows the latest version. Continued use of the site after a change means you accept the updated terms.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of the Republic of South Africa. Any dispute will be dealt with by a court with jurisdiction in South Africa.",
          ],
        },
      ]}
    />
  );
}
