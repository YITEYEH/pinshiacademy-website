import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildCoursesJsonLd } from "@/lib/course-schema";
import { CoursesClient } from "./CoursesClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/courses",
  title: "線上一對一與小班｜國英數社自｜品識學苑",
  description:
    "不是一直刷題，而是先把觀念學會線上一對一／小班依程度規劃會考與學測，比較班型差異，找到適合孩子的上課方式",
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

