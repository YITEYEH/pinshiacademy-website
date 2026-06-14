import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { MathCourseClient } from "./MathCourseClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/courses/math",
  title: "高中數學補習・線上數學家教｜品識學苑",
  description:
    "品識學苑數學課程從觀念到解題，協助國中會考與高中學測、分科數學提升。線上一對一與小班制，建立邏輯思維與穩定解題能力。",
  titleAbsolute: true,
});

export default function MathCoursePage() {
  return <MathCourseClient />;
}
