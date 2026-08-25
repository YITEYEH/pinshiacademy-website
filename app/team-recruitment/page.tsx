import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TeamRecruitmentClient } from "./TeamRecruitmentClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/team-recruitment",
  title: "營運團隊招募｜課程營運與制度｜品識學苑",
  description:
    "加入品識學苑營運團隊，參與品牌策略、課程營運、行政制度與家長服務，一起專注升學規劃與長期教育品牌發展",
  titleAbsolute: true,
});

export default function TeamRecruitmentPage() {
  return <TeamRecruitmentClient />;
}

