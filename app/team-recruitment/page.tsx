import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TeamRecruitmentClient } from "./TeamRecruitmentClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/team-recruitment",
  title: "營運團隊招募｜教育品牌、課程營運與制度設計職缺",
  description:
    "加入品識學苑營運團隊，參與教育品牌策略、課程營運、行政制度與家長服務流程設計，與我們一起專注12年國教升學規劃與長期品牌發展。",
  titleAbsolute: true,
});

export default function TeamRecruitmentPage() {
  return <TeamRecruitmentClient />;
}

