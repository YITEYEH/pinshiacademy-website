import "server-only";

import type { BlogPost, BlogPostSummary } from "@/content/content-api/types";
import { buildBreadcrumbJsonLd } from "@/lib/about-schema";
import { effectiveModifiedDate } from "@/lib/blog-dates";
import { SITE } from "@/lib/site";
import { brandLogoUrl } from "@/lib/site-assets";

export function buildBlogPostJsonLd(post: BlogPost, url: string) {
  const published = post.frontmatter.date;
  const modified =
    effectiveModifiedDate(post.frontmatter.date, post.frontmatter.modifiedDate) ??
    published;

  const article: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: published,
    dateModified: modified,
    inLanguage: "zh-TW",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: {
      "@type": "Blog",
      "@id": `${SITE.url}/blog#blog`,
      name: "品識學苑學習專欄",
      url: `${SITE.url}/blog`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: brandLogoUrl(),
      },
    },
  };

  if (post.frontmatter.cover) {
    article.image = [post.frontmatter.cover];
  }

  if (post.frontmatter.authorName) {
    article.author = {
      "@type": "Person",
      name: post.frontmatter.authorName,
    };
  }

  if (post.frontmatter.category) {
    article.articleSection = post.frontmatter.category;
  }

  if (post.frontmatter.tags?.length) {
    article.keywords = post.frontmatter.tags.join(", ");
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      article,
      buildBreadcrumbJsonLd([
        { name: "首頁", path: "/" },
        { name: "學習專欄", path: "/blog" },
        { name: post.frontmatter.title, path: `/blog/${post.slug}` },
      ]),
    ],
  };
}

export function pickRelatedPosts(
  current: BlogPost,
  all: BlogPostSummary[],
  limit = 3,
): BlogPostSummary[] {
  const others = all.filter((p) => p.slug !== current.slug);
  const category = current.frontmatter.category;

  const sameCategory = category
    ? others.filter((p) => p.frontmatter.category === category)
    : [];

  const picked: BlogPostSummary[] = [];
  const seen = new Set<string>();

  for (const p of sameCategory) {
    if (picked.length >= limit) break;
    picked.push(p);
    seen.add(p.slug);
  }

  for (const p of others) {
    if (picked.length >= limit) break;
    if (seen.has(p.slug)) continue;
    picked.push(p);
  }

  return picked;
}
