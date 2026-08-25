import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TeacherRecruitmentClient } from "./TeacherRecruitmentClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/teacher-recruitment",
  title: "想成為線上老師？品識學苑正在尋找教學夥伴",
  description:
    "我們尋找的不只是會解題的老師，更是願意理解學生、持續精進教學的夥伴；查看國小、國中、高中師資招募與合作方式",
  titleAbsolute: true,
});

export default function TeacherRecruitmentPage() {
  return <TeacherRecruitmentClient />;
}

