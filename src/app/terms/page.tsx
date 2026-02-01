import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | DailyTech",
  description:
    "Read DailyTech’s Terms of Service to understand the rules, responsibilities, and conditions for using our technology news and content platform.",
  alternates: {
    canonical: "https://dailtech.in/terms",
  },

  openGraph: {
    title: "Terms of Service | DailyTech",
    description:
      "Official Terms of Service for DailyTech. Learn about content usage, responsibilities, and legal conditions for accessing our website.",
    url: "https://dailtech.in/terms",
    siteName: "DailyTech",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Terms of Service | DailyTech",
    description:
      "DailyTech Terms of Service outlining rules, content usage, and responsibilities for users.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const TermsOfService = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 2xl:px-0">
      <h1 className="text-3xl font-bold mb-4">DailyTech Terms of Service</h1>
      <p className="mb-4">
        Welcome to DailyTech. By accessing or using our website, you agree to the following terms:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>You will not misuse our services or post harmful content.</li>
        <li>We are not liable for any indirect damages from using DailyTech.</li>
        <li>All content is protected by copyright law.</li>
      </ul>
      <p>
        These terms may be updated from time to time. Please check this page periodically for updates.
      </p>
    </div>
  );
};

export default TermsOfService;
