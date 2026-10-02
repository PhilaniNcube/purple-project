"use client";

import * as React from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

import { Container, Section } from "@/components/ds";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

/**
 * "Our reason for being."
 *
 * The band that states why Purple Project exists. Its heading mirrors
 * `shining-a-light`: an outline SVG ("OUR REASON", from
 * `public/images/OUR REASON.svg`) whose glyphs are drawn on with GSAP's
 * DrawSVGPlugin as the band scrolls into view, answered by the solid display
 * line ("FOR BEING."). An arched editorial photograph sits beneath the heading,
 * with the supporting copy in the opposite column.
 *
 * The artwork is the same geometry as the exported "OUR REASON" file, rendered
 * as strokes (`fill="none"`) rather than a masked fill so the outline is a
 * real, measurable path. That export is a *compound* path — one `M…Z` run per
 * glyph contour — and dashing restarts at the start of every subpath, so
 * drawing it as a single unit would flip every letter from hidden to fully
 * drawn at once. Instead it is split into its subpaths (`OUTLINE_SUBPATHS`) and
 * each is drawn on its own, staggered left to right.
 */

/** Mask-path geometry from the exported "OUR REASON" artwork. */
const OUTLINE_PATH = "M15.28 34.8399C10.8 34.8399 7.29332 33.4933 4.75999 30.7999C2.25332 28.0799 0.99999 24.5733 0.99999 20.2799V15.4799C0.99999 11.2133 2.25332 7.73327 4.75999 5.03994C7.29332 2.34661 10.8 0.99994 15.28 0.99994C19.7333 0.99994 23.2133 2.34661 25.72 5.03994C28.2533 7.70661 29.52 11.1866 29.52 15.4799V20.2799C29.52 24.5733 28.2533 28.0799 25.72 30.7999C23.2133 33.4933 19.7333 34.8399 15.28 34.8399ZM7.35999 21.0799C7.35999 23.5066 8.01332 25.5066 9.31999 27.0799C10.6533 28.6266 12.64 29.3999 15.28 29.3999C17.92 29.3999 19.8933 28.6266 21.2 27.0799C22.5067 25.5066 23.16 23.5066 23.16 21.0799V14.7199C23.16 12.3466 22.4933 10.3733 21.16 8.79994C19.8533 7.22661 17.8933 6.43994 15.28 6.43994C12.64 6.43994 10.6533 7.22661 9.31999 8.79994C8.01332 10.3466 7.35999 12.3199 7.35999 14.7199V21.0799ZM46.9112 34.8399C42.3512 34.8399 39.0446 33.8666 36.9912 31.9199C34.9379 29.9466 33.9112 26.7866 33.9112 22.4399V1.39994H40.1912V23.1199C40.1912 25.3866 40.7246 26.9999 41.7912 27.9599C42.8579 28.9199 44.5646 29.3999 46.9112 29.3999C49.2579 29.3999 50.9512 28.9199 51.9912 27.9599C53.0579 26.9999 53.5912 25.3866 53.5912 23.1199V1.39994H59.8712V22.4399C59.8712 26.8133 58.8446 29.9733 56.7912 31.9199C54.7379 33.8666 51.4446 34.8399 46.9112 34.8399ZM85.1212 34.4399C84.8012 34.0666 84.6412 33.0799 84.6412 31.4799V26.0399C84.6412 23.3999 83.1346 22.0799 80.1212 22.0799H71.6412V34.4399H65.4012V1.39994H80.2412C83.8412 1.39994 86.5212 2.19994 88.2812 3.79994C90.0679 5.37327 90.9612 7.81327 90.9612 11.1199V11.2799C90.9612 15.6799 89.3612 18.3599 86.1612 19.3199C87.7346 19.7733 88.9212 20.6133 89.7212 21.8399C90.5479 23.0666 90.9612 24.5733 90.9612 26.3599V31.4799C90.9612 32.9999 91.1212 33.9866 91.4412 34.4399H85.1212ZM71.6412 16.7999H80.1212C81.6412 16.7999 82.7612 16.4666 83.4812 15.7999C84.2012 15.1333 84.5612 14.0266 84.5612 12.4799V10.7199C84.5612 9.27994 84.1879 8.25327 83.4412 7.63994C82.7212 6.99994 81.5612 6.67994 79.9612 6.67994H71.6412V16.7999ZM126.41 34.4399C126.09 34.0666 125.93 33.0799 125.93 31.4799V26.0399C125.93 23.3999 124.424 22.0799 121.41 22.0799H112.93V34.4399H106.69V1.39994H121.53C125.13 1.39994 127.81 2.19994 129.57 3.79994C131.357 5.37327 132.25 7.81327 132.25 11.1199V11.2799C132.25 15.6799 130.65 18.3599 127.45 19.3199C129.024 19.7733 130.21 20.6133 131.01 21.8399C131.837 23.0666 132.25 24.5733 132.25 26.3599V31.4799C132.25 32.9999 132.41 33.9866 132.73 34.4399H126.41ZM112.93 16.7999H121.41C122.93 16.7999 124.05 16.4666 124.77 15.7999C125.49 15.1333 125.85 14.0266 125.85 12.4799V10.7199C125.85 9.27994 125.477 8.25327 124.73 7.63994C124.01 6.99994 122.85 6.67994 121.25 6.67994H112.93V16.7999ZM137.432 34.4399V1.39994H159.232V6.87994H143.672V15.1999H158.112V20.6399H143.672V28.9599H159.232V34.4399H137.432ZM161.274 34.4399L171.594 1.39994H180.114L190.474 34.4399H183.874L182.274 28.9599H169.434L167.834 34.4399H161.274ZM170.994 23.5199H180.714L176.154 7.87994L175.874 7.03994L175.554 7.87994L170.994 23.5199ZM205.059 34.8399C200.446 34.8399 197.046 33.9066 194.859 32.0399C192.673 30.1466 191.579 27.3466 191.579 23.6399V22.6799H197.939V24.4399C197.939 26.2799 198.499 27.5866 199.619 28.3599C200.739 29.1333 202.593 29.5199 205.179 29.5199C207.339 29.5199 208.899 29.2399 209.859 28.6799C210.846 28.0933 211.339 27.1466 211.339 25.8399V25.1199C211.313 23.8399 210.899 22.8933 210.099 22.2799C209.326 21.6666 207.899 21.1199 205.819 20.6399L199.939 18.9999C194.846 17.5066 192.299 14.5599 192.299 10.1599C192.299 7.17327 193.326 4.90661 195.379 3.35994C197.459 1.78661 200.499 0.99994 204.499 0.99994C208.606 0.99994 211.713 1.82661 213.819 3.47994C215.926 5.10661 216.979 7.47994 216.979 10.5999V11.7599H210.619V10.3599C210.619 8.89327 210.153 7.85327 209.219 7.23994C208.286 6.59994 206.726 6.27994 204.539 6.27994C202.539 6.27994 201.059 6.54661 200.099 7.07994C199.166 7.58661 198.699 8.41327 198.699 9.55994V10.0399C198.699 11.1333 199.113 11.9999 199.939 12.6399C200.766 13.2533 202.019 13.7466 203.699 14.1199L209.619 15.7199C212.366 16.4399 214.406 17.5066 215.739 18.9199C217.073 20.3066 217.739 22.3066 217.739 24.9199C217.739 28.3866 216.726 30.9066 214.699 32.4799C212.699 34.0533 209.486 34.8399 205.059 34.8399ZM235.358 34.8399C230.878 34.8399 227.371 33.4933 224.838 30.7999C222.331 28.0799 221.078 24.5733 221.078 20.2799V15.4799C221.078 11.2133 222.331 7.73327 224.838 5.03994C227.371 2.34661 230.878 0.99994 235.358 0.99994C239.811 0.99994 243.291 2.34661 245.798 5.03994C248.331 7.70661 249.598 11.1866 249.598 15.4799V20.2799C249.598 24.5733 248.331 28.0799 245.798 30.7999C243.291 33.4933 239.811 34.8399 235.358 34.8399ZM227.438 21.0799C227.438 23.5066 228.091 25.5066 229.398 27.0799C230.731 28.6266 232.718 29.3999 235.358 29.3999C237.998 29.3999 239.971 28.6266 241.278 27.0799C242.585 25.5066 243.238 23.5066 243.238 21.0799V14.7199C243.238 12.3466 242.571 10.3733 241.238 8.79994C239.931 7.22661 237.971 6.43994 235.358 6.43994C232.718 6.43994 230.731 7.22661 229.398 8.79994C228.091 10.3466 227.438 12.3199 227.438 14.7199V21.0799ZM254.229 34.4399V1.39994H260.229L274.149 23.6399V1.39994H280.149V34.4399H274.109L260.229 12.1999V34.4399H254.229Z";

