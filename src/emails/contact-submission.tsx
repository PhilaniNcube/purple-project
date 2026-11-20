import * as React from "react";

import {
  DetailRow,
  EmailLayout,
  MessageBox,
} from "@/emails/components/email-layout";

export type ContactSubmissionEmailProps = {
  name: string;
  email: string;
  role: string;
  message: string;
  submittedAt: string;
};

export function ContactSubmissionEmail({
  name,
  email,
  role,
  message,
  submittedAt,
}: ContactSubmissionEmailProps) {
  return (
    <EmailLayout
      preview={`New contact enquiry from ${name} (${role})`}
      category="Contact enquiry"
      headingLead="New"
      headingAccent="message."
      submittedAt={submittedAt}
      replyToName={name}
      replyToEmail={email}
    >
      <DetailRow label="Name" value={name} />
      <DetailRow label="Email" value={email} href={`mailto:${email}`} />
      <DetailRow label="Getting in touch as" value={role} />
      <DetailRow
        label="Consent"
        value="Agreed to Purple Project contacting them about this message"
      />
      <MessageBox label="Message" body={message} />
    </EmailLayout>
  );
}

export default ContactSubmissionEmail;
