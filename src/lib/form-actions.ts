"use server";

import { createElement } from "react";

import ContactSubmissionEmail from "@/emails/contact-submission";
import PartnerSubmissionEmail from "@/emails/partner-submission";
import PledgeSubmissionEmail from "@/emails/pledge-submission";
import StorySubmissionEmail from "@/emails/story-submission";
import VolunteerSubmissionEmail from "@/emails/volunteer-submission";
import {
  formatSubmittedAt,
  sendFormEmail,
  type EmailAttachment,
} from "@/lib/email";
import {
  CONTACT_ROLES,
  HANDOVER_OPTIONS,
  PARTNERSHIP_TYPES,
  PLEDGE_ITEMS,
  STORY_ALLOWED_IMAGE_TYPES,
  STORY_CREDIT_OPTIONS,
  STORY_MAX_PHOTOS,
  STORY_MAX_PHOTO_BYTES,
  STORY_MAX_TOTAL_BYTES,
  VOLUNTEER_WAYS,
  type FormSubmissionState,
} from "@/lib/form-state";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: string): boolean {
  return (
    value.length > 0 &&
    value.length <= 254 &&
    !value.includes("\r") &&
    !value.includes("\n") &&
    EMAIL_PATTERN.test(value)
  );
}

function isHoneypotTriggered(formData: FormData): boolean {
  return String(formData.get("website") ?? "").trim().length > 0;
}

function pickAllowedValues(
  rawValues: FormDataEntryValue[],
  allowed: readonly string[],
): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const entry of rawValues) {
    const value = String(entry).trim();
    if (allowed.includes(value) && !seen.has(value)) {
      seen.add(value);
      result.push(value);
    }
  }

  return result;
}

function sanitizeFilename(name: string, index: number): string {
  const base = name
    .replace(/.*[\\/]/, "")
    .replace(/[\x00-\x1f\x7f<>:"|?*]+/g, "-")
    .trim();

  if (!base) {
    return `photo-${index + 1}`;
  }

  if (base.length <= 120) {
    return base;
  }

  const lastDot = base.lastIndexOf(".");
  if (lastDot > 0 && base.length - lastDot <= 12) {
    const ext = base.slice(lastDot);
    return `${base.slice(0, 120 - ext.length)}${ext}`;
  }

  return base.slice(0, 120);
}

export async function submitContactForm(
  formData: FormData,
): Promise<FormSubmissionState> {
  if (isHoneypotTriggered(formData)) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const consent = formData.get("consent");

  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "That name is too long.";

  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!(CONTACT_ROLES as readonly string[]).includes(role)) {
    errors.role = "Please let us know who you are getting in touch as.";
  }

  if (message.length < 2) errors.message = "Please enter your message.";
  else if (message.length > 3000) {
    errors.message = "Messages are limited to 3,000 characters.";
  }

  if (consent !== "on" && consent !== "true") {
    errors.consent = "Please confirm we may contact you about your message.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors,
    };
  }

  const result = await sendFormEmail({
    subject: `Website enquiry — ${role} — ${name}`,
    replyTo: email,
    react: createElement(ContactSubmissionEmail, {
      name,
      email,
      role,
      message,
      submittedAt: formatSubmittedAt(),
    }),
  });

  if (!result.ok) {
    return { status: "error", message: result.error };
  }

  return { status: "success" };
}

export async function submitPledgeForm(
  formData: FormData,
): Promise<FormSubmissionState> {
  if (isHoneypotTriggered(formData)) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const items = pickAllowedValues(formData.getAll("items"), PLEDGE_ITEMS);
  const quantity = String(formData.get("quantity") ?? "").trim();
  const handover = String(formData.get("handover") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "That name is too long.";

  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (phone.length < 5) errors.phone = "Please enter a phone number.";
  else if (phone.length > 40) errors.phone = "That phone number is too long.";

  if (items.length === 0) {
    errors.items = "Please select at least one item you would like to give.";
  }

  if (quantity.length < 1) {
    errors.quantity = "Please let us know roughly how much you plan to give.";
  } else if (quantity.length > 200) {
    errors.quantity = "Please keep the quantity description under 200 characters.";
  }

  if (!(HANDOVER_OPTIONS as readonly string[]).includes(handover)) {
    errors.handover = "Please choose a hand-over option.";
  }

  if (message.length > 2000) {
    errors.message = "Messages are limited to 2,000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors,
    };
  }

  const result = await sendFormEmail({
    subject: `In-kind pledge — ${name}`,
    replyTo: email,
    react: createElement(PledgeSubmissionEmail, {
      name,
      email,
      phone,
      items,
      quantity,
      handover,
      message: message || undefined,
      submittedAt: formatSubmittedAt(),
    }),
  });

  if (!result.ok) {
    return { status: "error", message: result.error };
  }

  return { status: "success" };
}

