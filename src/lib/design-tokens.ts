/**
 * Purple Project — design token reference.
 *
 * These are thin, typed handles onto the CSS custom properties defined in
 * `src/app/globals.css`. They exist so tooling, tests and documentation can
 * read the system programmatically without duplicating raw values.
 *
 * The CSS file remains the source of truth — never hard-code values here.
 */

export const brand = {
  50: "var(--color-brand-50)",
  100: "var(--color-brand-100)",
  200: "var(--color-brand-200)",
  300: "var(--color-brand-300)",
  400: "var(--color-brand-400)",
  500: "var(--color-brand-500)",
  600: "var(--color-brand-600)",
  700: "var(--color-brand-700)",
  800: "var(--color-brand-800)",
  900: "var(--color-brand-900)",
  950: "var(--color-brand-950)",
} as const;

export const ink = {
  50: "var(--color-ink-50)",
  100: "var(--color-ink-100)",
  200: "var(--color-ink-200)",
  300: "var(--color-ink-300)",
  400: "var(--color-ink-400)",
  500: "var(--color-ink-500)",
  600: "var(--color-ink-600)",
  700: "var(--color-ink-700)",
  800: "var(--color-ink-800)",
  900: "var(--color-ink-900)",
  950: "var(--color-ink-950)",
} as const;

export const accents = {
  blush: {
    100: "var(--color-blush-100)",
    300: "var(--color-blush-300)",
    500: "var(--color-blush-500)",
  },
  sky: {
    100: "var(--color-sky-100)",
    300: "var(--color-sky-300)",
    500: "var(--color-sky-500)",
  },
  sun: {
    100: "var(--color-sun-100)",
    300: "var(--color-sun-300)",
    500: "var(--color-sun-500)",
  },
} as const;

export type ColorRamp = Record<string, string>;

export const ramps: { name: string; description: string; ramp: ColorRamp }[] = [
  {
    name: "brand",
    description: "Primary purple. Anchors buttons, links and brand surfaces.",
    ramp: brand,
  },
  {
    name: "ink",
    description: "Neutrals with a faint purple tint. Text, borders, night sections.",
    ramp: ink,
  },
];

export const accentRamps: { name: string; ramp: ColorRamp }[] = [
  { name: "blush", ramp: accents.blush },
  { name: "sky", ramp: accents.sky },
  { name: "sun", ramp: accents.sun },
];

/** Role-based tokens. These flip between light and dark colour schemes. */
export const semantic = {
  background: "var(--background)",
  foreground: "var(--foreground)",
  card: "var(--card)",
  cardForeground: "var(--card-foreground)",
  primary: "var(--primary)",
  primaryForeground: "var(--primary-foreground)",
  secondary: "var(--secondary)",
  secondaryForeground: "var(--secondary-foreground)",
  muted: "var(--muted)",
  mutedForeground: "var(--muted-foreground)",
  accent: "var(--accent)",
  accentForeground: "var(--accent-foreground)",
  border: "var(--border)",
  input: "var(--input)",
  ring: "var(--ring)",
  surface: "var(--surface)",
  lavender: "var(--lavender)",
  night: "var(--night)",
  destructive: "var(--destructive)",
} as const;

export type TypeStyle = {
  /** Tailwind utility that applies the full style (size + leading + tracking). */
  className: string;
  family: "heading" | "display" | "sans";
  label: string;
  sample: string;
};

export const typeScale: TypeStyle[] = [
  {
    label: "Display XL",
    className: "text-display-xl",
    family: "heading",
    sample: "Join the fight",
  },
  {
    label: "Display LG",
    className: "text-display-lg",
    family: "heading",
    sample: "Speak up",
  },
  {
    label: "Display MD",
    className: "text-display-md",
    family: "heading",
    sample: "Share the knowledge",
  },
  {
    label: "Display SM",
    className: "text-display-sm",
    family: "heading",
    sample: "Protect women",
  },
  {
    label: "Display XS",
    className: "text-display-xs",
    family: "heading",
    sample: "The numbers",
  },
  {
    label: "Script XL",
    className: "text-script-xl",
    family: "display",
    sample: "Join the fight",
  },
  {
    label: "Script LG",
    className: "text-script-lg",
    family: "display",
    sample: "together.",
  },
  {
    label: "Script MD",
    className: "text-script-md",
    family: "display",
    sample: "the founder",
  },
  {
    label: "Script SM",
    className: "text-script-sm",
    family: "display",
    sample: "Change everything",
  },
  {
    label: "Eyebrow",
    className: "text-eyebrow uppercase",
    family: "heading",
    sample: "Shining a light",
  },
];

export const fontFamilies = [
  {
    name: "font-heading",
    label: "Heading / Display",
    stack: "Archivo",
    usage: "Heavy uppercase headlines, eyebrows, wordmark.",
    className: "font-heading",
  },
  {
    name: "font-display",
    label: "Display Serif",
    stack: "Playfair Display",
    usage: "Italic serif accents layered with the headline.",
    className: "font-display italic",
  },
  {
    name: "font-sans",
    label: "Body",
    stack: "Inter",
    usage: "Body copy, UI labels, form controls.",
    className: "font-sans",
  },
  {
    name: "font-mono",
    label: "Mono",
    stack: "Geist Mono",
    usage: "Code, tokens, tabular data.",
    className: "font-mono",
  },
] as const;

export const radii = [
  { name: "sm", className: "rounded-sm", value: "calc(var(--radius) * 0.6)" },
  { name: "md", className: "rounded-md", value: "calc(var(--radius) * 0.8)" },
  { name: "lg", className: "rounded-lg", value: "var(--radius)" },
  { name: "xl", className: "rounded-xl", value: "calc(var(--radius) * 1.4)" },
  { name: "2xl", className: "rounded-2xl", value: "calc(var(--radius) * 1.8)" },
  { name: "3xl", className: "rounded-3xl", value: "calc(var(--radius) * 2.2)" },
  { name: "full", className: "rounded-full", value: "9999px" },
  { name: "arch", className: "rounded-arch", value: "2.5rem 2.5rem 0.5rem 0.5rem" },
] as const;

export const shadows = [
  { name: "shadow-xs", value: "Extra small" },
  { name: "shadow-sm", value: "Small" },
  { name: "shadow-md", value: "Medium" },
  { name: "shadow-lg", value: "Large" },
  { name: "shadow-xl", value: "Extra large" },
  { name: "shadow-brand", value: "Brand glow" },
] as const;

export const easings = [
  { name: "ease-brand", value: "cubic-bezier(0.22, 1, 0.36, 1)" },
  { name: "ease-out-quart", value: "cubic-bezier(0.25, 1, 0.5, 1)" },
  { name: "ease-in-out-quart", value: "cubic-bezier(0.76, 0, 0.24, 1)" },
] as const;

export const stats = [
  { value: "13,800", label: "New cases of cervical cancer annually reported in South Africa" },
] as const;
