import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { StudentSuccessClient } from "./StudentSuccessClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/student-success",
  title: "升學輔導成果與家長見證｜品識學苑",
  description:
    "從成績提升到長期學習能力建立，探索品識學苑國中會考與高中學測學生的真實成長案例與家長見證，了解線上升學輔導如何發揮效果。",
  titleAbsolute: true,
});

export default function StudentSuccessPage() {
  return <StudentSuccessClient />;
}

