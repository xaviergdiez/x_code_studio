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
  title: "x-code.studio - Technical Director as a Service",
  description: "Technical Director as a Service - Bridging the Design-Dev Gap",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "x-code.studio",
    description: "Technical Director as a Service - Bridging the Design-Dev Gap",
    url: "https://www.x-code.studio",
    siteName: "x-code.studio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "x-code.studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "x-code.studio",
    description: "Technical Director as a Service",
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
      >
        {children}
      </body>
    </html>
  );
}
