import Link from "next/link";
import { ExternalLink, BookOpen, Lightbulb, Target } from "lucide-react";
import { getAllPosts } from "@/content/content-api/posts";
import type React from "react";

type BlogSearchParams = Record<string, string | string[] | undefined>;

const categoryIcon: Record<string, React.ComponentType<{ className?: string }>> =
  {
    學習方法: Lightbulb,
    教育觀點: Target,
    親子溝通: BookOpen,
  };

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

export const dynamic = "force-dynamic";

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

  const posts = await getAllPosts();

  const filteredPosts = posts.filter((p) => {
    if (selectedCategory && (p.frontmatter.category ?? "未分類") !== selectedCategory)
      return false;
    if (selectedTag && !(p.frontmatter.tags ?? []).includes(selectedTag))
      return false;
    return true;
  });

  const categories = Object.entries(
    posts.reduce<Record<string, number>>((acc, p) => {
      const key = p.frontmatter.category ?? "未分類";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  ).map(([name, count]) => ({ name, count }));

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

  return (
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
                {filteredPosts.map((post) => {
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
                                  : "/brand/logo.png"
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
                          <div className="flex items-center gap-2">
                            <span>{post.frontmatter.readTime ?? ""}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

