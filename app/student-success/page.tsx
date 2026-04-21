import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { StudentSuccessClient } from "./StudentSuccessClient";

export const metadata: Metadata = {
  title: "學生成果與家長見證｜品識學苑",
  description: "從成績提升到長期學習能力建立，探索品識學苑國小到高中學生的真實成長案例與升學成果，了解品識學習系統如何發揮效果",
  alternates: { canonical: `${SITE.url}/student-success` },
};

export default function StudentSuccessPage() {
  return <StudentSuccessClient />;
}

