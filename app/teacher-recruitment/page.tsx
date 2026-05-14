import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TeacherRecruitmentClient } from "./TeacherRecruitmentClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/teacher-recruitment",
  title: "師資招募｜加入品識學苑國小國中高中教學與升學輔導團隊",
  description:
    "品識學苑招募具教學熱忱與專業背景的國小、國中、高中師資與教學設計夥伴，參與12年國教課程規劃、升學輔導與長期教育品牌發展。",
  titleAbsolute: true,
});

export default function TeacherRecruitmentPage() {
  return <TeacherRecruitmentClient />;
}

