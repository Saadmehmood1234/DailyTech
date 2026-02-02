"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import Image from "next/image";

interface MarkdownRendererProps {
  content: string;
}

const markdownComponents: Components = {
  /* ---------- Headings ---------- */
  h1: ({ children }) => (
    <h1 className="mt-6 sm:mt-8 mb-3 sm:mb-4 text-xl sm:text-2xl md:text-4xl font-display font-black leading-tight break-words">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-6 sm:mt-8 mb-3 text-lg sm:text-xl md:text-3xl font-display font-bold break-words">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-5 sm:mt-6 mb-2 text-base sm:text-lg md:text-2xl font-display font-semibold break-words">
      {children}
    </h3>
  ),

  /* ---------- Paragraph ---------- */
  p: ({ children }) => {
    // If the only child is an <img> or <figure>, render it without <p>
    if (
      React.Children.count(children) === 1 &&
      React.isValidElement(children) &&
      (children.type === "img" || children.type === "figure")
    ) {
      return children;
    }
    return (
      <p className="mb-4 sm:mb-5 text-sm sm:text-[15px] md:text-lg leading-relaxed text-foreground/80 break-words">
        {children}
      </p>
    );
  },

  /* ---------- Links ---------- */
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary break-all"
    >
      {children}
    </a>
  ),

  /* ---------- Lists ---------- */
  ul: ({ children }) => (
    <ul className="mb-5 pl-4 sm:pl-5 list-disc space-y-2 text-sm sm:text-base">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 pl-4 sm:pl-5 list-decimal space-y-2 text-sm sm:text-base">
      {children}
    </ol>
  ),

  /* ---------- Tables ---------- */
  /* ---------- Tables (Fully Responsive) ---------- */
  table: ({ children }) => (
    <div className="relative my-5 -mx-4 sm:mx-0 overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full border border-border rounded-lg overflow-hidden text-[11px] sm:text-sm">
          {children}
        </table>
      </div>
    </div>
  ),

  th: ({ children }) => (
    <th
      className="
      bg-muted
      px-3
      py-2
      text-left
      font-semibold
      border-b
      break-words
      whitespace-normal
    "
    >
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td
      className="
      px-3
      py-2
      border-b
      border-border
      wrap-break-words
      whitespace-normal
    "
    >
      {children}
    </td>
  ),

  /* ---------- Images ---------- */
  img: ({ src, alt }) => {
    if (!src) return null;
    const imageSrc = src instanceof Blob ? URL.createObjectURL(src) : src;

    return (
      <figure className="my-6 sm:my-8 w-full">
        <div
          className="
        relative
        mx-auto
        w-full
        sm:w-[80%]
        md:w-[50%]
        bg-muted
        rounded-md
        sm:rounded-xl
        overflow-hidden
      "
        >
          <Image
            src={imageSrc}
            alt={alt || ""}
            width={1000}
            height={1000}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {alt && (
          <figcaption className="mt-2 text-center text-[11px] sm:text-sm text-muted-foreground px-2">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },

  /* ---------- Code ---------- */
  code({ className, children }) {
    const language = className?.replace("language-", "");

    // Inline code
    if (!language) {
      return (
        <code className="rounded bg-muted px-1 py-0.5 text-[11px] sm:text-sm font-mono font-medium text-primary wrap-break-words">
          {children}
        </code>
      );
    }

    return (
      <div className="relative my-5 sm:my-6 w-full rounded-lg sm:rounded-xl bg-[#0d1117] shadow-lg">
        {/* Header */}
        <div className="px-3 py-2 sm:px-4 text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-400 bg-white/5">
          {language}
        </div>

        {/* Scrollable code */}
        <pre className="overflow-x-auto overscroll-x-contain whitespace-pre p-3 sm:p-5 text-[11px] sm:text-sm leading-5 sm:leading-6 text-white">
          <code className="whitespace-pre">{children}</code>
        </pre>
      </div>
    );
  },
};

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <article className="w-full max-w-4xl mx-auto selection:bg-primary/20">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};
