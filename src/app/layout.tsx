import "./globals.css";

import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://dailtech.in"),
  title: {
    default: "DailyTech | Mobile, Gadgets, AI & Technology Explained",
    template: "%s | DailyTech",
  },
  description:
    "DailyTech provides the latest technology news, mobile phone reviews, laptop guides, AI tools, software insights, and coding tutorials explained in simple terms.",
  keywords: [
    "technology blog",
    "tech news",
    "mobile phones",
    "laptops",
    "gadgets",
    "AI tools",
    "software reviews",
    "coding tutorials",
    "tech guides",
    "DailyTech",
  ],
  verification: {
    google: "/google77d08cbc9e81f5ef.html",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "DailyTech | Technology Made Simple",
    description:
      "Stay updated with DailyTech for mobile reviews, laptop guides, AI tools, software tips, and practical technology insights.",
    siteName: "DailyTech",
    url: "https://dailtech.in",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "DailyTech | Technology Made Simple",
    description:
      "DailyTech shares easy-to-understand technology news, gadget reviews, AI tools, and coding guides.",
    images: ["https://dailtech.in/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col justify-center items-center">
          <Analytics />
          <Navbar />
        </div>
        <main className="min-h-screen">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
