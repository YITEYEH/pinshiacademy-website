import Link from "next/link";
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
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);
  const hrefFor = (page: number) =>
    buildBlogIndexHref({ category, tag, page });

  return (
    <nav
      className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
      aria-label="文章分頁"
    >
      {currentPage > 1 ? (
        <Link
          href={hrefFor(currentPage - 1)}
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-4 py-2 text-sm text-foreground transition-colors hover:bg-[#f7f9f7]"
        >
          <ChevronLeft className="h-4 w-4" />
          上一頁
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg border border-border bg-white/50 px-4 py-2 text-sm text-muted-foreground opacity-50">
          <ChevronLeft className="h-4 w-4" />
          上一頁
        </span>
      )}

      <div className="flex items-center gap-1">
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
        <Link
          href={hrefFor(currentPage + 1)}
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-4 py-2 text-sm text-foreground transition-colors hover:bg-[#f7f9f7]"
        >
          下一頁
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg border border-border bg-white/50 px-4 py-2 text-sm text-muted-foreground opacity-50">
          下一頁
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
