import type { Metadata } from "next";
import { Archivo, Geist_Mono, Inter, Playfair_Display } from "next/font/google";

import { Navigation } from "@/components/navigation";
import { SmoothScroll } from "@/components/smooth-scroll";

import "./globals.css";

/**
 * Type roles for Project Purple.
 * - Inter    -> body copy (`font-sans`)
 * - Archivo  -> heavy uppercase display (`font-heading`)
 * - Playfair -> italic serif accents (`font-display`)
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Project Purple — Design System",
    template: "%s · Project Purple",
  },
  description:
    "Design tokens and components for Project Purple, a movement breaking the silence around gynaecological cancer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} ${playfair.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <SmoothScroll>
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
