import type { Metadata } from "next";
import { Archivo, Geist_Mono, Inter, Playfair_Display } from "next/font/google";

import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { SmoothScroll } from "@/components/smooth-scroll";

import "./globals.css";

/**
 * Type roles for Purple Project.
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
    default: "Purple Project — Design System",
    template: "%s · Purple Project",
  },
  description:
    "Design tokens and components for Purple Project, a movement breaking the silence around gynaecological cancer.",
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
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
