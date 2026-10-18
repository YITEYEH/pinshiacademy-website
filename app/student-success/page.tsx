import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildStudentSuccessJsonLd } from "@/lib/student-success-schema";
import { StudentSuccessClient } from "./StudentSuccessClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/student-success",
  title: "學生成長故事｜真實學習改變與會考案例｜品識學苑",
  description:
    "看品識學苑去識別化的學生成長故事、會考數學公開成果整理，以及課程觀察與家長回饋；先了解改變，再預約免費試聽",
  titleAbsolute: true,
});

export default function StudentSuccessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildStudentSuccessJsonLd()),
        }}
      />
      <StudentSuccessClient />
    </>
  );
}
