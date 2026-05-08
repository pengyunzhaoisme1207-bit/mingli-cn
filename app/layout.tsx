import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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
  title: "MÍNG LÌ — 你的命运，由此可知",
  description:
    "AI 驱动的八字命理分析。融合四柱八字与紫微斗数，四家古典流派交叉验证——30 秒生成你的专属命理报告。",
  openGraph: {
    title: "MÍNG LÌ — 你的命运，由此可知",
    description:
      "AI 驱动的八字命理分析。融合四柱八字与紫微斗数，四家古典流派交叉验证。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
