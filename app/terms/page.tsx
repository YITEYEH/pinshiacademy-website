import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TermsClient } from "./TermsClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/terms",
  title: "網站使用條款與服務規範｜品識學苑",
  description:
    "說明使用品識學苑官網、預約及相關教育服務時的權利義務，包含內容使用、服務規範、免責聲明與爭議處理方式",
  titleAbsolute: true,
});

export default function TermsPage() {
  return <TermsClient />;
}

