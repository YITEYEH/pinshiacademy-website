import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost, BlogPostFrontmatter, BlogPostSummary } from "./types";
import { wpGetAllPosts, wpGetPostBySlug } from "./wpgraphql";

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
    const { frontmatter } = readPostFileBySlug(slug);
    return { slug, frontmatter };
  });

  posts.sort((a, b) => {
    const da = new Date(a.frontmatter.date).getTime();
    const db = new Date(b.frontmatter.date).getTime();
    return db - da;
  });

  return posts;
}

function mdxGetPostBySlug(slug: string): BlogPost {
  const { frontmatter, content } = readPostFileBySlug(slug);
  return { slug, frontmatter, content };
}

function hasWpGraphqlConfigured() {
  if (process.env.WP_GRAPHQL_DISABLED === "1") return false;
  // default to the production WP endpoint if env is not set
  return true;
}

export async function getAllPosts(): Promise<BlogPostSummary[]> {
  // Prefer WordPress when available; fallback to MDX for local/dev
  if (hasWpGraphqlConfigured()) {
    try {
      return await wpGetAllPosts();
    } catch {
      return mdxGetAllPosts();
    }
  }
  return mdxGetAllPosts();
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  if (hasWpGraphqlConfigured()) {
    try {
      return await wpGetPostBySlug(slug);
    } catch {
      return mdxGetPostBySlug(slug);
    }
  }
  return mdxGetPostBySlug(slug);
}


