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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "A ATELIER | Modern Clothing",
    template: "%s | A ATELIER",
  },

  description:
    "A premium modern clothing label focused on refined design, everyday comfort and timeless essentials.",

  applicationName: "A ATELIER",

  generator: "Next.js",

  keywords: [
    "A ATELIER",
    "clothing",
    "fashion",
    "menswear",
    "womenswear",
    "modern clothing",
    "premium fashion",
    "streetwear",
  ],

  authors: [
    {
      name: "A ATELIER",
    },
  ],

  creator: "A ATELIER",
  publisher: "A ATELIER",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    siteName: "A ATELIER",
    title: "A ATELIER | Modern Clothing",
    description:
      "Premium modern clothing designed for everyday movement.",
    url: "/",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "A ATELIER | Modern Clothing",
    description:
      "Premium modern clothing designed for everyday movement.",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="en"
  data-scroll-behavior="smooth"
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
>
    
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}