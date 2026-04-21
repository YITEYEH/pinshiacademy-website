import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { TeamRecruitmentClient } from "./TeamRecruitmentClient";

export const metadata: Metadata = {
  title: "營運團隊招募｜品識學苑",
  description: "加入品識學苑營運團隊，參與教育品牌策略、課程架構與制度設計，專注12年國教升學規劃與長期發展",
  alternates: { canonical: `${SITE.url}/team-recruitment` },
};

export default function TeamRecruitmentPage() {
  return <TeamRecruitmentClient />;
}

