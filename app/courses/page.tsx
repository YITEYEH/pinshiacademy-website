import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildCoursesJsonLd } from "@/lib/course-schema";
import { CoursesClient } from "./CoursesClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/courses",
  title: "國小到高中線上一對一與小班課程｜國英數社自與試聽預約",
  description:
    "品識學苑提供國小、國中、高中線上一對一與小班輔導，涵蓋國英數社自；可先查看課程費用或預約免費試聽，依孩子程度與卡點安排適合的學習方式",
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
