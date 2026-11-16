import Link from "next/link";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

/** The symptoms the band asks people to take seriously. */
const SIGNS = [
  "Unusual vaginal bleeding or discharge",
  "Bleeding during intercourse",
  "Bleeding after menopause",
  "Lower abdominal pain that won't go away",
  "Urinary or bowel changes",
  "Bloating that lingers",
  "Abnormal growths on the vulva",
];


export function Signs() {
  return (
    <Section
      id="signs"
      tone="light"
      padding="none"
      className="isolate overflow-hidden bg-mist"
    >
      <div className="grid lg:grid-cols-[43%_1fr]">
        {/* Anatomical illustration of the uterus, fallopian tubes and ovaries. */}
        <div className="relative flex aspect-3/2 w-full items-center justify-center overflow-hidden lg:aspect-auto lg:h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 660"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="uterusOuter" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#8B46E5" />
                <stop offset="100%" stopColor="#5E17EB" />
              </linearGradient>

              <linearGradient id="uterusCavity" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#C9A9F5" />
                <stop offset="100%" stopColor="#9F6EE6" />
              </linearGradient>

              <linearGradient id="ovaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EDE4FC" />
                <stop offset="100%" stopColor="#C8ACEF" />
              </linearGradient>

              <radialGradient id="softGlow" cx="50%" cy="48%" r="44%">
                <stop offset="0%" stopColor="#8B46E5" stopOpacity="0.16" />
                <stop offset="70%" stopColor="#8B46E5" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#8B46E5" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g transform="translate(0, -50)">
              {/* Subtle ambient backdrop glow */}
              <circle cx="400" cy="375" r="285" fill="url(#softGlow)" />
              <circle
                cx="400"
                cy="375"
                r="215"
                stroke="#8B46E5"
                strokeOpacity="0.14"
                strokeWidth="2"
                strokeDasharray="6 8"
              />

              {/* Broad ligament / subtle anatomical backdrop wing */}
              <path
                d="M 225 305 Q 285 370 345 425 L 455 425 Q 515 370 575 305 Q 520 260 465 270 L 335 270 Q 280 260 225 305 Z"
                fill="#8B46E5"
                fillOpacity="0.07"
              />

              {/* Ovarian ligaments connecting the ovaries to the uterus */}
              <path
                d="M 325 305 Q 268 318 225 305"
                stroke="#9F6EE6"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 475 305 Q 532 318 575 305"
                stroke="#9F6EE6"
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* Ovaries */}
              <g id="ovaries">
                {/* Left ovary */}
                <ellipse
                  cx="205"
                  cy="305"
                  rx="44"
                  ry="28"
                  transform="rotate(-12 205 305)"
                  fill="url(#ovaryGrad)"
                  stroke="#6219D0"
                  strokeWidth="5"
                />
                <circle cx="192" cy="300" r="6" fill="#8B46E5" fillOpacity="0.45" />
                <circle cx="212" cy="296" r="8" fill="#8B46E5" fillOpacity="0.35" />
                <circle cx="220" cy="312" r="5" fill="#8B46E5" fillOpacity="0.45" />
                <circle cx="182" cy="314" r="4" fill="#8B46E5" fillOpacity="0.35" />

                {/* Right ovary */}
                <ellipse
                  cx="595"
                  cy="305"
                  rx="44"
                  ry="28"
                  transform="rotate(12 595 305)"
                  fill="url(#ovaryGrad)"
                  stroke="#6219D0"
                  strokeWidth="5"
                />
                <circle cx="608" cy="300" r="6" fill="#8B46E5" fillOpacity="0.45" />
                <circle cx="588" cy="296" r="8" fill="#8B46E5" fillOpacity="0.35" />
                <circle cx="580" cy="312" r="5" fill="#8B46E5" fillOpacity="0.45" />
                <circle cx="618" cy="314" r="4" fill="#8B46E5" fillOpacity="0.35" />
              </g>

              {/* Fallopian tubes, fimbriae and outer uterus body */}
              <path
                d="M 400 185 C 442 185, 472 198, 492 214 C 535 196, 595 190, 632 222 C 662 248, 668 292, 642 320 C 635 328, 622 332, 616 324 C 610 318, 622 308, 616 302 C 610 296, 598 308, 592 300 C 586 292, 602 282, 598 274 C 594 266, 578 274, 576 264 C 574 254, 592 252, 598 246 C 584 226, 540 228, 496 248 C 492 285, 478 335, 458 380 C 444 412, 438 445, 438 478 C 438 515, 434 548, 430 572 C 428 584, 415 590, 400 590 C 385 590, 372 584, 370 572 C 366 548, 362 515, 362 478 C 362 445, 356 412, 342 380 C 322 335, 308 285, 304 248 C 260 228, 216 226, 202 246 C 208 252, 226 254, 224 264 C 222 274, 206 266, 202 274 C 198 282, 214 292, 208 300 C 202 308, 190 296, 184 302 C 178 308, 190 318, 184 324 C 178 332, 165 328, 158 320 C 132 292, 138 248, 168 222 C 205 190, 265 196, 308 214 C 328 198, 358 185, 400 185 Z"
                fill="url(#uterusOuter)"
                stroke="#4A12A6"
                strokeWidth="5"
                strokeLinejoin="round"
              />

              {/* Inner uterine cavity (endometrium) */}
              <path
                d="M 400 226 C 430 226, 455 232, 468 238 C 462 275, 446 330, 426 378 C 416 402, 412 432, 412 465 C 412 475, 406 482, 400 482 C 394 482, 388 475, 388 465 C 388 432, 384 402, 374 378 C 354 330, 338 275, 332 238 C 345 232, 370 226, 400 226 Z"
                fill="url(#uterusCavity)"
                stroke="#F3EEFA"
                strokeWidth="3"
              />

              {/* Cervical and vaginal canal fold lines */}
              <path d="M 400 482 L 400 584" stroke="#F3EEFA" strokeWidth="4" strokeLinecap="round" />
              <path
                d="M 382 508 Q 400 516 418 508"
                stroke="#D8C2F8"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 380 532 Q 400 540 420 532"
                stroke="#D8C2F8"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 382 556 Q 400 564 418 556"
                stroke="#D8C2F8"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Highlights on the fundus and fallopian tubes */}
              <path
                d="M 345 206 Q 400 196 455 206"
                stroke="#D8C2F8"
                strokeWidth="4"
                strokeLinecap="round"
                strokeOpacity="0.6"
              />
              <path
                d="M 295 224 Q 235 205 186 232"
                stroke="#D8C2F8"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeOpacity="0.55"
              />
              <path
                d="M 505 224 Q 565 205 614 232"
                stroke="#D8C2F8"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeOpacity="0.55"
              />
            </g>
          </svg>
        </div>

        <Container
          size="wide"
          className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-0 lg:py-8"
        >
          <div className="lg:pl-6">
            <h2 className="font-heading text-display-sm uppercase">
              <span className="block text-outline-2">Know</span>
              <span className="block text-foreground">The signs.</span>
            </h2>

            <div className="lg:pl-34">
              <p className="mt-8 max-w-xl font-display text-lg leading-snug font-bold italic text-pretty text-foreground">
                Early on, these cancers can be quiet, or look like everyday
                things. These are worth getting checked:
              </p>

              <ul className="mt-6 max-w-xl list-disc space-y-0.5 pl-5 text-sm leading-snug text-ink-800 marker:text-ink-400">
                {SIGNS.map((sign) => (
                  <li key={sign}>{sign}</li>
                ))}
              </ul>

              <p className="mt-6 max-w-xl text-sm leading-relaxed text-pretty text-ink-700">
                Age isn&rsquo;t a reason to brush symptoms aside. Women living
                with HIV have around six times the risk of cervical cancer,
                which makes regular screening especially important. South Africa
                is moving to HPV DNA testing as the main way to screen for
                cervical cancer, so ask your clinic what screening is right for
                you.
              </p>

              <Button
                variant="ghost"
                size="lg"
                nativeButton={false}
                className="mt-6 border border-brand-500 px-6 text-brand-600 hover:bg-brand-500/10 hover:text-brand-700"
                render={<Link href="/resources" />}
              >
                Learn more
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
