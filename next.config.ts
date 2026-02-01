import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // ⚠️ modern is deprecated in newer Next.js
    // remove if you’re on Next 14+
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;
