import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { HomeClient } from "./HomeClient";

const homeTitle = "品識學苑｜12年國教升學輔導";
const homeDescription =
  "品識學苑結合12年國教升學策略與個人化學習系統，提供國小到高中學生完整課程與長期學習規劃，從成績提升到終身學習能力養成";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: homeTitle,
  description: homeDescription,
  titleAbsolute: true,
});

export default function HomePage() {
  return <HomeClient />;
}

