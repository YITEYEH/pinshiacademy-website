import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { WP_POSTS_CACHE_TAG } from "@/content/content-api/wpgraphql";

function getConfiguredSecret() {
  return process.env.REVALIDATE_SECRET?.trim() || "";
}

function isAuthorized(request: NextRequest, secret: string) {
  const fromQuery = request.nextUrl.searchParams.get("secret");
  const fromHeader = request.headers.get("x-revalidate-secret");
  const auth = request.headers.get("authorization");
  const fromBearer =
    auth?.startsWith("Bearer ") ? auth.slice("Bearer ".length).trim() : null;
  return (
    fromQuery === secret ||
    fromHeader === secret ||
    fromBearer === secret
  );
}

function extractSlug(
  request: NextRequest,
  body: unknown,
): string | undefined {
  const fromQuery = request.nextUrl.searchParams.get("slug");
  if (fromQuery?.trim()) return fromQuery.trim();

  if (!body || typeof body !== "object") return undefined;

  const record = body as Record<string, unknown>;
  if (typeof record.slug === "string" && record.slug.trim()) {
    return record.slug.trim();
  }

  const post = record.post;
  if (post && typeof post === "object") {
    const postRecord = post as Record<string, unknown>;
    if (typeof postRecord.post_name === "string" && postRecord.post_name.trim()) {
      return postRecord.post_name.trim();
    }
    if (typeof postRecord.slug === "string" && postRecord.slug.trim()) {
      return postRecord.slug.trim();
    }
  }

  const data = record.data;
  if (data && typeof data === "object") {
    const dataRecord = data as Record<string, unknown>;
    if (typeof dataRecord.slug === "string" && dataRecord.slug.trim()) {
      return dataRecord.slug.trim();
    }
  }

  return undefined;
}

function revalidatePaths(paths: string[]) {
  for (const path of paths) {
    revalidatePath(path);
    revalidatePath(path, "layout");
  }
}

function runRevalidation(slug?: string) {
  revalidateTag(WP_POSTS_CACHE_TAG);
  revalidatePaths(["/", "/blog", "/feed.xml", "/sitemap.xml"]);
  if (slug) revalidatePaths([`/blog/${slug}`]);
}

async function handleRevalidate(request: NextRequest) {
  const secret = getConfiguredSecret();
  if (!secret) {
    return NextResponse.json(
      {
        message:
          "REVALIDATE_SECRET is not configured on the server. Set it in Vercel Environment Variables.",
      },
      { status: 503 },
    );
  }

  if (!isAuthorized(request, secret)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: unknown;
  if (request.method === "POST") {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      try {
        body = await request.json();
      } catch {
        body = undefined;
      }
    }
  }

  const slug = extractSlug(request, body);
  runRevalidation(slug);

  return NextResponse.json({
    revalidated: true,
    slug: slug ?? null,
    paths: ["/", "/blog", "/feed.xml", "/sitemap.xml", slug ? `/blog/${slug}` : null].filter(
      Boolean,
    ),
    at: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}

/** 方便 WordPress wp_remote_get 或 Webhooks 外掛（GET）觸發 */
export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}
