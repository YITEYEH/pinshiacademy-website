"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildBlogIndexHref } from "@/lib/blog-index-url";
import { cn } from "@/components/ui/utils";

type BlogPaginationProps = {
  currentPage: number;
  totalPages: number;
  category?: string;
  tag?: string;
};

function getPageNumbers(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, total, current]);
  if (current > 1) pages.add(current - 1);
  if (current < total) pages.add(current + 1);

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(sorted[i]);
  }

  return result;
}

export function BlogPagination({
  currentPage,
  totalPages,
  category,
  tag,
}: BlogPaginationProps) {
  const router = useRouter();
  const [pageInput, setPageInput] = useState(String(currentPage));

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);
  const hrefFor = (page: number) =>
    buildBlogIndexHref({ category, tag, page });

  const goToPage = (raw: string) => {
    const parsed = parseInt(raw, 10);
    if (!Number.isFinite(parsed)) {
      setPageInput(String(currentPage));
      return;
    }
    const next = Math.min(totalPages, Math.max(1, parsed));
    setPageInput(String(next));
    if (next !== currentPage) {
      router.push(hrefFor(next));
    }
  };

  const prevClass =
    "inline-flex shrink-0 items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-2 text-sm text-foreground transition-colors hover:bg-[#f7f9f7] sm:px-4";
  const prevDisabledClass =
    "inline-flex shrink-0 items-center gap-1 rounded-lg border border-border bg-white/50 px-2.5 py-2 text-sm text-muted-foreground opacity-50 sm:px-4";

  return (
    <nav
      className="mt-10 flex items-center justify-between gap-2 sm:justify-center sm:gap-4"
      aria-label="文章分頁"
    >
      {currentPage > 1 ? (
        <Link href={hrefFor(currentPage - 1)} className={prevClass}>
          <ChevronLeft className="h-4 w-4" />
          上一頁
        </Link>
      ) : (
        <span className={prevDisabledClass}>
          <ChevronLeft className="h-4 w-4" />
          上一頁
        </span>
      )}

      {/* 手機：可輸入頁碼跳轉 */}
      <form
        className="flex min-w-0 items-center justify-center gap-1.5 sm:hidden"
        onSubmit={(e) => {
          e.preventDefault();
          goToPage(pageInput);
        }}
      >
        <label htmlFor="blog-page-jump" className="sr-only">
          跳至頁碼
        </label>
        <input
          id="blog-page-jump"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value.replace(/[^\d]/g, ""))}
          onBlur={() => goToPage(pageInput)}
          aria-current="page"
          className="w-12 rounded-lg border border-border bg-white px-2 py-1.5 text-center text-sm font-medium text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm text-muted-foreground">{totalPages}</span>
      </form>

      {/* 桌機：完整頁碼 */}
      <div className="hidden min-w-0 flex-wrap items-center justify-center gap-1 sm:flex">
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-sm text-muted-foreground"
            >
              …
            </span>
          ) : (
            <Link
              key={page}
              href={hrefFor(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={cn(
                "min-w-9 rounded-lg px-3 py-2 text-center text-sm transition-colors",
                page === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-white text-foreground hover:bg-[#f7f9f7]",
              )}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      {currentPage < totalPages ? (
        <Link href={hrefFor(currentPage + 1)} className={prevClass}>
          下一頁
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className={prevDisabledClass}>
          下一頁
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
