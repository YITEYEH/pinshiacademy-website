import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TermsClient } from "./TermsClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/terms",
  title: "品識學苑網站使用條款｜官網與服務之權利義務說明",
  description:
    "說明您使用品識學苑官網、預約諮詢與相關教育服務時應遵守的規範，包含內容使用、免責聲明與爭議處理等事項，以保障雙方權益。",
  titleAbsolute: true,
});

export default function TermsPage() {
  return <TermsClient />;
}

