import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TeamRecruitmentClient } from "./TeamRecruitmentClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/team-recruitment",
  title: "想一起把教育做好？加入品識學苑營運團隊",
  description:
    "教育不只有站在課堂上的老師；加入品識營運團隊，參與課程營運、家長服務、品牌發展與制度建立，一起把學習服務做得更好",
  titleAbsolute: true,
});

export default function TeamRecruitmentPage() {
  return <TeamRecruitmentClient />;
}

