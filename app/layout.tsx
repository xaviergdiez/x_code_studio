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
  metadataBase: new URL("https://www.x-code.studio"),
  title: "x-code.studio · Ad-tech production tooling",
  description: "Scripts, templates and pipelines that turn manual ad production into an automated one. Built on 18 years shipping campaigns for BMW, Google and Huawei at Monks.",
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
  title: "x-code.studio · Ad-tech production tooling",
    description: "Scripts, templates and pipelines that turn manual ad production into an automated one. Built on 18 years shipping campaigns for BMW, Google and Huawei at Monks.",
    url: "https://www.x-code.studio",
    siteName: "x-code.studio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "x-code.studio · ad-tech production tooling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  title: "x-code.studio · Ad-tech production tooling",
    description: "Scripts, templates and pipelines that turn manual ad production into an automated one.",
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
