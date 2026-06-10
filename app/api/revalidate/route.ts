import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { WP_POSTS_CACHE_TAG } from "@/content/content-api/wpgraphql";

function isAuthorized(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return false;
  const fromQuery = request.nextUrl.searchParams.get("secret");
  const fromHeader = request.headers.get("x-revalidate-secret");
  return fromQuery === secret || fromHeader === secret;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = (await request.json()) as { slug?: string };
    slug = typeof body.slug === "string" ? body.slug : undefined;
  } catch {
    slug = request.nextUrl.searchParams.get("slug") ?? undefined;
  }

  revalidateTag(WP_POSTS_CACHE_TAG);
  revalidatePath("/blog");
  revalidatePath("/feed.xml");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);

  return NextResponse.json({
    revalidated: true,
    slug: slug ?? null,
    at: new Date().toISOString(),
  });
}

/** 方便在瀏覽器或 WP Webhook（GET）觸發 */
export async function GET(request: NextRequest) {
  return POST(request);
}
