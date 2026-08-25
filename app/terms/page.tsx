import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TermsClient } from "./TermsClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/terms",
  title: "網站使用條款｜權利義務說明｜品識學苑",
  description:
    "說明使用品識學苑官網、預約諮詢與教育服務時應遵守的規範，包含內容使用、免責聲明與爭議處理，以保障雙方權益",
  titleAbsolute: true,
});

export default function TermsPage() {
  return <TermsClient />;
}

