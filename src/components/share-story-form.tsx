"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CONTACT_EMAIL = "hello@purpleproject.org.za";

/**
 * Story submission form.
 *
 * The site has no story inbox yet, so the form composes a pre-filled email in
 * the visitor's own mail app. That keeps the submission deliberate, gives the
 * visitor a copy of what they sent and means no medical or personal detail is
 * stored on the website.
 */
export function ShareStoryForm() {
  const [sent, setSent] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const credit = String(data.get("credit") ?? "Use my first name");
    const story = String(data.get("story") ?? "").trim();

    const subject = encodeURIComponent(
      `Share your story${name ? ` — ${name}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Credit preference: ${credit}`,
        "",
        "My story:",
        story,
        "",
        "I consent to Purple Project reviewing this story and contacting me about it.",
      ].join("\n"),
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="story-name">Your name</Label>
          <Input
            id="story-name"
            name="name"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="First name is enough"
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
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="story-credit">How should we credit you?</Label>
        <select
          id="story-credit"
          name="credit"
          defaultValue="Use my first name"
          className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option>Use my first name</option>
          <option>Use my full name</option>
          <option>Keep me anonymous</option>
        </select>
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

      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-4 shrink-0 accent-brand-700"
        />
        <span>
          I consent to Purple Project reviewing this story and contacting me
          about it. I understand it will not be published without my approval.
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="brand" size="cta">
          Send my story
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          This opens your email app with the story ready to send.
        </p>
      </div>

      {sent ? (
        <p
          role="status"
          className="border-l-2 border-primary bg-lavender px-4 py-3 text-sm leading-relaxed text-brand-900/80"
        >
          Your email app should be opening now. If it does not, email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Share%20your%20story`}
            className="font-medium text-brand-700 underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          directly.
        </p>
      ) : null}
    </form>
  );
}
