import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildCoursesJsonLd } from "@/lib/course-schema";
import { CoursesClient } from "./CoursesClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/courses",
  title: "線上一對一還是小班？找到適合孩子的上課方式",
  description:
    "國英數社自線上一對一與小班怎麼選？查看課程內容與上課方式，依孩子目前的程度、問題與目標，找到更適合的學習安排",
  titleAbsolute: true,
});

export default function CoursesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildCoursesJsonLd()),
        }}
      />
      <CoursesClient />
    </>
  );
}

