import React, { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

// Body Font - Modern, Clean, Highly Readable
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  preload: true,
});

// Heading Font - Premium Editorial Serif with Beautiful Italics
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "ReaTure - Premium Ayurvedic & Herbal Wellness Store",
    template: "%s | ReaTure",
  },
  description:
    "Experience premium Ayurvedic medicines, herbal supplements, digestive wellness, skin care, and immunity boosters verified by heritage wisdom and medical science.",
  metadataBase: new URL("http://localhost:3000"),
  icons: {
    icon: "/icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://reatureorganic.com",
    siteName: "ReaTure Organic Pvt Ltd",
    images: [
      {
        url: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "ReaTure Organic - Pure Ayurvedic Wellness",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#00843D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col bg-lightBg text-darkText font-sans">
        <CartProvider>
          <Suspense
            fallback={
              <div className="h-20 bg-white border-b border-gray-100" />
            }
          >
            <Navbar />
          </Suspense>
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
