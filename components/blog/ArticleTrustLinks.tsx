"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackInternalNavClick } from "@/lib/analytics";
import { getArticleTrustLinks } from "@/lib/blog-article-cta";

type Props = {
  category?: string;
};

export function ArticleTrustLinks({ category }: Props) {
  const links = getArticleTrustLinks(category);

  return (
    <aside
      aria-label="認識師資與成果"
      className="mt-10 max-w-[42rem] mx-auto"
    >
      <h2 className="text-base font-bold text-foreground mb-3">
        想找老師帶練？先認識師資
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={() =>
                trackInternalNavClick(link.analyticsLabel, link.href)
              }
              className="group flex h-full flex-col rounded-xl border border-border bg-white p-4 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground group-hover:text-primary">
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
              <span className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {link.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
