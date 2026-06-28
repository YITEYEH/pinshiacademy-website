import "server-only";

const OG_IMAGE_PATTERNS = [
  /property="og:image"[^>]*content="([^"]+)"/i,
  /content="([^"]+)"[^>]*property="og:image"/i,
];

/** 從 Teachify 頁面 og:image 取得封面（每日快取） */
export async function fetchTeachifyOgImage(
  pageUrl: string,
): Promise<string | undefined> {
  try {
    const res = await fetch(pageUrl, {
      next: { revalidate: 86_400 },
      signal: AbortSignal.timeout(10_000),
      headers: { Accept: "text/html" },
    });
    if (!res.ok) return undefined;

    const html = await res.text();
    for (const pattern of OG_IMAGE_PATTERNS) {
      const match = html.match(pattern);
      if (match?.[1]) return match[1];
    }
    return undefined;
  } catch {
    return undefined;
  }
}
