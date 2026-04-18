const DEFAULT_SITE_URL = "https://pinshiacademy.com";

function normalizeSiteUrl(raw: string | undefined): string {
  const trimmed = raw?.trim();
  if (!trimmed) return DEFAULT_SITE_URL;
  try {
    const u = new URL(trimmed);
    if (u.protocol !== "http:" && u.protocol !== "https:") {
      return DEFAULT_SITE_URL;
    }
    return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
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

