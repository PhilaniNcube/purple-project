"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

import { Container, Script, Section } from "@/components/ds";

gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger);

/**
 * "Share the knowledge. Protect women."
 *
 * A full-bleed brand band whose backdrop is the four-leaf clover artwork from
 * the prototype. The clover is decorative and scroll-linked: a scrubbed
 * ScrollTrigger grows it as the band travels through the viewport, so its
 * leaves spill past the band and overlap the sections above and below.
 *
 * Two details make that spill work:
 *
 * - The band carries a stacking context (`isolate` + `z-10`), which lifts it —
 *   and therefore the clover bleeding out of it — above its neighbouring
 *   sections, while the clover's own `-z-10` still keeps it behind this band's
 *   headline. Overflow is clipped on the x-axis only (`overflow-x-clip`), so
 *   the enlarged artwork can bleed vertically but can never create a sideways
 *   scrollbar.
 * - `perspective` on the clover layer gives the scrubbed `rotateX` real depth,
 *   and `will-change: transform` keeps the animated SVG on its own compositor
 *   layer so the scrub stays smooth.
 *
 * The headline mirrors `straight-from`: "SHARE THE KNOWLEDGE." is the outline
 * SVG from `public/images/SHARE THE KNOWLEDGE.svg`, split into its `M…Z`
 * subpaths and drawn on with DrawSVGPlugin as the band scrolls in, followed by
 * the italic serif accent at the same `text-script-xl` size.
 */

/**
 * Clover geometry, from `public/images/clover.svg`. That export's own viewBox
 * (1134 × 806) crops the top and bottom leaves, so this component uses a
 * viewBox fitted to the path's true bounds (`x 64→1070`, `y -83.5→889.5`) with
 * an even margin, showing the whole clover.
 */
const CLOVER_PATH =
  "M566.987 639.726C510.037 740.145 413.576 903.243 294.877 888.575C254.257 883.562 219.669 863.059 200.097 834.996C175.069 799.086 170.761 759.107 181.88 715.801C105.195 706.391 52.6771 639.706 66.0938 561.804C84.2291 456.66 182.988 421.53 283.757 402.301C177.572 362.939 66.1759 305.58 72.8638 186.836C77.254 108.852 140.645 56.4649 218.274 62.2994C214.786 18.9107 229.598 -19.5475 257.088 -46.5422C284.578 -73.5368 324.541 -86.9725 366.186 -82.6994C482.424 -70.7018 534.163 54.9447 567.028 162.595C599.77 55.0679 651.837 -70.825 767.91 -82.6994C809.35 -86.9315 848.329 -74.3175 876.927 -46.46C905.524 -18.6025 919.146 19.1161 915.741 62.0939C993 56.7525 1056.88 109.057 1061.19 186.754C1067.8 305.786 956.689 362.774 850.298 402.342C949.549 421.612 1046.71 455.016 1067.22 558.106C1082.9 636.912 1030.58 706.638 951.683 715.883C975.398 796.579 929.937 871.893 849.724 887.054C725.567 910.557 629.188 742.898 566.987 639.726Z";

