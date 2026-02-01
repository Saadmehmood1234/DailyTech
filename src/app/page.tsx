import { Home } from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://dailtech.in"),

  title: {
    default: "DailyTech | Mobile, Gadgets, AI & Technology Explained",
    template: "%s | DailyTech",
  },

  description:
    "DailyTech brings you the latest technology news, mobile phone reviews, laptop guides, AI tools, software insights, and coding tutorials explained in simple terms.",

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
    google: "google77d08cbc9e81f5ef",
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
    images: [
      {
        url: "https://dailtech.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "DailyTech – Mobile, Gadgets & Technology",
      },
    ],
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

export default function HomePage() {
  return <Home />;
}
