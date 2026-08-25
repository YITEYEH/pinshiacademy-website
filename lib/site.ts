/** 與 Vercel 網域設定一致：apex 會轉到 www，canonical／sitemap 應以 www 為準 */
const DEFAULT_SITE_URL = "https://www.pinshiacademy.com";

function normalizeSiteUrl(raw: string | undefined): string {
  const trimmed = raw?.trim();
  if (!trimmed) return DEFAULT_SITE_URL;
  try {
    const u = new URL(trimmed);
    if (u.protocol !== "http:" && u.protocol !== "https:") {
      return DEFAULT_SITE_URL;
    }
    const withoutTrailingSlash = trimmed.endsWith("/")
      ? trimmed.slice(0, -1)
      : trimmed;
    // Vercel 將 apex 301 到 www；sitemap / canonical 應與慣用網址一致
    if (withoutTrailingSlash === "https://pinshiacademy.com") {
      return DEFAULT_SITE_URL;
    }
    return withoutTrailingSlash;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE = {
  name: "品識學苑",
  englishName: "Pin Shi Academy",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  defaultTitle: "品識學苑｜會考學測線上一對一輔導",
  defaultDescription:
    "成績卡住、越補越焦慮？品識學苑提供國英數社自線上一對一與小班，先診斷弱點再排課，協助會考與學測穩步進步",
} as const;

/** Sitemap lastmod for routes without a content-derived timestamp (update when static pages meaningfully change). */
export const STATIC_SITEMAP_LAST_MODIFIED = new Date("2026-07-14T00:00:00.000Z");

