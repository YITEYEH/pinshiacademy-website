import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { TeacherRecruitmentClient } from "./TeacherRecruitmentClient";

export const metadata: Metadata = {
  title: "師資招募",
  description: "加入品識學苑教學團隊：完整培訓與成長機制，與我們一起為學生創造更好的學習體驗。",
  alternates: { canonical: `${SITE.url}/teacher-recruitment` },
};

export default function TeacherRecruitmentPage() {
  return <TeacherRecruitmentClient />;
}

