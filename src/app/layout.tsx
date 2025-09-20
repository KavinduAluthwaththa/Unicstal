import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import GlobalCustomBackground from '@/components/GlobalCustomBackground';

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "UNICSTAL - Manifest Your Dreams with Crystal Power",
  description: "Align your energy, raise your vibration, and attract abundance with our curated collection of healing crystals. One Crystal at a time.",
  keywords: "crystals, healing stones, manifestation, spiritual wellness, energy alignment",
  authors: [{ name: "UNICSTAL Team" }],
  openGraph: {
    title: "UNICSTAL - Crystal Manifestation & Healing",
    description: "Discover the power of crystals for manifestation and spiritual growth",
    url: "https://unicstal.com",
    siteName: "UNICSTAL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UNICSTAL - Crystal Manifestation & Healing",
    description: "Discover the power of crystals for manifestation and spiritual growth",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <GlobalCustomBackground />
        {children}
      </body>
    </html>
  );
}
