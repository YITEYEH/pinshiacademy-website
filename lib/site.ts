/** 與 Vercel 網域設定一致：apex 會轉到 www，canonical／sitemap 應以 www 為準。 */
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
  defaultTitle: "品識學苑｜陪伴每位學生找到學習節奏",
  defaultDescription:
    "品識學苑重視每個孩子的獨特性，透過專業師資與個人化教學，讓學習成為充滿成就感的旅程。",
} as const;

/** Sitemap lastmod for routes without a content-derived timestamp (update when static pages meaningfully change). */
export const STATIC_SITEMAP_LAST_MODIFIED = new Date("2026-07-10T00:00:00.000Z");

