import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, BookOpen, Lightbulb, Target, GraduationCap } from "lucide-react";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { getAllPosts } from "@/content/content-api/posts";
import { buildPageMetadata } from "@/lib/seo";
import { buildBlogIndexJsonLd } from "@/lib/blog-index-schema";
import { SITE } from "@/lib/site";
import { BRAND_LOGO_PATH } from "@/lib/site-assets";
import type React from "react";

type BlogSearchParams = Record<string, string | string[] | undefined>;

const POSTS_PER_PAGE = 12;

const categoryIcon: Record<string, React.ComponentType<{ className?: string }>> =
  {
    國小萬試通: BookOpen,
    國中好試多: Target,
    學習技巧: Lightbulb,
    高中芝士補給站: GraduationCap,
  };

/** 側欄分類固定順序：國小 → 國中 → 高中 → 其他 */
const CATEGORY_ORDER = [
  "國小萬試通",
  "國中好試多",
  "高中芝士補給站",
  "學習技巧",
] as const;

function sortCategoriesByOrder(
  categories: { name: string; count: number }[],
) {
  const orderIndex = new Map(
    CATEGORY_ORDER.map((name, index) => [name, index]),
  );

  return [...categories].sort((a, b) => {
    const ai = orderIndex.get(a.name as (typeof CATEGORY_ORDER)[number]);
    const bi = orderIndex.get(b.name as (typeof CATEGORY_ORDER)[number]);
    if (ai !== undefined && bi !== undefined) return ai - bi;
    if (ai !== undefined) return -1;
    if (bi !== undefined) return 1;
    return a.name.localeCompare(b.name, "zh-Hant");
  });
}

function isGenericGravatar(url: string) {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("gravatar.com")) return false;
    const d = u.searchParams.get("d");
    return d === "identicon" || d === "mp" || d === "mysteryman";
  } catch {
    return false;
  }
}

export const revalidate = 60;

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<BlogSearchParams>;
}): Promise<Metadata> {
  const sp = (await searchParams) ?? {};
  const pageRaw = sp.page;
  const pageNum = parseInt(
    typeof pageRaw === "string" ? pageRaw : "1",
    10,
  );
  const hasFilter =
    (typeof sp.category === "string" && sp.category.length > 0) ||
    (typeof sp.tag === "string" && sp.tag.length > 0) ||
    (Number.isFinite(pageNum) && pageNum > 1);

  const base = buildPageMetadata({
    path: "/blog",
    title: "會考學測讀書方法｜升學攻略｜品識學苑專欄",
    description:
      "繁星、學測與會考讀書方法、錯題本怎麼做？精選可落地的升學備考文章，給家長與學生能立刻使用的方法與步驟",
    titleAbsolute: true,
  });

  if (!hasFilter) return base;

  return {
    ...base,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${SITE.url}/blog`,
    },
  };
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams?: Promise<BlogSearchParams>;
}) {
  const sp = (await searchParams) ?? {};
  const selectedCategoryRaw = sp.category;
  const selectedTagRaw = sp.tag;
  const selectedCategory =
    typeof selectedCategoryRaw === "string" ? selectedCategoryRaw : undefined;
  const selectedTag =
    typeof selectedTagRaw === "string" ? selectedTagRaw : undefined;
  const pageRaw = sp.page;
  const requestedPage = Math.max(
    1,
    parseInt(typeof pageRaw === "string" ? pageRaw : "1", 10) || 1,
  );

  const posts = await getAllPosts();

  const filteredPosts = posts.filter((p) => {
    if (selectedCategory && (p.frontmatter.category ?? "未分類") !== selectedCategory)
      return false;
    if (selectedTag && !(p.frontmatter.tags ?? []).includes(selectedTag))
      return false;
    return true;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
  );
  const currentPage = Math.min(requestedPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const categories = sortCategoriesByOrder(
    Object.entries(
      posts.reduce<Record<string, number>>((acc, p) => {
        const key = p.frontmatter.category ?? "未分類";
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
      }, {}),
    ).map(([name, count]) => ({ name, count })),
  );

  const tags = Object.entries(
    posts.reduce<Record<string, number>>((acc, p) => {
      for (const t of p.frontmatter.tags ?? []) {
        acc[t] = (acc[t] ?? 0) + 1;
      }
      return acc;
    }, {}),
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const blogJsonLd =
    selectedCategory || selectedTag || currentPage > 1
      ? null
      : buildBlogIndexJsonLd(posts);

  return (
    <>
      {blogJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
      ) : null}
      <div className="w-full">
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              學習專欄
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              分享教育理念、學習方法與親子溝通的文章，幫助家長與學生建立更好的學習體驗
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-[#f7f9f7] rounded-xl p-6 sticky top-24">
                <h2 className="font-semibold text-foreground mb-4">分類</h2>
                <div className="space-y-2">
                  <Link
                    href="/blog"
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      !selectedCategory && !selectedTag
                        ? "bg-white border border-border"
                        : "bg-white/60 hover:bg-white"
                    }`}
                  >
                    <span className="text-sm text-foreground">全部</span>
                    <span className="text-xs text-muted-foreground">
                      {posts.length}
                    </span>
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={`/blog?category=${encodeURIComponent(category.name)}`}
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between transition-colors ${
                        selectedCategory === category.name
                          ? "bg-white border border-border"
                          : "bg-white/60 hover:bg-white"
                      }`}
                    >
                      <span className="text-sm text-foreground">
                        {category.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {category.count}
                      </span>
                    </Link>
                  ))}
                </div>

                {tags.length > 0 && (
                  <div className="mt-8">
                    <h2 className="font-semibold text-foreground mb-4">標籤</h2>
                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 30).map((tag) => (
                        <Link
                          key={tag.name}
                          href={`/blog?tag=${encodeURIComponent(tag.name)}`}
                          className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                            selectedTag === tag.name
                              ? "bg-white border-border text-foreground"
                              : "bg-white/60 border-transparent text-muted-foreground hover:bg-white"
                          }`}
                        >
                          {tag.name}
                          <span className="ml-1 opacity-70">({tag.count})</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {paginatedPosts.map((post) => {
                  const Icon =
                    categoryIcon[post.frontmatter.category ?? ""] ?? Lightbulb;
                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                    >
                      {post.frontmatter.cover && (
                        <div className="relative aspect-[16/9] bg-[#f7f9f7] overflow-hidden">
                          {/* 使用原生 img：WP 特色圖可能來自各種 CDN，避免 next/image 網域未設定導致 500 */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.frontmatter.cover}
                            alt={post.frontmatter.title}
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          {post.frontmatter.category && (
                            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                              {post.frontmatter.category}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {post.frontmatter.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {post.frontmatter.description}
                        </p>

                        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.frontmatter.tags.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="text-xs text-muted-foreground bg-[#f7f9f7] px-2 py-1 rounded"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}

                        {post.frontmatter.authorName && (
                          <div className="flex items-center gap-2 mb-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={
                                post.frontmatter.authorAvatar &&
                                !isGenericGravatar(post.frontmatter.authorAvatar)
                                  ? post.frontmatter.authorAvatar
                                  : BRAND_LOGO_PATH
                              }
                              alt={post.frontmatter.authorName}
                              width={28}
                              height={28}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div className="text-sm text-muted-foreground">
                              {post.frontmatter.authorName}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{post.frontmatter.date}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                category={selectedCategory}
                tag={selectedTag}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

