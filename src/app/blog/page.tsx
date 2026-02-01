import { BlogCard } from "@/components/BlogCard";
import { fetchBlogCategory, fetchBlogs } from "@/lib/api";
import { BlogType } from "@/types/Types";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Blog | Latest Technology News, AI, Gadgets & Coding – DailyTech",
  description:
    "Explore the latest technology blogs on DailyTech covering mobile phones, laptops, AI tools, software, coding tutorials, and useful tech guides for beginners and professionals.",
  alternates: {
    canonical: "https://dailtech.in/blog",
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
    title: "DailyTech Blog | Latest Tech News, AI & Gadgets",
    description:
      "Stay updated with DailyTech blogs featuring mobile reviews, laptop guides, AI tools, software tips, and coding insights.",
    url: "https://dailtech.in/blog",
    siteName: "DailyTech",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "DailyTech Blog | Technology Made Simple",
    description:
      "Read the latest blogs on technology, gadgets, AI, software, and coding on DailyTech.",
    images: ["https://dailtech.in/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function Blog() {
  const [blogsData, categoryData] = await Promise.all([
    fetchBlogs(),
    fetchBlogCategory(),
  ]);
  const blogs = blogsData.data.filter((blog: BlogType) => !blog.isFeatured);
  const category = categoryData.data;
  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-75 text-muted-foreground">
        No blogs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full p-8">
      <div className="flex justify-start space-y-4 gap-4 flex-wrap w-full max-w-7xl">
        {category &&
          category?.map((cat) => (
            <Link href={`/category/${cat.slug}`} key={cat._id}>
              <span className="border-input border-2 hover:bg-secondary px-4 py-2 rounded-full text-center cursor-pointer">
                {cat.name}
              </span>
            </Link>
          ))}
      </div>
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.length > 0 &&
          blogs.map((blog) => (
            <div key={blog._id}>
              <BlogCard blog={blog} />
            </div>
          ))}
      </div>
    </div>
  );
}
