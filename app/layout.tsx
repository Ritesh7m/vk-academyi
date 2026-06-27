import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import AnnouncementMarquee from "@/components/ui/AnnouncementMarquee";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"] 
});

export const metadata: Metadata = {
  title: "VK Academy | Build Your Future",
  description: "Experience world-class coaching with modern technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} min-h-screen flex flex-col antialiased`}>
        <AnnouncementMarquee />
        <Navbar />
        <main className="flex-grow pb-20 lg:pb-0">{children}</main>
        <FloatingWhatsApp />
        <Footer />

        {/*
          ── PREMIUM VISUAL OVERLAYS ─────────────────────────────────
          Placed LAST in the DOM so they naturally sit above all page
          content in stacking order. pointer-events:none on every
          element — zero interference with clicks, scroll, or touch.
        */}

        {/* 1. SVG filter bank — hidden 0×0, defines grain filter in the
               real DOM (Chrome supports this; data-URI SVG filters are blocked) */}
        <svg
          aria-hidden="true"
          focusable="false"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        >
          <defs>
            <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%"
                    colorInterpolationFilters="sRGB">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
        </svg>

        {/* 2. Grain texture — references the DOM filter above */}
        <div aria-hidden="true" className="grain-overlay" />

        {/* 3. Grid lines + dot grid */}
        <div aria-hidden="true" className="dot-grid-overlay" />

        {/* 4. Edge vignette */}
        <div aria-hidden="true" className="vignette-overlay" />
      </body>
    </html>
  );
}