/** Mask-path geometry from the exported "SHARE THE KNOWLEDGE" artwork. */
const OUTLINE_PATH =
  "M61.3866 21.7221H45.9242V16.9766C45.9242 14.762 45.7264 13.3515 45.331 12.7451C44.9355 12.1388 44.2764 11.8356 43.3537 11.8356C42.3518 11.8356 41.5873 12.2442 41.06 13.0615C40.5591 13.8788 40.3086 15.1179 40.3086 16.7788C40.3086 18.9143 40.5986 20.5225 41.1787 21.6034C41.7323 22.6844 43.3009 23.9894 45.8846 25.5185C53.2929 29.9212 57.9593 33.5331 59.8839 36.354C61.8084 39.175 62.7707 43.7228 62.7707 49.9974C62.7707 54.5583 62.2303 57.9197 61.1493 60.0816C60.0948 62.2434 58.0384 64.0625 54.9802 65.5389C51.922 66.9889 48.3628 67.7139 44.3028 67.7139C39.8473 67.7139 36.0377 66.8703 32.874 65.183C29.7367 63.4957 27.6803 61.3471 26.7049 58.737C25.7294 56.127 25.2417 52.4229 25.2417 47.6246V43.4328H40.7041V51.2233C40.7041 53.6224 40.915 55.1647 41.3368 55.8502C41.785 56.5356 42.5628 56.8784 43.67 56.8784C44.7773 56.8784 45.5946 56.4434 46.1219 55.5734C46.6755 54.7033 46.9524 53.4115 46.9524 51.6979C46.9524 47.9278 46.4383 45.4628 45.4101 44.3028C44.3555 43.1428 41.7587 41.205 37.6195 38.4895C33.4804 35.7477 30.7385 33.7572 29.394 32.5181C28.0494 31.279 26.9289 29.5653 26.0326 27.3771C25.1626 25.1889 24.7276 22.3943 24.7276 18.9934C24.7276 14.0897 25.3471 10.5042 26.5862 8.23692C27.8517 5.96962 29.8817 4.20323 32.6763 2.93777C35.4709 1.64593 38.8454 1.00002 42.8 1.00002C47.1237 1.00002 50.8015 1.69866 53.8333 3.09595C56.8916 4.49324 58.9084 6.25962 59.8839 8.3951C60.8857 10.5042 61.3866 14.1029 61.3866 19.1911V21.7221ZM106.311 2.34458V66.3694H89.6619V39.4782H84.6791V66.3694H68.0303V2.34458H84.6791V25.2417H89.6619V2.34458H106.311ZM141.783 2.34458L151.314 66.3694H134.27L133.439 54.8615H127.468L126.479 66.3694H109.237L117.7 2.34458H141.783ZM132.965 43.5119C132.121 36.2618 131.277 27.3112 130.434 16.6602C128.746 28.8931 127.692 37.8436 127.27 43.5119H132.965ZM154.161 2.34458H165.946C173.802 2.34458 179.115 2.64776 181.883 3.25413C184.678 3.8605 186.945 5.41597 188.685 7.92055C190.451 10.3988 191.334 14.3665 191.334 19.8239C191.334 24.8066 190.715 28.1549 189.476 29.8685C188.237 31.5822 185.798 32.6104 182.16 32.9531C185.455 33.7704 187.67 34.8645 188.803 36.2354C189.937 37.6063 190.636 38.8718 190.899 40.0318C191.189 41.1655 191.334 44.316 191.334 49.4833V66.3694H175.872V45.0937C175.872 41.6664 175.595 39.5441 175.042 38.7268C174.514 37.9095 173.104 37.5009 170.81 37.5009V66.3694H154.161V2.34458ZM170.81 13.2988V27.5353C172.682 27.5353 173.987 27.2849 174.725 26.7839C175.49 26.2567 175.872 24.5826 175.872 21.7616V18.242C175.872 16.212 175.503 14.8806 174.765 14.2479C174.053 13.6152 172.735 13.2988 170.81 13.2988ZM197.82 2.34458H225.581V15.1574H214.469V27.298H224.869V39.4782H214.469V53.5565H226.688V66.3694H197.82V2.34458ZM279.364 2.34458V15.1574H269.477V66.3694H252.828V15.1574H242.981V2.34458H279.364ZM321.44 2.34458V66.3694H304.792V39.4782H299.809V66.3694H283.16V2.34458H299.809V25.2417H304.792V2.34458H321.44ZM328.163 2.34458H355.924V15.1574H344.812V27.298H355.213V39.4782H344.812V53.5565H357.032V66.3694H328.163V2.34458ZM40.6646 81.3446L31.134 110.253L41.5741 145.369H24.3716L17.6488 117.925V145.369H1.00002V81.3446H17.6488V106.219L25.0439 81.3446H40.6646ZM81.6736 81.3446V145.369H67.0812L58.4207 116.264V145.369H44.5005V81.3446H58.4207L67.7535 110.174V81.3446H81.6736ZM126.44 118.834C126.44 125.267 126.281 129.828 125.965 132.517C125.675 135.18 124.726 137.618 123.118 139.833C121.536 142.048 119.387 143.748 116.672 144.934C113.956 146.121 110.793 146.714 107.181 146.714C103.753 146.714 100.669 146.16 97.927 145.053C95.2115 143.919 93.0233 142.232 91.3624 139.991C89.7015 137.75 88.7128 135.312 88.3965 132.675C88.0801 130.039 87.9219 125.425 87.9219 118.834V107.88C87.9219 101.447 88.0669 96.8993 88.3569 94.2365C88.6733 91.5474 89.6224 89.0956 91.2042 86.881C92.8124 84.6664 94.9743 82.966 97.6897 81.7796C100.405 80.5932 103.569 80 107.181 80C110.608 80 113.679 80.5668 116.395 81.7005C119.137 82.8078 121.338 84.4819 122.999 86.7228C124.66 88.9638 125.649 91.4024 125.965 94.0388C126.281 96.6752 126.44 101.289 126.44 107.88V118.834ZM109.791 97.7957C109.791 94.8165 109.619 92.9183 109.277 92.1011C108.96 91.2574 108.288 90.8356 107.26 90.8356C106.39 90.8356 105.718 91.1783 105.243 91.8638C104.795 92.5229 104.571 94.5002 104.571 97.7957V127.692C104.571 131.41 104.716 133.703 105.006 134.573C105.322 135.443 106.034 135.878 107.141 135.878C108.275 135.878 109 135.377 109.316 134.376C109.633 133.374 109.791 130.988 109.791 127.218V97.7957ZM195.329 81.3446L187.933 145.369H167.132C165.234 135.536 163.56 124.357 162.11 111.834C161.451 117.186 159.909 128.365 157.483 145.369H136.801L129.366 81.3446H145.54L147.241 103.688L148.981 125.241C149.587 114.089 151.116 99.4566 153.568 81.3446H170.889C171.126 83.2164 171.733 90.2556 172.708 102.462L174.527 126.783C175.45 111.307 176.992 96.1611 179.154 81.3446H195.329ZM215.299 81.3446V132.557H225.423V145.369H198.65V81.3446H215.299ZM229.496 81.3446H257.257V94.1574H246.145V106.298H256.546V118.478H246.145V132.557H258.365V145.369H229.496V81.3446ZM263.189 81.3446H275.646C283.687 81.3446 289.118 81.7137 291.939 82.4519C294.786 83.1901 296.948 84.4028 298.425 86.0901C299.901 87.7774 300.824 89.6624 301.193 91.7451C301.562 93.8015 301.747 97.8616 301.747 103.925V126.348C301.747 132.095 301.47 135.944 300.916 137.895C300.389 139.82 299.453 141.336 298.108 142.443C296.764 143.524 295.103 144.288 293.126 144.737C291.148 145.158 288.169 145.369 284.188 145.369H263.189V81.3446ZM279.838 92.2988V134.415C282.237 134.415 283.714 133.941 284.267 132.992C284.821 132.016 285.098 129.393 285.098 125.122V100.248C285.098 97.3475 285.005 95.4888 284.821 94.6715C284.636 93.8543 284.215 93.2611 283.555 92.892C282.896 92.4965 281.657 92.2988 279.838 92.2988ZM346.157 104.914H329.508V99.1007C329.508 95.4361 329.35 93.1424 329.033 92.2197C328.717 91.297 327.966 90.8356 326.779 90.8356C325.751 90.8356 325.052 91.2311 324.683 92.022C324.314 92.8129 324.13 94.8429 324.13 98.112V128.839C324.13 131.713 324.314 133.611 324.683 134.534C325.052 135.43 325.79 135.878 326.898 135.878C328.111 135.878 328.928 135.364 329.35 134.336C329.798 133.308 330.022 131.304 330.022 128.325V120.732H326.66V111.004H346.157V145.369H335.677L334.135 140.782C333.001 142.759 331.564 144.249 329.824 145.251C328.111 146.226 326.08 146.714 323.734 146.714C320.94 146.714 318.316 146.042 315.864 144.697C313.439 143.326 311.594 141.639 310.328 139.635C309.063 137.632 308.272 135.536 307.955 133.347C307.639 131.133 307.481 127.824 307.481 123.421V104.4C307.481 98.2834 307.81 93.8411 308.469 91.0729C309.128 88.3047 311.013 85.7737 314.124 83.4801C317.262 81.16 321.309 80 326.265 80C331.142 80 335.189 81.0018 338.406 83.0055C341.622 85.0092 343.718 87.3951 344.693 90.1633C345.669 92.9052 346.157 96.8993 346.157 102.146V104.914ZM352.642 81.3446H380.403V94.1574H369.291V106.298H379.692V118.478H369.291V132.557H381.511V145.369H352.642V81.3446ZM396.499 132.319V145.369H384.437V132.319H396.499Z";

