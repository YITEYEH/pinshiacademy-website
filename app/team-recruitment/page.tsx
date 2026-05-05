import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TeamRecruitmentClient } from "./TeamRecruitmentClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/team-recruitment",
  title: "營運團隊招募",
  description:
    "加入品識學苑營運團隊，參與教育品牌策略、課程架構與制度設計，專注12年國教升學規劃與長期發展",
});

export default function TeamRecruitmentPage() {
  return <TeamRecruitmentClient />;
}

