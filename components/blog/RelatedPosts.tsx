"use client";

import Link from "next/link";
import type { BlogPostSummary } from "@/content/content-api/types";
import { trackInternalNavClick } from "@/lib/analytics";

type Props = {
  posts: BlogPostSummary[];
};

export function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <aside
      aria-label="延伸閱讀"
      className="mt-16 pt-8 border-t border-border max-w-[42rem] mx-auto"
    >
      <h2 className="text-lg font-bold text-foreground mb-4">
        延伸閱讀
      </h2>
      <ul className="space-y-3">
        {posts.map((post) => {
          const href = `/blog/${post.slug}`;
          return (
            <li key={post.slug}>
              <Link
                href={href}
                onClick={() =>
                  trackInternalNavClick(
                    `blog_related_${post.slug}`,
                    href,
                  )
                }
                className="group block rounded-lg border border-border bg-white p-4 hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className="text-xs text-muted-foreground mb-1">
                  {post.frontmatter.date}
                  {post.frontmatter.category
                    ? ` · ${post.frontmatter.category}`
                    : ""}
                </div>
                <div className="font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                  {post.frontmatter.title}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
