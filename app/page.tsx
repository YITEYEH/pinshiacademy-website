import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: { absolute: "品識學苑｜12年國教升學輔導" },
  description:
    "品識學苑結合12年國教升學策略與個人化學習系統，提供國小到高中學生完整課程與長期學習規劃，從成績提升到終身學習能力養成",
};

export default function HomePage() {
  return <HomeClient />;
}

