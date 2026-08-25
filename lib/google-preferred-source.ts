import { SITE } from "@/lib/site";

/**
 * Google 搜尋「偏好來源」深層連結
 * @see https://developers.google.com/search/docs/appearance/preferred-sources
 */
export function getGooglePreferredSourceUrl() {
  const hostname = new URL(SITE.url).hostname.replace(/^www\./, "");
  // Google 範例使用 apex（example.com）；同時保留 www 亦可，以 apex 為準較穩
  const q = encodeURIComponent(hostname);
  return `https://www.google.com/preferences/source?q=${q}`;
}

export const GOOGLE_PREFERRED_SOURCE_LABEL = "設為 Google 偏好來源";
