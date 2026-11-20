import * as React from "react";

import {
  BadgeList,
  DetailRow,
  EmailLayout,
  MessageBox,
  NoticeBox,
} from "@/emails/components/email-layout";

export type StorySubmissionEmailProps = {
  name?: string;
  email: string;
  credit: string;
  story: string;
  attachmentNames: string[];
  submittedAt: string;
};

export function StorySubmissionEmail({
  name,
  email,
  credit,
  story,
  attachmentNames,
  submittedAt,
}: StorySubmissionEmailProps) {
  const displayName = name?.trim() || "Not provided";
  const isAnonymous = credit === "Keep me anonymous";

  return (
    <EmailLayout
      preview={`New story submission${name ? ` from ${name}` : " (anonymous preference)"}`}
      category="Story submission"
      headingLead="Shared"
      headingAccent="story."
      submittedAt={submittedAt}
      replyToName={name?.trim() || undefined}
      replyToEmail={email}
    >
      {isAnonymous ? (
        <NoticeBox
          title="Anonymity requested"
          body="The contributor asked to stay anonymous if any part of this story is shared."
        />
      ) : null}

      <DetailRow label="Name" value={displayName} />
      <DetailRow label="Email" value={email} href={`mailto:${email}`} />
      <DetailRow label="How may we use it?" value={credit} />

      {attachmentNames.length > 0 ? (
        <BadgeList label="Attached photos" items={attachmentNames} />
      ) : (
        <DetailRow label="Attached photos" value="None" />
      )}

      <MessageBox label="Their story" body={story} />
    </EmailLayout>
  );
}

export default StorySubmissionEmail;
