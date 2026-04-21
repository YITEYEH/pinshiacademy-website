import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { FaqClient } from "./FaqClient";

export const metadata: Metadata = {
  title: "常見問題｜品識學苑",
  description: "品識學苑結合12年國教升學策略與個人化學習系統，提供國小到高中完整課程與長期學習規劃，協助學生穩定提升成績與建立終身學習能力",
  alternates: { canonical: `${SITE.url}/faq` },
};

export default function FaqPage() {
  return <FaqClient />;
}

