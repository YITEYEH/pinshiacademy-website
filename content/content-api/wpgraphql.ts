import type { BlogPost, BlogPostSummary } from "./types";
import { normalizeWpImageUrl, prepareArticleHtml } from "@/lib/wp-post-html";
import { estimateReadTime } from "@/lib/blog-read-time";

const DEFAULT_ENDPOINT = "https://blog.pinshiacademy.com/graphql";
export const WP_POSTS_CACHE_TAG = "wordpress-posts";

/** 避免 WP 連線卡住時，整頁（含 RSC / prefetch）永遠轉圈 */
const WP_FETCH_TIMEOUT_MS = 12_000;

function fetchTimeoutSignal(): AbortSignal {
  const S = AbortSignal as typeof AbortSignal & {
    timeout?: (ms: number) => AbortSignal;
  };
  if (typeof S.timeout === "function") {
    return S.timeout(WP_FETCH_TIMEOUT_MS);
  }
  const c = new AbortController();
  setTimeout(() => c.abort(), WP_FETCH_TIMEOUT_MS);
  return c.signal;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function decodeCommonEntities(text: string) {
  return (
    text
      // common ellipsis entities produced by WP
      .replace(/&hellip;|&#8230;|&#x2026;/gi, "…")
      // wp often uses a bracketed ellipsis marker
      .replace(/\[\s*&hellip;\s*\]|\[\s*&#8230;\s*\]/gi, "…")
      .replace(/\[\s*…\s*\]|\[\s*\.\.\.\s*\]/g, "…")
      .replace(/&nbsp;|&#160;/gi, " ")
      .trim()
  );
}

function sanitizeExcerpt(text: string) {
  const t = decodeCommonEntities(text);

  // Many WP plugins append share widgets into excerpt/content.
  // Cut at common markers.
  const cutMarkers = [
    "分享此文",
    "分享到",
    "分享至",
    "Share this",
    "Share on",
  ];
  let cutAt = -1;
  for (const m of cutMarkers) {
    const idx = t.indexOf(m);
    if (idx !== -1) cutAt = cutAt === -1 ? idx : Math.min(cutAt, idx);
  }
  const base = cutAt === -1 ? t : t.slice(0, cutAt).trim();

  // Remove typical "… 分享到 X/Facebook" remnants
  return base
    .replace(/\s*…?\s*(X|Facebook|Line|LINE|IG|Instagram)\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

const MIN_LEAD_CHARS = 40;
const MAX_LEAD_BLOCKS = 4;
const MAX_DESCRIPTION_CHARS = 320;

function clampDescription(text: string) {
  const cleaned = text.trim();
  if (!cleaned) return "";
  return cleaned.length > MAX_DESCRIPTION_CHARS
    ? `${cleaned.slice(0, MAX_DESCRIPTION_CHARS).trimEnd()}…`
    : cleaned;
}

/** 合併標題前的前幾段 p / blockquote，避免只抓到「就是：」這類短句 */
function deriveDescriptionFromContent(contentHtml: string) {
  const html = contentHtml ?? "";
  const introHtml = html.split(/<h[1-6]\b/i)[0] ?? html;
  const blockRegex = /<(p|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const parts: string[] = [];

  for (
    let match = blockRegex.exec(introHtml);
    match !== null && parts.length < MAX_LEAD_BLOCKS;
    match = blockRegex.exec(introHtml)
  ) {
    const text = sanitizeExcerpt(stripHtml(match[2] ?? ""));
    if (!text) continue;
    parts.push(text);
    if (parts.join(" ").length >= MIN_LEAD_CHARS) break;
  }

  return clampDescription(parts.join(" "));
}

function excerptCoreText(excerpt: string) {
  return excerpt
    .replace(/\s*…\s*$/u, "")
    .replace(/\s*\.\.\.\s*$/u, "")
    .trim();
}

function excerptLooksTruncated(excerpt: string) {
  return /(?:…|\.\.\.)\s*$/u.test(excerpt.trim());
}

function deriveDescription(excerptText: string, contentHtml: string | null | undefined) {
  const excerpt = sanitizeExcerpt(excerptText);
  const excerptCore = excerptCoreText(excerpt);
  const fromContent = contentHtml ? deriveDescriptionFromContent(contentHtml) : "";

  if (
    excerptCore.length >= MIN_LEAD_CHARS &&
    !excerptLooksTruncated(excerpt)
  ) {
    return clampDescription(excerpt);
  }

  if (fromContent.length >= MIN_LEAD_CHARS) {
    return fromContent;
  }

  return clampDescription(fromContent || excerpt);
}

function normalizeDate(input: string | null | undefined) {
  if (!input) return "";
  // WPGraphQL typically returns ISO string
  return input.slice(0, 10);
}

type GqlPostNode = {
  slug: string;
  title?: string | null;
  excerpt?: string | null;
  date?: string | null;
  modified?: string | null;
  content?: string | null;
  author?: { node?: { name?: string | null; avatar?: { url?: string | null } | null } | null } | null;
  featuredImage?: { node?: { sourceUrl?: string | null } | null } | null;
  categories?: { nodes?: Array<{ name?: string | null }> } | null;
  tags?: { nodes?: Array<{ name?: string | null }> } | null;
};

async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const endpoint = process.env.WP_GRAPHQL_URL ?? DEFAULT_ENDPOINT;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
    signal: fetchTimeoutSignal(),
    // ISR + on-demand revalidate via /api/revalidate (tag: wordpress-posts)
    next: { revalidate: 60, tags: [WP_POSTS_CACHE_TAG] },
  });

  if (!res.ok) {
    throw new Error(`WPGraphQL request failed: ${res.status}`);
  }

  let json: { data?: T; errors?: unknown };
  try {
    json = (await res.json()) as { data?: T; errors?: unknown };
  } catch {
    throw new Error("WPGraphQL response was not valid JSON");
  }
  if (!json.data) throw new Error("WPGraphQL response missing data");
  return json.data;
}

function resolveReadTime(node: {
  content?: string | null;
  excerpt?: string | null;
}): string | undefined {
  // 列表頁僅有 excerpt；文章頁才有完整 content
  const source = (node.content ?? node.excerpt ?? "").trim();
  return source ? estimateReadTime(source) : undefined;
}

function mapNodeToSummary(n: GqlPostNode): BlogPostSummary | null {
  if (!n.slug) return null;

  const category =
    n.categories?.nodes?.map((c) => c.name).find(Boolean) ?? undefined;
  const excerptPlain = stripHtml(n.excerpt ?? "");
  const description =
    deriveDescription(excerptPlain, undefined) ||
    sanitizeExcerpt(stripHtml(n.title ?? ""));
  const coverRaw = n.featuredImage?.node?.sourceUrl ?? undefined;
  const cover = coverRaw ? normalizeWpImageUrl(coverRaw) : undefined;
  const authorName = n.author?.node?.name ?? undefined;
  const authorAvatar = n.author?.node?.avatar?.url ?? undefined;
  const tags =
    n.tags?.nodes?.map((t) => t.name).filter(Boolean) as string[] | undefined;
  const readTime = resolveReadTime(n);

  return {
    slug: n.slug,
    frontmatter: {
      title: n.title ?? n.slug,
      description,
      date: normalizeDate(n.date),
      modifiedDate: normalizeDate(n.modified) || normalizeDate(n.date),
      category,
      tags: tags && tags.length > 0 ? tags : undefined,
      cover,
      authorName,
      authorAvatar,
      readTime: readTime || undefined,
    },
  };
}

/**
 * 列表／首頁／sitemap 用：不抓 content，避免全文過重導致 fetch 逾時、
 * ISR 背景更新失敗後長期卡在舊快取。
 */
async function fetchPostNodesPage(first: number, after?: string | null) {
  const query = /* GraphQL */ `
    query GetPostSummaries($first: Int!, $after: String) {
      posts(
        first: $first
        after: $after
        where: { orderby: { field: DATE, order: DESC } }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          slug
          title
          excerpt
          date
          modified
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              name
            }
          }
          tags {
            nodes {
              name
            }
          }
        }
      }
    }
  `;

  const data = await graphqlRequest<{
    posts: {
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
      nodes: GqlPostNode[];
    };
  }>(query, { first, after: after ?? null });

  return data.posts;
}

async function fetchPostNodesPageWithContent(
  first: number,
  after?: string | null,
) {
  const query = /* GraphQL */ `
    query GetPostsWithContent($first: Int!, $after: String) {
      posts(
        first: $first
        after: $after
        where: { orderby: { field: DATE, order: DESC } }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          slug
          title
          excerpt
          date
          modified
          content
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              name
            }
          }
          tags {
            nodes {
              name
            }
          }
        }
      }
    }
  `;

  const data = await graphqlRequest<{
    posts: {
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
      nodes: GqlPostNode[];
    };
  }>(query, { first, after: after ?? null });

  return data.posts;
}

function mapNodeToBlogPost(post: GqlPostNode): BlogPost | null {
  if (!post.slug) return null;

  const category =
    post.categories?.nodes?.map((c) => c.name).find(Boolean) ?? undefined;
  const excerptPlain = stripHtml(post.excerpt ?? "");
  const description =
    deriveDescription(excerptPlain, post.content) ||
    sanitizeExcerpt(stripHtml(post.title ?? ""));
  const coverRaw = post.featuredImage?.node?.sourceUrl ?? undefined;
  const cover = coverRaw ? normalizeWpImageUrl(coverRaw) : undefined;
  const authorName = post.author?.node?.name ?? undefined;
  const authorAvatar = post.author?.node?.avatar?.url ?? undefined;
  const tags =
    post.tags?.nodes?.map((t) => t.name).filter(Boolean) as string[] | undefined;

  const title = post.title ?? post.slug;
  const rawHtml = post.content ?? "";
  const { html, toc } = prepareArticleHtml(rawHtml, title);
  const readTime = resolveReadTime({ content: rawHtml, excerpt: post.excerpt });

  return {
    slug: post.slug,
    frontmatter: {
      title,
      description,
      date: normalizeDate(post.date),
      modifiedDate: normalizeDate(post.modified) || normalizeDate(post.date),
      category,
      tags: tags && tags.length > 0 ? tags : undefined,
      cover,
      authorName,
      authorAvatar,
      readTime: readTime || undefined,
    },
    content: html,
    toc: toc.length > 0 ? toc : undefined,
  };
}

export async function wpGetAllPosts(): Promise<BlogPostSummary[]> {
  const all: BlogPostSummary[] = [];
  let after: string | null = null;
  const pageSize = 100;

  for (let page = 0; page < 20; page++) {
    const batch = await fetchPostNodesPage(pageSize, after);
    for (const node of batch.nodes ?? []) {
      const summary = mapNodeToSummary(node);
      if (summary) all.push(summary);
    }
    if (!batch.pageInfo.hasNextPage) break;
    after = batch.pageInfo.endCursor;
    if (!after) break;
  }

  return all;
}

export async function wpGetAllPostsForFeed(): Promise<BlogPost[]> {
  const all: BlogPost[] = [];
  let after: string | null = null;
  // 全文 feed 分頁縮小，降低單次 GraphQL payload 逾時風險
  const pageSize = 20;

  for (let page = 0; page < 50; page++) {
    const batch = await fetchPostNodesPageWithContent(pageSize, after);
    for (const node of batch.nodes ?? []) {
      const post = mapNodeToBlogPost(node);
      if (post) all.push(post);
    }
    if (!batch.pageInfo.hasNextPage) break;
    after = batch.pageInfo.endCursor;
    if (!after) break;
  }

  return all;
}

export async function wpGetPostBySlug(slug: string): Promise<BlogPost> {
  const query = /* GraphQL */ `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        slug
        title
        excerpt
        date
        modified
        content
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  `;

  const data = await graphqlRequest<{ post: GqlPostNode | null }>(query, { slug });
  const post = data.post;
  if (!post?.slug) throw new Error("Post not found");

  const mapped = mapNodeToBlogPost(post);
  if (!mapped) throw new Error("Post not found");

  return mapped;
}

