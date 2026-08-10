/** Next.js fetch 快取標籤，供 /api/revalidate?target=teachify 即時清除 */
export const TEACHIFY_CACHE_TAG = "teachify-catalog";

/** Teachify 資料自動重新抓取間隔（秒，1 小時）；須與 /live-events、/online-courses 的 revalidate 一致 */
export const TEACHIFY_REVALIDATE_SECONDS = 3_600;
