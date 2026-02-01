import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DailyTech | Tech News, Gadgets, AI & Software Insights",
  description:
    "Learn about DailyTech – our mission to provide accurate, easy-to-understand technology content covering mobile phones, laptops, AI tools, software, coding, and the latest tech trends.",
  alternates: {
    canonical: "https://dailtech.in/about",
  },
  openGraph: {
    title: "About DailyTech | Technology Made Simple",
    description:
      "Discover DailyTech’s vision, motivation, and commitment to delivering trusted tech content on mobiles, laptops, AI, software, and modern technology.",
    url: "https://dailtech.in/about",
    siteName: "DailyTech",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About DailyTech | Technology Made Simple",
    description:
      "DailyTech shares reliable tech news, gadget guides, AI tools, and software insights for modern users.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const AboutUs = async () => {

  return (
    <div className="max-w-7xl mx-auto p-6 2xl:px-0">
      <h1 className="text-3xl font-bold mb-4">About DailyTech</h1>
      <p className="mb-4">
        DailyTech is your go-to source for the latest technology news,
        tutorials, and insights.
      </p>
      <p className="mb-4">
        Our mission is to deliver reliable, easy-to-understand content for tech
        enthusiasts around the world.
      </p>
      <p>
        Contact us at{" "}
        <a href="mailto:mehmoodsaad347@gmail.com" className="text-blue-600">
          mehmoodsaad347@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default AboutUs;
