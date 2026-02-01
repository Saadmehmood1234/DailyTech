import { BlogCard } from "@/components/BlogCard";
import { Badge } from "@/components/ui/badge";
import { fetchBlogCategoryBySlug } from "@/lib/api";
import { BlogType } from "@/types/Types";
import NoBlogs from "@/components/NoBlogs";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: { slug: string };
}


export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = params;

  const BlogData = await fetchBlogCategoryBySlug(slug);
  const category = BlogData?.data?.[0]?.category;

  const title = category
    ? `${category.name} Articles | DailyTech`
    : `Category: ${slug} | DailyTech`;

  const description = category?.description
    ? category.description
    : `Explore the latest blogs, guides, and insights in the ${slug} category on DailyTech.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/category/${slug}`,
    },
    keywords: category
      ? [
          category.name,
          "technology blog",
          "tech news",
          "gadgets",
          "mobile phones",
          "laptops",
          "AI tools",
          "software",
          "coding tutorials",
          "DailyTech",
        ]
      : ["technology blog", "DailyTech", slug],
    openGraph: {
      title,
      description,
      siteName: "DailyTech",
      url: `https://dailtech.in/category/${slug}`,
      type: "website",
      images: [
        {
          url: `https://dailtech.in/og-image.png`,
          width: 1200,
          height: 630,
          alt: `DailyTech | ${category?.name || slug}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://dailtech.in/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}
export default async function CategoryPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const BlogData = await fetchBlogCategoryBySlug(slug);

  if (!BlogData || BlogData.data.length) {
    return (
      <div className="min-h-screen justify-center items-center w-full flex flex-col bg-background font-sans">
        <main className="grow containerz mx-auto px-6 2xl:px-0 max-w-7xl pt-12 pb-20">
          <NoBlogs
            title="No posts found in this category."
            description="Check back later for new content."
          />
        </main>
      </div>
    );
  }

  const category = BlogData.data?.[0]?.category;

  const nonFeaturedBlogs = BlogData.data?.filter(
    (blog: BlogType) => !blog.isFeatured,
  );

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <main className="grow container mx-auto px-6 2xl:px-0 max-w-7xl pt-12 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-4 text-muted-foreground border-muted-foreground/30"
          >
            Category
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-black mb-4 capitalize">
            {category?.name || slug}
          </h1>
          <p className="text-lg text-muted-foreground">
            {category?.description ||
              `Explore our latest thoughts and stories about ${category?.name || slug}.`}
          </p>
        </div>

        <div
          className={`${nonFeaturedBlogs ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12" : ""}`}
        >
          {nonFeaturedBlogs &&
            nonFeaturedBlogs.length > 0 &&
            nonFeaturedBlogs.map((blog: BlogType) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
      </main>
    </div>
  );
}
