import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleShare } from "@/components/blog/ArticleShare";
import { ArticleConsultCta } from "@/components/blog/ArticleConsultCta";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { getAllPosts, getPostBySlug } from "@/content/content-api/posts";
import { buildBlogPostJsonLd, pickRelatedPosts } from "@/lib/blog-schema";
import { effectiveModifiedDate } from "@/lib/blog-dates";
import { SITE } from "@/lib/site";
import { buildPageMetadata, buildNotFoundMetadata } from "@/lib/seo";
import { BRAND_LOGO_PATH } from "@/lib/site-assets";

export const revalidate = 60;

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

function toIsoDate(date: string) {
  if (!date) return undefined;
  return date.length === 10 ? `${date}T00:00:00+08:00` : date;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    const rawTitle = post.frontmatter.title.trim();
    const seoTitle =
      rawTitle.length >= 20
        ? rawTitle
        : `${rawTitle}｜品識學苑升學專欄`;
    const published = toIsoDate(post.frontmatter.date);
    const modified = toIsoDate(
      effectiveModifiedDate(
        post.frontmatter.date,
        post.frontmatter.modifiedDate,
      ) ?? post.frontmatter.date,
    );

    return buildPageMetadata({
      path: `/blog/${post.slug}`,
      title: seoTitle,
      description: post.frontmatter.description,
      openGraphType: "article",
      ogImages: post.frontmatter.cover ? [post.frontmatter.cover] : undefined,
      ogImageAlt: post.frontmatter.title,
      titleAbsolute: true,
      articlePublishedTime: published,
      articleModifiedTime: modified,
      articleAuthors: post.frontmatter.authorName
        ? [post.frontmatter.authorName]
        : undefined,
      articleSection: post.frontmatter.category,
      articleTags: post.frontmatter.tags,
    });
  } catch {
    return buildNotFoundMetadata(`/blog/${slug}`, "文章");
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: Awaited<ReturnType<typeof getPostBySlug>>;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = pickRelatedPosts(post, allPosts);
  const postUrl = `${SITE.url}/blog/${post.slug}`;
  const modifiedLabel = effectiveModifiedDate(
    post.frontmatter.date,
    post.frontmatter.modifiedDate,
  );

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBlogPostJsonLd(post, postUrl)),
        }}
      />

      <nav aria-label="breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              首頁
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-primary transition-colors">
              學習專欄
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground/80 line-clamp-1">
            {post.frontmatter.title}
          </li>
        </ol>
      </nav>

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        返回學習專欄
      </Link>

      <header className="mb-10 pb-10 border-b border-border">
        <div className="text-sm text-muted-foreground">
          發布：{post.frontmatter.date}
          {modifiedLabel ? ` · 更新：${modifiedLabel}` : ""}
          {post.frontmatter.readTime ? ` · ${post.frontmatter.readTime}` : ""}
        </div>
        <h1 className="mt-3 text-3xl lg:text-[2.125rem] font-bold text-foreground leading-tight tracking-tight">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.description && (
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {post.frontmatter.description}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {post.frontmatter.category && (
            <Link
              href={`/blog?category=${encodeURIComponent(post.frontmatter.category)}`}
              className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full"
            >
              {post.frontmatter.category}
            </Link>
          )}
          {(post.frontmatter.tags ?? []).slice(0, 20).map((t) => (
            <Link
              key={t}
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className="text-xs text-muted-foreground bg-[#f7f9f7] px-3 py-1 rounded-full"
            >
              #{t}
            </Link>
          ))}
        </div>

        {post.frontmatter.authorName && (
          <div className="mt-6 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                post.frontmatter.authorAvatar &&
                !isGenericGravatar(post.frontmatter.authorAvatar)
                  ? post.frontmatter.authorAvatar
                  : BRAND_LOGO_PATH
              }
              alt={post.frontmatter.authorName}
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="text-sm text-muted-foreground">
              {post.frontmatter.authorName}
            </div>
          </div>
        )}
      </header>

      {post.frontmatter.cover && (
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#f7f9f7] mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.frontmatter.cover}
            alt={post.frontmatter.title}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
      )}

      {post.toc && post.toc.length > 0 && <ArticleToc items={post.toc} />}

      <div
        className="article-content max-w-[42rem] mx-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <ArticleShare url={postUrl} title={post.frontmatter.title} />

      <ArticleConsultCta category={post.frontmatter.category} />

      <RelatedPosts posts={relatedPosts} />

      <footer className="mt-10 pt-8 border-t border-border max-w-[42rem] mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          返回學習專欄
        </Link>
      </footer>
    </article>
  );
}
