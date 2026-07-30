"use client";

import {
  Menu,
  Search,
  ChevronDown,
  LayoutDashboard,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // ← use Dialog
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
import { API_BASE_URL } from "@/lib/ApiBaseUrl";

type Props = {
  categories: Category[];
  isAuthenticated: boolean;
};

export default function NavbarClient({ categories, isAuthenticated }: Props) {
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
          `${API_BASE_URL}/api/v1/blogs?search=${debouncedQuery}&limit=5`,
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
    <nav className="glass-nav 2xl:px-0 border-b border-border w-full max-w-7xl py-4 px-6 flex items-center gap-4">
      <div className="flex items-center gap-8 shrink-0">
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
              className={`px-2 cursor-pointer ${
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

      <div className="flex-1 flex justify-center min-w-0">
        <div className="relative w-full max-w-xs">
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
            className="pl-9 pr-4 py-1 sm:py-2 bg-secondary/50 rounded-full text-sm w-full"
          />

          {suggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              {suggestions.slice(0, 5).map((blog) => (
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
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <Link
          href={isAuthenticated ? "/admin/analytics" : "/admin/auth/signin"}
        >
          <Button size="sm" className="hidden sm:flex gap-2 rounded-full">
            {isAuthenticated ? (
              <LayoutDashboard className="h-4 w-4" />
            ) : (
              <LogIn className="h-4 w-4" />
            )}
            {isAuthenticated ? "Dashboard" : "Login"}
          </Button>
        </Link>

        {/* Mobile menu → Dialog (centered) */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto p-6 rounded-lg">
            <DialogHeader className="text-left">
              <DialogTitle className="font-display font-bold text-2xl">
                DailyTech.
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 text-lg mt-4">
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
              <Link
                href={
                  isAuthenticated ? "/admin/analytics" : "/admin/auth/signin"
                }
                onClick={() => setIsOpen(false)}
              >
                <Button className="w-full rounded-full cursor-pointer gap-2">
                  {isAuthenticated ? (
                    <LayoutDashboard className="h-4 w-4" />
                  ) : (
                    <LogIn className="h-4 w-4" />
                  )}
                  {isAuthenticated ? "Dashboard" : "Login"}
                </Button>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
}
