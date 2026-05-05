import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TeacherRecruitmentClient } from "./TeacherRecruitmentClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/teacher-recruitment",
  title: "師資招募",
  description:
    "品識學苑招募國小到高中教學設計師與升學輔導師資，參與12年國教課程規劃與長期教育品牌發展，打造制度化成長環境",
});

export default function TeacherRecruitmentPage() {
  return <TeacherRecruitmentClient />;
}

