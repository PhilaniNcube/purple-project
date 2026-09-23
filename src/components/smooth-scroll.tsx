"use client";

import { ReactLenis } from "lenis/react";

import "lenis/dist/lenis.css";

/**
 * Global Lenis smooth-scroll provider.
 *
 * Uses `root` so no extra wrapper element is rendered — the window keeps
 * scrolling and the flex layout in `app/layout.tsx` is untouched.
 *
 * - `autoRaf` lets Lenis drive its own requestAnimationFrame loop.
 * - `anchors` routes in-page `#hash` links through Lenis (respecting
 *   `scroll-padding-top`, which clears the sticky top bar).
 * - Reduced-motion is honoured by Lenis automatically
 *   (`respectReducedMotion` defaults to `true`), so scrolling stays instant
 *   for users who ask for it.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: true,
        lerp: 0.1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
