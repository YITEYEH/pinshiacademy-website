import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/content/content-api/posts";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      alternates: { canonical: `${SITE.url}/blog/${post.slug}` },
      openGraph: {
        type: "article",
        url: `${SITE.url}/blog/${post.slug}`,
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        images: post.frontmatter.cover ? [post.frontmatter.cover] : undefined,
      },
    };
  } catch {
    return {};
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

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.frontmatter.title,
            description: post.frontmatter.description,
            datePublished: post.frontmatter.date,
            dateModified: post.frontmatter.date,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${SITE.url}/blog/${post.slug}`,
            },
            publisher: {
              "@type": "Organization",
              name: SITE.name,
              url: SITE.url,
            },
            author: post.frontmatter.authorName
              ? {
                  "@type": "Person",
                  name: post.frontmatter.authorName,
                }
              : undefined,
          }),
        }}
      />
      <div className="mb-10">
        <div className="text-sm text-muted-foreground">
          {post.frontmatter.date}
          {post.frontmatter.readTime ? ` · ${post.frontmatter.readTime}` : ""}
        </div>
        <h1 className="mt-3 text-3xl lg:text-4xl font-bold text-foreground leading-tight">
          {post.frontmatter.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {post.frontmatter.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.frontmatter.category && (
            <a
              href={`/blog?category=${encodeURIComponent(post.frontmatter.category)}`}
              className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full"
            >
              {post.frontmatter.category}
            </a>
          )}
          {(post.frontmatter.tags ?? []).slice(0, 20).map((t) => (
            <a
              key={t}
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className="text-xs text-muted-foreground bg-[#f7f9f7] px-3 py-1 rounded-full"
            >
              #{t}
            </a>
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
                  : "/brand/logo.png"
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
      </div>

      {post.frontmatter.cover && (
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#f7f9f7] mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.frontmatter.cover}
            alt={post.frontmatter.title}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
      )}

      <div
        className="space-y-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_p]:text-foreground/90 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:text-foreground/90 [&_strong]:text-foreground"
        // WP content is trusted (owned by us). If you later allow user-generated HTML,
        // add sanitization here.
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}

