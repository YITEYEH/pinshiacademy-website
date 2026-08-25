import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TeacherRecruitmentClient } from "./TeacherRecruitmentClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/teacher-recruitment",
  title: "師資招募｜國小國中高中教學夥伴｜品識學苑",
  description:
    "招募具熱忱與專業的國小、國中、高中師資與教學設計夥伴，一起參與課程規劃、升學輔導與長期教育品牌發展",
  titleAbsolute: true,
});

export default function TeacherRecruitmentPage() {
  return <TeacherRecruitmentClient />;
}

