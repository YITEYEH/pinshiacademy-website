import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildStudentSuccessJsonLd } from "@/lib/student-success-schema";
import { StudentSuccessClient } from "./StudentSuccessClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/student-success",
  title: "學生進步案例｜從害怕到聽得懂、考得穩｜品識學苑",
  description:
    "看真實學習歷程：基礎重建、解題信心與段考／會考準備如何一步步改變。若你家孩子也卡在同關卡，歡迎預約學習評估一起規劃。",
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