export async function submitVolunteerForm(
  formData: FormData,
): Promise<FormSubmissionState> {
  if (isHoneypotTriggered(formData)) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const ways = pickAllowedValues(formData.getAll("ways"), VOLUNTEER_WAYS);
  const about = String(formData.get("about") ?? "").trim();

  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "That name is too long.";

  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (phone.length < 5) errors.phone = "Please enter a phone number.";
  else if (phone.length > 40) errors.phone = "That phone number is too long.";

  if (ways.length === 0) {
    errors.ways = "Please select at least one way you would like to help.";
  }

  if (about.length > 1500) {
    errors.about = "Please keep this under 1,500 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors,
    };
  }

  const result = await sendFormEmail({
    subject: `Volunteer sign-up — ${name}`,
    replyTo: email,
    react: createElement(VolunteerSubmissionEmail, {
      name,
      email,
      phone,
      ways,
      about: about || undefined,
      submittedAt: formatSubmittedAt(),
    }),
  });

  if (!result.ok) {
    return { status: "error", message: result.error };
  }

  return { status: "success" };
}

export async function submitPartnerForm(
  formData: FormData,
): Promise<FormSubmissionState> {
  if (isHoneypotTriggered(formData)) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const organisation = String(formData.get("organisation") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const partnershipTypes = pickAllowedValues(
    formData.getAll("partnership"),
    PARTNERSHIP_TYPES,
  );
  const message = String(formData.get("message") ?? "").trim();

  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "That name is too long.";

  if (organisation.length < 2) {
    errors.organisation = "Please enter your organisation’s name.";
  } else if (organisation.length > 160) {
    errors.organisation = "That organisation name is too long.";
  }

  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (phone.length < 5) errors.phone = "Please enter a phone number.";
  else if (phone.length > 40) errors.phone = "That phone number is too long.";

  if (partnershipTypes.length === 0) {
    errors.partnership =
      "Please select at least one way you would like to partner.";
  }

  if (message.length < 2) errors.message = "Please tell us a little more.";
  else if (message.length > 2000) {
    errors.message = "Messages are limited to 2,000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors,
    };
  }

  const result = await sendFormEmail({
    subject: `Partnership enquiry — ${organisation}`,
    replyTo: email,
    react: createElement(PartnerSubmissionEmail, {
      name,
      organisation,
      email,
      phone,
      partnershipTypes,
      message,
      submittedAt: formatSubmittedAt(),
    }),
  });

  if (!result.ok) {
    return { status: "error", message: result.error };
  }

  return { status: "success" };
}

export async function submitStoryForm(
  formData: FormData,
): Promise<FormSubmissionState> {
  if (isHoneypotTriggered(formData)) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const story = String(formData.get("story") ?? "").trim();
  const credit = String(formData.get("credit") ?? "").trim();
  const photos = formData
    .getAll("photos")
    .filter(
      (entry): entry is File =>
        entry instanceof File && entry.size > 0 && entry.name.length > 0,
    );

  const errors: Record<string, string> = {};

  if (name.length > 100) errors.name = "That name is too long.";

  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (story.length < 2) errors.story = "Please share your story.";
  else if (story.length > 4000) {
    errors.story = "Stories are limited to 4,000 characters.";
  }

  if (!(STORY_CREDIT_OPTIONS as readonly string[]).includes(credit)) {
    errors.credit = "Please let us know how we may credit your story.";
  }

  if (photos.length > STORY_MAX_PHOTOS) {
    errors.photos = `Please attach at most ${STORY_MAX_PHOTOS} photos.`;
  } else {
    let totalBytes = 0;

    for (const file of photos) {
      if (!(STORY_ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
        errors.photos =
          "Only JPG, PNG, WebP, GIF, HEIC, HEIF, or AVIF images are supported.";
        break;
      }
      if (file.size > STORY_MAX_PHOTO_BYTES) {
        errors.photos = `Each photo must be ${STORY_MAX_PHOTO_BYTES / (1024 * 1024)} MB or smaller.`;
        break;
      }
      totalBytes += file.size;
    }

    if (!errors.photos && totalBytes > STORY_MAX_TOTAL_BYTES) {
      errors.photos = `Combined photos must be ${STORY_MAX_TOTAL_BYTES / (1024 * 1024)} MB or smaller.`;
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors,
    };
  }

  const attachments: EmailAttachment[] = await Promise.all(
    photos.map(async (file, index) => ({
      filename: sanitizeFilename(file.name, index),
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
    })),
  );

  const result = await sendFormEmail({
    subject: `Share your story — ${name || "Anonymous"}`,
    replyTo: email,
    react: createElement(StorySubmissionEmail, {
      name: name || undefined,
      email,
      credit,
      story,
      attachmentNames: attachments.map((item) => item.filename),
      submittedAt: formatSubmittedAt(),
    }),
    attachments,
  });

  if (!result.ok) {
    return { status: "error", message: result.error };
  }

  return { status: "success" };
}
