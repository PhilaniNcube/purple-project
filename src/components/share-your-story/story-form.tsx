"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DESK_EMAIL } from "@/lib/contact";
import { submitStoryForm } from "@/lib/form-actions";
import {
  initialFormState,
  STORY_ALLOWED_IMAGE_TYPES,
  STORY_CREDIT_OPTIONS,
  STORY_MAX_PHOTOS,
  STORY_MAX_PHOTO_BYTES,
  STORY_MAX_TOTAL_BYTES,
  type FormSubmissionState,
} from "@/lib/form-state";

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateSelectedPhotos(files: File[]): string | null {
  if (files.length === 0) return null;

  if (files.length > STORY_MAX_PHOTOS) {
    return `Please attach at most ${STORY_MAX_PHOTOS} photos.`;
  }

  let totalBytes = 0;

  for (const file of files) {
    if (!(STORY_ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
      return "Only JPG, PNG, WebP, GIF, HEIC, HEIF, or AVIF images are supported.";
    }
    if (file.size > STORY_MAX_PHOTO_BYTES) {
      return `Each photo must be ${STORY_MAX_PHOTO_BYTES / (1024 * 1024)} MB or smaller.`;
    }
    totalBytes += file.size;
  }

  if (totalBytes > STORY_MAX_TOTAL_BYTES) {
    return `Combined photos must be ${STORY_MAX_TOTAL_BYTES / (1024 * 1024)} MB or smaller.`;
  }

  return null;
}

/**
 * Story submission form.
 */
export function ShareStoryForm() {
  const [credit, setCredit] = React.useState("");
  const [creditError, setCreditError] = React.useState(false);
  const [selectedPhotos, setSelectedPhotos] = React.useState<File[]>([]);
  const [photoError, setPhotoError] = React.useState<string | null>(null);
  const [state, setState] = React.useState<FormSubmissionState>(initialFormState);
  const [isPending, startTransition] = React.useTransition();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.currentTarget.files ?? []);
    const validationError = validateSelectedPhotos(files);

    if (validationError) {
      setPhotoError(validationError);
      setSelectedPhotos([]);
      event.currentTarget.value = "";
      return;
    }

    setPhotoError(null);
    setSelectedPhotos(files);
  }

  function clearPhotos() {
    setSelectedPhotos([]);
    setPhotoError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!credit) {
      setCreditError(true);
      return;
    }

    if (photoError) {
      return;
    }

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await submitStoryForm(formData);
      setState(result);
    });
  }

  function handleReset() {
    setState(initialFormState);
    setCredit("");
    setCreditError(false);
    setSelectedPhotos([]);
    setPhotoError(null);
  }

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start py-6"
      >
        <span className="flex size-12 items-center justify-center bg-brand-700 text-white">
          <Check aria-hidden className="size-6" strokeWidth={2.5} />
        </span>

        <p className="mt-6 max-w-xl font-display text-2xl leading-snug text-pretty text-brand-700 italic sm:text-3xl">
          Thank you for trusting us with your story.
        </p>

        <p className="mt-3 text-base leading-relaxed text-foreground">
          We&rsquo;ll read it with care, and we&rsquo;ll be in touch before
          anything is shared.
        </p>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Need to add anything else? You can also email us at{" "}
          <a
            href={`mailto:${DESK_EMAIL}?subject=Share%20your%20story`}
            className="font-medium text-brand-700 underline underline-offset-2"
          >
            {DESK_EMAIL}
          </a>
          .
        </p>

        <Button
          type="button"
          variant="brand-outline"
          size="cta"
          className="mt-8"
          onClick={handleReset}
        >
          Back to form
        </Button>
      </div>
    );
  }

  const activeCreditError = creditError
    ? "Please let us know how we may credit your story."
    : state.errors?.credit;
  const activePhotoError = photoError ?? state.errors?.photos;

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="story-website">Website</label>
        <input
          id="story-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="story-name">Name (optional)</Label>
          <Input
            id="story-name"
            name="name"
            maxLength={100}
            autoComplete="name"
            placeholder="First name is enough"
            className="h-10"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={
              state.errors?.name ? "story-name-error" : undefined
            }
          />
          {state.errors?.name ? (
            <p id="story-name-error" className="text-xs text-destructive">
              {state.errors.name}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="story-email">Email</Label>
          <Input
            id="story-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-10"
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={
              state.errors?.email ? "story-email-error" : undefined
            }
          />
          {state.errors?.email ? (
            <p id="story-email-error" className="text-xs text-destructive">
              {state.errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="story-body">Your story</Label>
        <Textarea
          id="story-body"
          name="story"
          required
          rows={7}
          maxLength={4000}
          placeholder="What would you like people to know? You can share as much or as little as feels right."
          aria-invalid={Boolean(state.errors?.story)}
          aria-describedby={
            state.errors?.story ? "story-body-error" : undefined
          }
        />
        {state.errors?.story ? (
          <p id="story-body-error" className="text-xs text-destructive">
            {state.errors.story}
          </p>
        ) : null}
      </div>

      <fieldset className="grid gap-2.5">
        <legend className="text-sm leading-none font-medium text-foreground">
          How may we use it?
        </legend>

        <div className="mt-1 grid gap-2.5 sm:grid-cols-2">
          {STORY_CREDIT_OPTIONS.map((option) => {
            const checked = credit === option;

            return (
              <label
                key={option}
                className={cn(
                  "flex cursor-pointer items-center gap-3 border px-3.5 py-3 text-sm transition-colors select-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/50",
                  checked
                    ? "border-brand-700 bg-lavender/75 font-medium text-brand-950"
                    : "border-input bg-white text-foreground hover:border-brand-300 hover:bg-brand-50/50",
                )}
              >
                <input
                  type="radio"
                  name="credit"
                  value={option}
                  checked={checked}
                  onChange={() => {
                    setCredit(option);
                    setCreditError(false);
                  }}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                    checked
                      ? "border-brand-700 bg-brand-700"
                      : "border-ink-300 bg-white",
                  )}
                >
                  {checked ? (
                    <span className="size-1.5 rounded-full bg-white" />
                  ) : null}
                </span>
                <span>{option}</span>
              </label>
            );
          })}
        </div>

        {activeCreditError ? (
          <p role="alert" className="text-xs text-destructive">
            {activeCreditError}
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-2">
        <Label htmlFor="story-photos">Photos (optional)</Label>
        <Input
          ref={fileInputRef}
          id="story-photos"
          name="photos"
          type="file"
          accept={STORY_ALLOWED_IMAGE_TYPES.join(",")}
          multiple
          onChange={handlePhotoChange}
          aria-invalid={Boolean(activePhotoError)}
          aria-describedby={activePhotoError ? "story-photos-error" : undefined}
          className="h-auto cursor-pointer py-2 file:mr-3 file:cursor-pointer file:border-0 file:bg-brand-700 file:px-3 file:py-2 file:text-[0.72rem] file:font-semibold file:tracking-[0.18em] file:uppercase file:text-white hover:file:bg-brand-800"
        />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Selected photos are attached directly to your submission (up to{" "}
          {STORY_MAX_PHOTOS} images, max {STORY_MAX_PHOTO_BYTES / (1024 * 1024)}{" "}
          MB each).
        </p>

        {selectedPhotos.length > 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-2 border border-brand-200 bg-brand-50/60 px-3 py-2 text-xs text-brand-950">
            <ul className="flex flex-wrap gap-x-3 gap-y-1">
              {selectedPhotos.map((file) => (
                <li key={`${file.name}-${file.size}`}>
                  {file.name}{" "}
                  <span className="text-muted-foreground">
                    ({formatFileSize(file.size)})
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={clearPhotos}
              className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900"
            >
              Clear photos
            </button>
          </div>
        ) : null}

        {activePhotoError ? (
          <div id="story-photos-error" role="alert" className="text-xs text-destructive">
            <span>{activePhotoError}</span>{" "}
            <button
              type="button"
              onClick={clearPhotos}
              className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900"
            >
              Dismiss
            </button>
          </div>
        ) : null}
      </div>

      {state.status === "error" && state.message ? (
        <div
          role="alert"
          className="border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          <p>{state.message}</p>
          <p className="mt-1 text-xs text-foreground/80">
            You can also email us directly at{" "}
            <a
              href={`mailto:${DESK_EMAIL}?subject=Share%20your%20story`}
              className="font-medium text-brand-700 underline underline-offset-2"
            >
              {DESK_EMAIL}
            </a>
            .
          </p>
        </div>
      ) : null}

      <div className="pt-2">
        <Button type="submit" variant="brand" size="cta" disabled={isPending}>
          {isPending ? "Sending…" : "Share my story"}
        </Button>
      </div>
    </form>
  );
}
