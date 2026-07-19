import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildStudentSuccessJsonLd } from "@/lib/student-success-schema";
import { StudentSuccessClient } from "./StudentSuccessClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/student-success",
  title: "學生成長故事｜看見孩子真正的改變｜品識學苑",
  description:
    "每一位孩子都有不同的起點，看品識學苑學生如何從不敢問、害怕數學，到願意思考、主動學習的真實成長故事",
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
