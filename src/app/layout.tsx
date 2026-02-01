import "./globals.css";

import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "TechBlog – Mobile, Gadgets & Technology",
  description:
    "Latest mobile launches, best phones, gadgets, processors and tech explained.",
  verification: {
    google: "google77d08cbc9e81f5ef",
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
