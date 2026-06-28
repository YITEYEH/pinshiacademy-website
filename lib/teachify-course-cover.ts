import "server-only";

import { fetchTeachifyOgImage } from "@/lib/teachify-og-image";

/** 從 Teachify 課程頁 og:image 取得封面（每日快取） */
export async function fetchTeachifyCourseCover(
  purchaseUrl: string,
): Promise<string | undefined> {
  return fetchTeachifyOgImage(purchaseUrl);
}
