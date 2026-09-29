"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "cn";

import { Container } from "@/components/ds";
import { Button } from "./ui/button";

type SubNavLink = { href: string; label: string };

type NavLink = {
  href: string;
  label: string;
  /** Renders a dropdown beneath the link on desktop and an accordion on mobile. */
  children?: SubNavLink[];
};

/** Primary site navigation, mirroring the links in the homepage prototype. */
export const primaryNav: NavLink[] = [
  { href: "/our-story", label: "Our Story" },
  { href: "/get-the-facts", label: "Get The facts" },
  {
    href: "/get-involved",
    label: "Get Involved",
    children: [
      { href: "/donate", label: "Donate" },
      { href: "/volunteer", label: "Volunteer" },
      { href: "/partner-with-us", label: "Partner With Us" },
      { href: "/tell-your-story", label: "Tell your story" },
    ],
  },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

/** Shared shape for a top-level link: uppercase eyebrow type in a soft pill. */
const linkBase =
  "inline-flex items-center gap-1.5 rounded-none px-4 py-3.5 font-heading text-eyebrow uppercase transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/70";

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* -------------------------------------------------------------------------- */
/* Desktop                                                                    */
/* -------------------------------------------------------------------------- */

function DesktopNavItem({ link, pathname }: { link: NavLink; pathname: string }) {
  const active = isActivePath(pathname, link.href);

  if (!link.children) {
    return (
      <li>
        <Link
          href={link.href}
          aria-current={active ? "page" : undefined}
          className={cn(
            linkBase,
            "text-white/90 hover:bg-white hover:text-brand-700",
            active && "bg-white/15 text-white",
          )}
        >
          {link.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="group relative">
      <Link
        href={link.href}
        aria-haspopup="true"
        aria-current={active ? "page" : undefined}
        className={cn(
          linkBase,
          "text-white/90 group-hover:text-brand-400 group-focus-within:text-brand-400",
        )}
      >
        {link.label}
        <ChevronDown
          aria-hidden
          className="size-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
        />
      </Link>

      {/* Invisible `pt-3` keeps the hover bridge continuous between link and panel. */}
      <div className="invisible absolute top-full left-0 z-50 translate-y-1 pt-3 opacity-0 transition-[opacity,transform] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <ul className="min-w-52 rounded-none bg-white p-2 shadow-lg ring-1 ring-brand-950/5">
          {link.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className="block rounded-none px-4 py-3 text-sm font-medium text-brand-700 transition-colors outline-none hover:bg-brand-50 hover:text-brand-900 focus-visible:bg-brand-50"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile                                                                     */
/* -------------------------------------------------------------------------- */

const mobileLinkBase =
  "flex w-full items-center justify-between rounded-none px-3 py-3 text-left font-heading text-eyebrow uppercase text-white/90 transition-colors hover:bg-white/10";

function MobileNavItem({
  link,
  pathname,
  onNavigate,
}: {
  link: NavLink;
  pathname: string;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = React.useState(
    isActivePath(pathname, link.href),
  );

  if (!link.children) {
    return (
      <li>
        <Link
          href={link.href}
          onClick={onNavigate}
          aria-current={
            isActivePath(pathname, link.href) ? "page" : undefined
          }
          className={mobileLinkBase}
        >
          {link.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className={mobileLinkBase}
      >
        {link.label}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-4 transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <ul className="overflow-hidden pl-3">
          {link.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onNavigate}
                className="block rounded-none px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Global site navigation.
 *
 * Sits transparent over the hero photography and fades to a solid brand bar
 * once the page scrolls, so the white wordmark and links stay legible on every
 * page. Rendered once in `app/layout.tsx`.
 */
export function Navigation() {
  const pathname = usePathname();
  /** Only the homepage opens on a full-bleed dark hero, so only there does the
   *  bar start transparent. Every other route needs the solid brand bar so the
   *  white wordmark and links stay legible from the first pixel. */
  const isOverHero = pathname === "/";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  React.useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isOverHero
          ? "bg-transparent"
          : "bg-brand-800/95 shadow-sm backdrop-blur-md",
        (scrolled || open) && "bg-brand-800/95 shadow-sm backdrop-blur-md",
      )}
    >
      <Container
        size="wide"
        className="flex h-20 items-center justify-between gap-6 lg:pr-24"
      >
        <Link
          href="/"
          aria-label="Purple Project — home"
          className="shrink-0 rounded-none outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <Image
            src="/images/logo-white.png"
            alt="Purple Project"
            width={282}
            height={55}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((link) => (
              <DesktopNavItem key={link.href} link={link} pathname={pathname} />
            ))}
          </ul>
        </nav>

        <Button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-none text-white transition-colors outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <X aria-hidden className="size-6" />
          ) : (
            <Menu aria-hidden className="size-6" />
          )}
        </Button>
      </Container>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden",
          open
            ? "max-h-[80vh] border-t border-white/15 opacity-100"
            : "max-h-0 opacity-0",
        )}
      >
        <Container size="wide" className="py-4">
          <nav aria-label="Primary mobile">
            <ul className="flex flex-col gap-0.5">
              {primaryNav.map((link) => (
                <MobileNavItem
                  key={link.href}
                  link={link}
                  pathname={pathname}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </ul>
          </nav>
          <Link
            href="/quiz"
            onClick={() => setOpen(false)}
            className="mt-4  flex items-center justify-center rounded-none bg-white px-6 py-3 font-heading text-eyebrow uppercase text-brand-800 transition-colors hover:bg-white/90"
          >
            Take a quiz
          </Link>
        </Container>
      </div>

      {/* Edge tab — desktop only, matching the prototype. */}
      <Link
        href="/quiz"
        className="absolute top-[15vh] right-0 hidden h-52 w-16 items-center justify-center rounded-none bg-primary text-white transition-colors outline-none hover:bg-brand-800 focus-visible:ring-2 focus-visible:ring-white/70 lg:flex"
      >
        <span className="rotate-180 font-heading text-eyebrow uppercase [writing-mode:vertical-rl]">
          Take a quiz
        </span>
      </Link>
    </header>
  );
}
