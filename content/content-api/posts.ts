import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost, BlogPostFrontmatter, BlogPostSummary } from "./types";
import { wpGetAllPosts, wpGetAllPostsForFeed, wpGetPostBySlug } from "./wpgraphql";
import { logWpFallback } from "./wp-fallback";
import { renderMarkdownToHtml } from "@/lib/mdx";
import { prepareArticleHtml } from "@/lib/wp-post-html";
import { estimateReadTime } from "@/lib/blog-read-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function getSlugFromFilename(filename: string) {
  return filename.replace(/\.mdx$/, "");
}

function readPostFileBySlug(slug: string) {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as BlogPostFrontmatter & { date?: unknown };
  const rawDate: any = (data as any).date;
  const date =
    rawDate instanceof Date
      ? rawDate.toISOString().slice(0, 10)
      : typeof rawDate === "string"
        ? rawDate
        : "";

  return {
    frontmatter: { ...data, date } as BlogPostFrontmatter,
    content: parsed.content,
  };
}

function mdxGetAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(getSlugFromFilename);
}

function mdxGetAllPosts(): BlogPostSummary[] {
  const slugs = mdxGetAllPostSlugs();
  const posts = slugs.map((slug) => {
    const { frontmatter, content } = readPostFileBySlug(slug);
    const readTime = estimateReadTime(content);
    return {
      slug,
      frontmatter: {
        ...frontmatter,
        readTime: readTime || frontmatter.readTime,
      },
    };
  });

  posts.sort((a, b) => {
    const da = new Date(a.frontmatter.date).getTime();
    const db = new Date(b.frontmatter.date).getTime();
    return db - da;
  });

  return posts;
}

async function mdxGetPostBySlug(slug: string): Promise<BlogPost> {
  const { frontmatter, content } = readPostFileBySlug(slug);
  const html = await renderMarkdownToHtml(content);
  const { html: prepared, toc } = prepareArticleHtml(html, frontmatter.title);
  const readTime = estimateReadTime(content);

  return {
    slug,
    frontmatter: {
      ...frontmatter,
      readTime: readTime || frontmatter.readTime,
    },
    content: prepared,
    toc: toc.length > 0 ? toc : undefined,
  };
}

function hasWpGraphqlConfigured() {
  if (process.env.WP_GRAPHQL_DISABLED === "1") return false;
  return true;
}

export async function getAllPosts(): Promise<BlogPostSummary[]> {
  if (hasWpGraphqlConfigured()) {
    try {
      return await wpGetAllPosts();
    } catch (error) {
      await logWpFallback("getAllPosts", error);
      return mdxGetAllPosts();
    }
  }
  return mdxGetAllPosts();
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  if (hasWpGraphqlConfigured()) {
    try {
      return await wpGetPostBySlug(slug);
    } catch (error) {
      await logWpFallback("getPostBySlug", error, { slug });
      return mdxGetPostBySlug(slug);
    }
  }
  return mdxGetPostBySlug(slug);
}

async function mdxGetAllPostsForFeed(): Promise<BlogPost[]> {
  const slugs = mdxGetAllPostSlugs();
  const posts = await Promise.all(slugs.map(mdxGetPostBySlug));
  posts.sort((a, b) => {
    const da = new Date(a.frontmatter.date).getTime();
    const db = new Date(b.frontmatter.date).getTime();
    return db - da;
  });
  return posts;
}

export async function getAllPostsForFeed(): Promise<BlogPost[]> {
  if (hasWpGraphqlConfigured()) {
    try {
      return await wpGetAllPostsForFeed();
    } catch (error) {
      await logWpFallback("getAllPostsForFeed", error);
      return mdxGetAllPostsForFeed();
    }
  }
  return mdxGetAllPostsForFeed();
}
