import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TeamClient } from "./TeamClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/team",
  title: "營運團隊介紹",
  description:
    "品識學苑由專業營運團隊共同組成，專注於12年國教升學規劃與課程架構發展，打造穩定成長的教育品牌",
});

export default function TeamPage() {
  return <TeamClient />;
}

