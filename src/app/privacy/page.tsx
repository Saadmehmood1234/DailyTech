import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DailyTech",
  description:
    "Read DailyTech’s Privacy Policy to understand how we collect, use, and protect your personal information while you use our technology content and services.",
  alternates: {
    canonical: "https://dailtech.in/privacy",
  },
  keywords: [
    "technology blog",
    "tech news",
    "AI tools",
    "mobile phones",
    "laptops",
    "gadgets",
    "software reviews",
    "coding tutorials",
    "developer tools",
    "tech guides",
    "DailyTech",
  ],

  openGraph: {
    title: "Privacy Policy | DailyTech",
    description:
      "DailyTech Privacy Policy explains how user data, cookies, and analytics information are collected and protected.",
    url: "https://dailtech.in/privacy",
    siteName: "DailyTech",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Privacy Policy | DailyTech",
    description:
      "Learn how DailyTech handles user data, privacy, cookies, and analytics responsibly.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const PrivacyPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 2xl:px-0">
      <h1 className="text-3xl font-bold mb-4">DailyTech Privacy Policy</h1>
      <p className="mb-4">
        DailyTech respects your privacy and is committed to protecting your
        personal information.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Name, email, and contact information</li>
        <li>Usage and analytics data</li>
        <li>Cookies and tracking technologies</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">How We Use Your Data</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To provide and improve our services</li>
        <li>To communicate updates and newsletters</li>
        <li>To personalize your experience on DailyTech</li>
      </ul>
      <p>
        By using DailyTech, you agree to this privacy policy. For questions,
        contact us at{" "}
        <a href="mailto:mehmoodsaad347@gmail.com" className="text-blue-600">
          mehmoodsaad347@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
