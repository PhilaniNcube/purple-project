"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CONTACT_EMAIL = "hello@purpleproject.org.za";

/** The two credit choices listed in the story form. */
const CREDIT_OPTIONS = ["Use my name", "Keep me anonymous"] as const;

/**
 * Story submission form.
 *
 * The site has no story inbox wired up yet, so the form composes a pre-filled
 * email in the visitor's own mail app. That keeps the submission deliberate,
 * gives the visitor a copy of what they sent and means no personal detail is
 * stored on the website. Photos are chosen in the form and then attached to the
 * email before it is sent.
 */
export function ShareStoryForm() {
  const [credit, setCredit] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const use = String(data.get("credit") ?? "Keep me anonymous");
    const story = String(data.get("story") ?? "").trim();
    const photoNames = data
      .getAll("photos")
      .filter((entry): entry is File => entry instanceof File && entry.name.length > 0)
      .map((file) => file.name);

    const subject = encodeURIComponent(
      `Share your story${name ? ` — ${name}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name || "Not provided"}`,
        `Email: ${email}`,
        `How may we use it?: ${use}`,
        `Photos: ${photoNames.length ? photoNames.join(", ") : "None"}`,
        "",
        "My story:",
        story,
      ].join("\n"),
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
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
          Your email app should also open with your story ready to send. If you
          selected photos, attach them to that email. If it did not open
          automatically, you can email us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Share%20your%20story`}
            className="font-medium text-brand-700 underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>

        <Button
          type="button"
          variant="brand-outline"
          size="cta"
          className="mt-8"
          onClick={() => setSubmitted(false)}
        >
          Back to form
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
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
          />
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
          />
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
        />
      </div>

      <fieldset className="grid gap-2.5">
        <legend className="text-sm leading-none font-medium text-foreground">
          How may we use it?
        </legend>

        <div className="mt-1 grid gap-2.5 sm:grid-cols-2">
          {CREDIT_OPTIONS.map((option) => {
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
                  onChange={() => setCredit(option)}
                  required
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
      </fieldset>

      <div className="grid gap-2">
        <Label htmlFor="story-photos">Photos (optional)</Label>
        <Input
          id="story-photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          className="h-auto cursor-pointer py-2 file:mr-3 file:cursor-pointer file:border-0 file:bg-brand-700 file:px-3 file:py-2 file:text-[0.72rem] file:font-semibold file:tracking-[0.18em] file:uppercase file:text-white hover:file:bg-brand-800"
        />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Your email app opens with your story ready to send. Attach your
          selected photos to that email before sending.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" variant="brand" size="cta">
          Share my story
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          This opens your email app with your story ready to send.
        </p>
      </div>
    </form>
  );
}
