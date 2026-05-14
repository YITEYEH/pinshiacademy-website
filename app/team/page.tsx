import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TeamClient } from "./TeamClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/team",
  title: "營運團隊介紹｜品識學苑課程營運與教學設計幕後推手",
  description:
    "了解品識學苑營運與教學設計團隊如何支撐課程品質、家長服務與品牌發展，專注12年國教升學規劃與長期教育願景的落實。",
  titleAbsolute: true,
});

export default function TeamPage() {
  return <TeamClient />;
}

