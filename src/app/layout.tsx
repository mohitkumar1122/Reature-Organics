import React, { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
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
    siteName: "Reature Organic",
    images: [
      {
        url: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Reature Organic - Pure Ayurvedic Wellness",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#F8FAF7] text-[#1A1A1A]">
        <CartProvider>
          <Suspense fallback={<div className="h-20 bg-white border-b border-gray-100" />}>
            <Navbar />
          </Suspense>
          <main className="flex-grow pt-20 md:pt-24">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
