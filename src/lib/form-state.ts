/**
 * Shared client-safe types, option lists, and upload limits for the public
 * enquiry forms.
 */
export type FormSubmissionState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Record<string, string>;
};

export const initialFormState: FormSubmissionState = { status: "idle" };

/** Options listed under "I'm getting in touch as…" in 03 CONTACT FORM. */
export const CONTACT_ROLES = [
  "Patient or family member",
  "Parent",
  "School",
  "Business or partner",
  "Healthcare professional",
  "Other",
] as const;

/** Items listed under "What would you like to give?" in 04 PLEDGE FORM. */
export const PLEDGE_ITEMS = [
  "Sanitary towels",
  "Soap and body wash",
  "Toothbrushes and toothpaste",
  "Deodorant and roll-on",
  "Body lotion",
  "Other",
] as const;

/** Hand-over options listed in 04 PLEDGE FORM. */
export const HANDOVER_OPTIONS = [
  "I’ll drop it off",
  "Please arrange collection",
] as const;

/** The ways to help listed under "SIGN-UP FORM". */
export const VOLUNTEER_WAYS = [
  "Spread the word",
  "Join us at events",
  "Pack dignity packs",
  "Start a conversation",
  "Something else",
] as const;

/** The partnership routes listed in the enquiry form. */
export const PARTNERSHIP_TYPES = [
  "Financial support",
  "In-kind gifts",
  "Campaign sponsorship",
  "Community outreach",
  "Not sure yet",
] as const;

/** The two credit choices listed in the story form. */
export const STORY_CREDIT_OPTIONS = [
  "Use my name",
  "Keep me anonymous",
] as const;

export const STORY_MAX_PHOTOS = 5;
export const STORY_MAX_PHOTO_BYTES = 5 * 1024 * 1024;
export const STORY_MAX_TOTAL_BYTES = 12 * 1024 * 1024;
export const STORY_ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
  "image/avif",
] as const;
