import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dailtech.in";
  const staticPages = [
    "",
    "/blog",
    "/about",
    "/privacy-policy",
    "/terms-of-service",
  ];

  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  // ⚠️ Optional: Dynamic blog URLs
  // Uncomment when you want to include blogs
  /*
  const blogsRes = await fetch("https://your-api/blogs", {
    cache: "no-store",
  });
  const blogs = await blogsRes.json();

  const blogUrls = blogs.map((blog: any) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  */

  return [...staticUrls /*, ...blogUrls */];
}
