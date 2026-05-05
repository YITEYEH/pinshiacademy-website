import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { FaqClient } from "./FaqClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/faq",
  title: "常見問題",
  description:
    "品識學苑結合12年國教升學策略與個人化學習系統，提供國小到高中完整課程與長期學習規劃，協助學生穩定提升成績與建立終身學習能力",
});

export default function FaqPage() {
  return <FaqClient />;
}

