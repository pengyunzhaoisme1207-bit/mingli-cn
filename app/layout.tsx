import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MÍNG LÌ — Your Destiny, Decoded",
  description:
    "AI-powered Chinese astrology reading. Get a comprehensive Bazi + Zi Wei Dou Shu destiny report analyzed by four classical schools — delivered instantly in your browser.",
  openGraph: {
    title: "MÍNG LÌ — Your Destiny, Decoded",
    description:
      "AI-powered Chinese astrology reading. Get a comprehensive Bazi + Zi Wei Dou Shu destiny report.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7338826858147459"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
