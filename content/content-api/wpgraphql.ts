import type { BlogPost, BlogPostSummary } from "./types";

const DEFAULT_ENDPOINT = "https://blog.pinshiacademy.com/graphql";

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function decodeCommonEntities(text: string) {
  return (
    text
      // common ellipsis entities produced by WP
      .replace(/&hellip;|&#8230;|&#x2026;/gi, "…")
      // wp often uses a bracketed ellipsis marker
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

function deriveDescriptionFromContent(contentHtml: string) {
  const html = contentHtml ?? "";

  // Prefer the first <p> as the excerpt source (avoids pulling in headings like "一、...")
  const pMatch = html.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
  const firstParagraphHtml = pMatch?.[1] ?? "";
  const plainFromP = sanitizeExcerpt(stripHtml(firstParagraphHtml));

  const plain = plainFromP || sanitizeExcerpt(stripHtml(html));
  if (!plain) return "";

  const cleaned = plain.trim();
  return cleaned.length > 320 ? cleaned.slice(0, 320).trimEnd() + "…" : cleaned;
}

function deriveDescription(excerptText: string, contentHtml: string | null | undefined) {
  const excerpt = sanitizeExcerpt(excerptText);
  // If WP excerpt is truncated (…/[…] marker), prefer first paragraph from content.
  const looksTruncated =
    excerpt.endsWith("…") ||
    excerpt.endsWith("...") ||
    excerpt.includes(" […]") ||
    excerpt.includes("[…]");
  if (looksTruncated && contentHtml) {
    const fromContent = deriveDescriptionFromContent(contentHtml);
    if (fromContent) return fromContent;
  }
  return excerpt;
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
    // cache on Vercel edge/runtime; keep fresh-ish for SEO posts
    next: { revalidate: 300 },
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

export async function wpGetAllPosts(): Promise<BlogPostSummary[]> {
  const query = /* GraphQL */ `
    query GetPosts($first: Int!) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          slug
          title
          excerpt
          date
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

  const data = await graphqlRequest<{ posts: { nodes: GqlPostNode[] } }>(query, {
    first: 50,
  });

  return (data.posts.nodes ?? [])
    .filter((n) => !!n.slug)
    .map((n) => {
      const category =
        n.categories?.nodes?.map((c) => c.name).find(Boolean) ?? undefined;
      const excerptPlain = stripHtml(n.excerpt ?? "");
      const description =
        deriveDescription(excerptPlain, n.content) ||
        sanitizeExcerpt(stripHtml(n.title ?? ""));
      const cover = n.featuredImage?.node?.sourceUrl ?? undefined;
      const authorName = n.author?.node?.name ?? undefined;
      const authorAvatar = n.author?.node?.avatar?.url ?? undefined;
      const tags =
        n.tags?.nodes?.map((t) => t.name).filter(Boolean) as string[] | undefined;

      return {
        slug: n.slug,
        frontmatter: {
          title: n.title ?? n.slug,
          description,
          date: normalizeDate(n.date),
          category,
          tags: tags && tags.length > 0 ? tags : undefined,
          cover,
          authorName,
          authorAvatar,
        },
      };
    });
}

export async function wpGetPostBySlug(slug: string): Promise<BlogPost> {
  const query = /* GraphQL */ `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        slug
        title
        excerpt
        date
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

  const category =
    post.categories?.nodes?.map((c) => c.name).find(Boolean) ?? undefined;
  const excerptPlain = stripHtml(post.excerpt ?? "");
  const description =
    deriveDescription(excerptPlain, post.content) ||
    sanitizeExcerpt(stripHtml(post.title ?? ""));
  const cover = post.featuredImage?.node?.sourceUrl ?? undefined;
  const authorName = post.author?.node?.name ?? undefined;
  const authorAvatar = post.author?.node?.avatar?.url ?? undefined;
  const tags =
    post.tags?.nodes?.map((t) => t.name).filter(Boolean) as string[] | undefined;

  return {
    slug: post.slug,
    frontmatter: {
      title: post.title ?? post.slug,
      description,
      date: normalizeDate(post.date),
      category,
      tags: tags && tags.length > 0 ? tags : undefined,
      cover,
      authorName,
      authorAvatar,
    },
    content: post.content ?? "",
  };
}

