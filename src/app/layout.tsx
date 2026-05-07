import type { Metadata } from "next";
import { Outfit, Noto_Sans_KR, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const notoKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-kr",
});

const notoSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sc",
});

export const metadata: Metadata = {
  title: "TOPIK Vocabulary Bootcamp",
  description: "A gamified Korean vocabulary learning platform for TOPIK learners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${notoKR.variable} ${notoSC.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
