import type { ReactElement } from "react";
import { render, toPlainText } from "react-email";
import { Resend } from "resend";

import { DESK_EMAIL } from "@/lib/contact";

export const DEFAULT_FROM_EMAIL = `Purple Project <${DESK_EMAIL}>`;

export type EmailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

let cachedClient: Resend | null = null;

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!cachedClient) {
    cachedClient = new Resend(apiKey);
  }

  return cachedClient;
}

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Formats a submission timestamp in South Africa Standard Time. */
export function formatSubmittedAt(date = new Date()): string {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Africa/Johannesburg",
  }).format(date);

  return `${formatted} SAST`;
}

/**
 * Renders a React Email template to HTML + plain text and sends it via Resend.
 */
export async function sendFormEmail({
  subject,
  replyTo,
  react,
  attachments,
}: {
  subject: string;
  replyTo: string;
  react: ReactElement;
  attachments?: EmailAttachment[];
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const resend = getResendClient();
    const html = await render(react);
    const text = toPlainText(html);

    const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;
    const to = process.env.RESEND_TO_EMAIL?.trim() || DESK_EMAIL;

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: sanitizeHeaderValue(replyTo),
      subject: sanitizeHeaderValue(subject),
      html,
      text,
      ...(attachments?.length ? { attachments } : {}),
    });

    if (error) {
      console.error("[email] Resend rejected form email:", error);
      return {
        ok: false,
        error:
          "We couldn’t send your submission right now. Please try again or email us directly.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("[email] Failed to send form email:", err);
    return {
      ok: false,
      error:
        "We couldn’t send your submission right now. Please try again or email us directly.",
    };
  }
}
