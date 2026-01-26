"use client";

import { Menu, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogType, Category } from "@/types/Types";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";

type Props = {
  categories: Category[];
};

export default function NavbarClient({ categories }: Props) {
  const location = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<BlogType[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) return;

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs?search=${debouncedQuery}&limit=5`,
          { signal: controller.signal },
        );
        const data = await res.json();
        setSuggestions(data.data || []);
      } catch {
        console.error("Search failed");
      }
    };

    fetchSuggestions();
    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <nav className="glass-nav 2xl:px-0 border-b border-border w-full max-w-7xl py-4 px-6 flex justify-between lg:justify-start items-center">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-xl cursor-pointer font-display font-black"
        >
          <Image src="/logo.png" width={50} height={50} alt="DailyTech." />
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/" passHref>
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 cursor-pointer  ${
                location === "/" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Home
            </Button>
          </Link>

          {categories.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2 cursor-pointer gap-1 text-muted-foreground hover:text-foreground"
                >
                  Categories
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {categories.map((cat) => (
                  <DropdownMenuItem key={cat._id} asChild>
                    <Link
                      href={`/blog/category/${cat.slug}`}
                      className="cursor-pointer"
                    >
                      {cat.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className="max-sm:ml-2 ml-6 flex relative max-w-96 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <input
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            if (!value.trim()) {
              setSuggestions([]);
            }
          }}
          placeholder="Search blogs..."
          className="pl-9 pr-4 py-2 bg-secondary/50 rounded-full text-sm w-full"
        />

        {suggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-background border rounded-md shadow-lg z-99">
            {suggestions.map((blog) => (
              <Link
                key={blog._id}
                href={`/blog/${blog.slug}`}
                onClick={() => {
                  setQuery("");
                  setSuggestions([]);
                }}
                className="block px-4 py-2 text-sm hover:bg-secondary"
              >
                {blog.title}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-6 text-left">
              <SheetTitle className="font-display font-bold text-2xl">
                DailyTech.
              </SheetTitle>
            </SheetHeader>
            <div className="flex p-4 flex-col gap-4 text-lg">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="font-medium cursor-pointer hover:text-primary"
              >
                Home
              </Link>
              {categories?.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/blog/category/${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