/**
 * The compound path split into its individual `M…Z` subpaths (one per glyph
 * contour). Dashing restarts per subpath, so each is animated separately.
 */
const OUTLINE_SUBPATHS = OUTLINE_PATH.match(/M[^M]+/g) ?? [];

export function ShareTheKnowledge() {
  const root = React.useRef<HTMLDivElement>(null);

  // Keep ScrollTrigger's measurements in step with Lenis' smooth scroll.
  const syncScrollTrigger = React.useCallback(() => ScrollTrigger.update(), []);
  useLenis(syncScrollTrigger);

  useGSAP(
    () => {
      const clover = root.current?.querySelector<SVGElement>("[data-clover]");
      const paths = gsap.utils.toArray<SVGPathElement>("[data-draw]", root.current);
      const section = root.current?.closest("section") ?? root.current;
      if (!clover || !root.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // --- Clover: grows as the band rises into view ---------------------
        // Growth runs from the moment the section enters the viewport until
        // its bottom is 110vh from the bottom of the screen, then it holds.
        if (section) {
          gsap.fromTo(
            clover,
            { scale: 0.15, rotateX: 32, yPercent: 6, transformOrigin: "50% 50%" },
            {
              scale: 1,
              rotateX: 0,
              yPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom bottom+=110vh",
                scrub: true,
              },
            },
          );
        }

        // --- Outline headline: drawn on as the band scrolls in -------------
        if (paths.length) {
          gsap.set(paths, { drawSVG: "0%" });

          const timeline = gsap.timeline({
            paused: true,
            defaults: { duration: 0.6, ease: "power2.out" },
          });
          // Draw the letters on one after another, left to right.
          timeline.to(paths, { drawSVG: "100%", stagger: 0.05 });

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
          if (section) observer.observe(section);

          return () => observer.disconnect();
        }
      });

      // Reduced motion: a single, static clover drawn in full.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(clover, { scale: 1 });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Section
      id="knowledge"
      tone="brand"
      className="isolate z-10 flex min-h-[80svh] items-center overflow-x-clip bg-brand-400 text-white"
    >
      {/* No-JS fallback: reveal the outline paths that the stylesheet hides. */}
      <noscript>
        <style>{`[data-draw]{stroke-dasharray:none!important;stroke-dashoffset:0!important}`}</style>
      </noscript>

      <div ref={root} className="relative w-full">
        {/* Clover backdrop — grows and spills on scroll. Horizontal overflow is
            clipped at the band edge so the enlarged artwork can't create a
            sideways scrollbar; vertical overflow stays visible so the leaves
            still spill onto the bands above and below. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center [perspective:1000px] will-change-transform"
        >
          <svg
            data-clover
            viewBox="14 -134 1106 1074"
            className="h-[95svh] w-auto max-w-none shrink-0 will-change-transform"
          >
            <path
              d={CLOVER_PATH}
              fill="currentColor"
              className="text-brand-800"
            />
          </svg>
        </div>

        {/* Headline lockup */}
        <Container className="relative flex flex-col items-center text-center">
          {/* "SHARE THE KNOWLEDGE." — stroke-only type, drawn on scroll. Given
              its own fluid size with a 24px ceiling so it sits close in scale
              to the "Protect women." accent; `max-w-full` lets it shrink rather
              than overflow on narrow viewports. */}
          <span className="block text-[clamp(1rem,0.7rem+1vw,1.5rem)]">
            <svg
              viewBox="0 0 398 148"
              fill="none"
              role="img"
              aria-label="Share the knowledge."
              className="mx-auto block h-auto w-[16.5em] max-w-full"
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

          <Script size="lg" className="mt-2 block sm:mt-3">
            Protect women.
          </Script>
        </Container>
      </div>
    </Section>
  );
}
