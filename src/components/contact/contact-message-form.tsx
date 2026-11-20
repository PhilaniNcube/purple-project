"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DESK_EMAIL } from "@/lib/contact";
import { submitContactForm } from "@/lib/form-actions";
import {
  CONTACT_ROLES,
  initialFormState,
  type FormSubmissionState,
} from "@/lib/form-state";

/**
 * Interactive contact form rendered inside `ContactFormSection`.
 */
export function ContactMessageForm() {
  const [role, setRole] = React.useState<string>("");
  const [roleError, setRoleError] = React.useState(false);
  const [state, setState] = React.useState<FormSubmissionState>(initialFormState);
  const [isPending, startTransition] = React.useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!role) {
      setRoleError(true);
      return;
    }

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await submitContactForm(formData);
      setState(result);
    });
  }

  function handleReset() {
    setState(initialFormState);
    setRole("");
    setRoleError(false);
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
          Need to add anything else? You can also email us at{" "}
          <a
            href={`mailto:${DESK_EMAIL}`}
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
          Send another message
        </Button>
      </div>
    );
  }

  const activeRoleError = roleError
    ? "Please let us know who you are getting in touch as."
    : state.errors?.role;

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

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
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={
              state.errors?.name ? "contact-name-error" : undefined
            }
          />
          {state.errors?.name ? (
            <p id="contact-name-error" className="text-xs text-destructive">
              {state.errors.name}
            </p>
          ) : null}
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
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={
              state.errors?.email ? "contact-email-error" : undefined
            }
          />
          {state.errors?.email ? (
            <p id="contact-email-error" className="text-xs text-destructive">
              {state.errors.email}
            </p>
          ) : null}
        </div>
      </div>

      {/* I'm getting in touch as… */}
      <fieldset className="grid gap-2.5">
        <legend className="text-sm leading-none font-medium text-foreground">
          I&rsquo;m getting in touch as&hellip;
        </legend>
        <div className="mt-1 grid gap-2.5 sm:grid-cols-2">
          {CONTACT_ROLES.map((option) => {
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
        {activeRoleError ? (
          <p role="alert" className="text-xs text-destructive">
            {activeRoleError}
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
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={
            state.errors?.message ? "contact-message-error" : undefined
          }
        />
        {state.errors?.message ? (
          <p id="contact-message-error" className="text-xs text-destructive">
            {state.errors.message}
          </p>
        ) : null}
      </div>

      {/* Consent */}
      <div className="grid gap-1.5">
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
        {state.errors?.consent ? (
          <p role="alert" className="text-xs text-destructive">
            {state.errors.consent}
          </p>
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
              href={`mailto:${DESK_EMAIL}`}
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
          {isPending ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
