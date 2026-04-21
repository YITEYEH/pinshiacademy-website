import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { TeamClient } from "./TeamClient";

export const metadata: Metadata = {
  title: "營運團隊介紹｜品識學苑",
  description: "品識學苑由專業營運團隊共同組成，專注於12年國教升學規劃與課程架構發展，打造穩定成長的教育品牌",
  alternates: { canonical: `${SITE.url}/team` },
};

export default function TeamPage() {
  return <TeamClient />;
}

