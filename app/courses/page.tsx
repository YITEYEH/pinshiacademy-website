import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { CoursesClient } from "./CoursesClient";

export const metadata: Metadata = {
  title: "課程介紹",
  description:
    "國英數社自五大科目與升學策略規劃，提供家教制與預錄課程兩種學習方式，為不同需求量身打造學習路徑。",
  alternates: { canonical: `${SITE.url}/courses` },
};

export default function CoursesPage() {
  return <CoursesClient />;
}

