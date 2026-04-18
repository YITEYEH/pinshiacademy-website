import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { TeamRecruitmentClient } from "./TeamRecruitmentClient";

export const metadata: Metadata = {
  title: "營運團隊招募",
  description: "加入品識學苑營運團隊：與教學團隊一起為學生與家長創造最好的體驗。",
  alternates: { canonical: `${SITE.url}/team-recruitment` },
};

export default function TeamRecruitmentPage() {
  return <TeamRecruitmentClient />;
}

