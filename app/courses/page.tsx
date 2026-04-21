import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { CoursesClient } from "./CoursesClient";

export const metadata: Metadata = {
  title: "國小國中高中升學輔導課程推薦｜品識學苑",
  description:
    "專為12年國教設計的升學輔導課程，透過AI個人化學習與系統化教學，幫助學生有效提升成績與升學競爭力",
  alternates: { canonical: `${SITE.url}/courses` },
};

export default function CoursesPage() {
  return <CoursesClient />;
}