/**
 * The compound path split into its individual `M…Z` subpaths (one per glyph
 * contour). Dashing restarts per subpath, so each is animated separately.
 */
const OUTLINE_SUBPATHS = OUTLINE_PATH.match(/M[^M]+/g) ?? [];

export function OurStoryReason() {
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const paths = gsap.utils.toArray<SVGPathElement>(
        "[data-draw]",
        root.current,
      );
      const section = root.current;
      if (!paths.length || !section) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(paths, { drawSVG: "0%" });

        const timeline = gsap.timeline({
          paused: true,
          defaults: { duration: 0.7, ease: "power2.out" },
        });
        // Draw the letters on one after another, left to right.
        timeline.to(paths, { drawSVG: "100%", stagger: 0.06 });

        const observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              timeline.play();
              observer.disconnect();
            }
          },
          // Fire once the band has risen to roughly 72% of the viewport.
          { rootMargin: "0px 0px -28% 0px" },
        );
        observer.observe(section);

        return () => observer.disconnect();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Section
      id="our-reason"
      tone="light"
      padding="none"
      className="pt-20 sm:pt-28"
    >
      {/* No-JS fallback: reveal the outline paths that the stylesheet hides. */}
      <noscript>
        <style>{`[data-draw]{stroke-dasharray:none!important;stroke-dashoffset:0!important}`}</style>
      </noscript>

      <Container>
        {/* Three blocks so the photograph can close the band: heading and copy
            share the first row on desktop, the copy spans both rows, and the
            photograph lands in the second row, flush with the band's bottom
            edge (the Section has no bottom padding). On mobile the blocks stack
            in source order — heading, copy, then the photograph. */}
        <div
          ref={root}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0"
        >
          {/* Headline lockup */}
          <div className="relative lg:col-start-1 lg:row-start-1">
            {/* Decorative dot grid, echoing the prototype */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 right-0 hidden size-20 text-ink-300 sm:block"
              style={{
                backgroundImage:
                  "radial-gradient(currentColor 1.5px, transparent 1.5px)",
                backgroundSize: "20px 20px",
              }}
            />

            <h2 className="flex flex-col items-start font-heading text-display-sm uppercase text-foreground">
              {/* "OUR REASON" — stroke-only type, drawn on scroll */}
              <span className="block">
                <svg
                  viewBox="0 0 282 36"
                  fill="none"
                  role="img"
                  aria-label="Our reason"
                  className="block h-[0.72em] w-auto text-foreground"
                >
                  {OUTLINE_SUBPATHS.map((d, index) => (
                    <path
                      key={index}
                      data-draw
                      d={d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
              </span>

              <span className="mt-[0.08em] block">For being.</span>
            </h2>
          </div>

          {/* Supporting copy */}
          <div className="max-w-xl lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start">
            <p className="text-lg leading-snug font-semibold text-foreground sm:text-xl">
              We exist because silence surrounding gynaecological cancers has
              had devastating consequences, and we are committed to breaking
              that silence through education, advocacy, and prevention.
            </p>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Gynaecological health isn&rsquo;t awkward. It&rsquo;s urgent. There
              are five cancers people with cervixes can develop: cervical,
              ovarian, uterine, vaginal, and vulval cancer. Most people only
              hear about one. And hardly anyone talks about how HPV is the cause
              behind nearly all cervical cancer cases.
            </p>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              For years, conversations about periods, vulvas, and gynaecological
              cancers were avoided, and people paid for it with late diagnoses,
              preventable deaths, and shame they didn&rsquo;t deserve.
            </p>
          </div>

          {/* Arched editorial photograph — closes the band, flush with its
              bottom edge. */}
          <div className="relative aspect-square overflow-hidden rounded-none bg-lavender lg:col-start-1 lg:row-start-2 lg:mt-10">
            <Image
              src="/images/reason.jpg"
              alt="Three women standing close together, looking ahead"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
