"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_EMAIL } from "@/lib/contact";

/** Options listed under "I'm getting in touch as…" in 03 CONTACT FORM. */
const ROLES = [
  "Patient or family member",
  "Parent",
  "School",
  "Business or partner",
  "Healthcare professional",
  "Other",
] as const;

/**
 * Interactive contact form rendered inside `ContactFormSection`.
 *
 * Like the volunteer and pledge forms, there is no inbox wired up yet, so the
 * form composes a pre-filled email in the visitor's own mail app. No personal
 * detail is stored on the website.
 */
export function ContactMessageForm() {
  const [role, setRole] = React.useState<string>("");
  const [roleError, setRoleError] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!role) {
      setRoleError(true);
      return;
    }

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(
      `Website enquiry — ${role}${name ? ` — ${name}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `I’m getting in touch as: ${role}`,
        "",
        "Message:",
        message,
        "",
        "I agree to Purple Project contacting me about my message.",
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

        <h3 className="mt-6 font-heading text-display-xs uppercase text-brand-950">
          Thank{" "}
          <span className="font-display text-script-sm normal-case italic text-brand-700">
            you.
          </span>
        </h3>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground">
          Thank you for reaching out. We&rsquo;ve received your message and will
          be in touch.
        </p>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Your email app should also open with your message ready to send. If it
          did not open automatically, you can email us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
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
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className="h-10"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-10"
          />
        </div>
      </div>

      {/* I'm getting in touch as… */}
      <fieldset className="grid gap-2.5">
        <legend className="text-sm leading-none font-medium text-foreground">
          I&rsquo;m getting in touch as&hellip;
        </legend>
        <div className="mt-1 grid gap-2.5 sm:grid-cols-2">
          {ROLES.map((option) => {
            const selected = role === option;

            return (
              <label
                key={option}
                className={cn(
                  "flex cursor-pointer items-center gap-3 border px-3.5 py-3 text-sm transition-colors select-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/50",
                  selected
                    ? "border-brand-700 bg-lavender/75 font-medium text-brand-950"
                    : "border-input bg-white text-foreground hover:border-brand-300 hover:bg-brand-50/50",
                )}
              >
                <input
                  type="radio"
                  name="role"
                  value={option}
                  checked={selected}
                  onChange={() => {
                    setRole(option);
                    setRoleError(false);
                  }}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center border transition-colors",
                    selected
                      ? "border-brand-700 bg-brand-700"
                      : "border-ink-300 bg-white",
                  )}
                >
                  {selected ? <span className="size-1.5 bg-white" /> : null}
                </span>
                <span>{option}</span>
              </label>
            );
          })}
        </div>
        {roleError ? (
          <p role="alert" className="text-xs text-destructive">
            Please let us know who you are getting in touch as.
          </p>
        ) : null}
      </fieldset>

      {/* Message */}
      <div className="grid gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={3000}
          placeholder="Ask us anything. No question is too awkward."
        />
      </div>

      {/* Consent */}
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="mt-0.5 flex size-4 shrink-0 items-center justify-center border border-ink-300 bg-white text-transparent transition-colors peer-checked:border-brand-700 peer-checked:bg-brand-700 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50"
        >
          <Check className="size-3" strokeWidth={3} />
        </span>
        <span>
          I agree to Purple Project contacting me about my message.{" "}
          <Link
            href="/privacy-policy"
            className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900"
          >
            Privacy policy
          </Link>
          .
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" variant="brand" size="cta">
          Send message
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          This opens your email app with your message ready to send.
        </p>
      </div>
    </form>
  );
}
