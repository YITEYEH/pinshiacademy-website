import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildCoursesJsonLd } from "@/lib/course-schema";
import { CoursesClient } from "./CoursesClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/courses",
  title: "線上升學輔導課程｜國文英文數學自然社會｜品識學苑",
  description:
    "品識學苑提供線上國文、英文、數學、自然、社會五科升學輔導，支援一對一與小班制，協助國中會考與高中學測、分科測驗準備。",
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

