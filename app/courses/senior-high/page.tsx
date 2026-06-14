import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SeniorHighClient } from "./SeniorHighClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/courses/senior-high",
  title: "高中升學輔導｜學測・分科測驗｜品識學苑",
  description:
    "品識學苑提供高中學測與分科測驗升學輔導，線上一對一與小班制，協助學生建立各科觀念、解題策略與讀書節奏，穩定提升成績。",
  titleAbsolute: true,
});

export default function SeniorHighCoursesPage() {
  return <SeniorHighClient />;
}
