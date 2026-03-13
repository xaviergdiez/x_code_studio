import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "x-code.studio — Tools, Teaching & Automation for Ad-Tech",
  description: "Automation tools, GSAP libraries, DCO blueprints and workshops for agencies. Built by a NEOLAND teacher with 18+ years in ad-tech.",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "x-code.studio — Tools, Teaching & Automation for Ad-Tech",
    description: "Automation tools, GSAP libraries, DCO blueprints and workshops for agencies. Built by a NEOLAND teacher with 18+ years in ad-tech.",
    url: "https://www.x-code.studio",
    siteName: "x-code.studio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "x-code.studio — Strategic AdTech Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "x-code.studio — Tools, Teaching & Automation for Ad-Tech",
    description: "Automation tools, GSAP libraries, DCO blueprints and workshops. Not a consultancy — just tools that solve real production problems.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
