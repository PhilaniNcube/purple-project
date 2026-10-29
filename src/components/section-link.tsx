"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SectionLinkProps = React.ComponentProps<typeof Link>;

/**
 * A link that points at a section of a page (`/page#section`).
 *
 * On the page that owns the section the href is reduced to the bare fragment.
 * That matters twice over: Next treats a same-route navigation with a hash as a
 * no-op and never scrolls, while the site's Lenis setup routes in-page
 * `#hash` links through its own smoothing (honouring the sticky bar). Matching
 * on the pathname lets the same link work from every page: a plain fragment
 * here, a normal route + fragment everywhere else.
 */
export function SectionLink({ href, ...props }: SectionLinkProps) {
  const pathname = usePathname();

  const url = typeof href === "string" ? href : "";
  const hashIndex = url.indexOf("#");
  const path = hashIndex === -1 ? url : url.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : url.slice(hashIndex + 1);
  const isSamePage = Boolean(hash) && path === pathname;

  return <Link href={isSamePage ? `#${hash}` : href} {...props} />;
}
