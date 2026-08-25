import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildStudentSuccessJsonLd } from "@/lib/student-success-schema";
import { StudentSuccessClient } from "./StudentSuccessClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/student-success",
  title: "孩子真的有改變嗎？看看品識學苑的學生成長故事",
  description:
    "每個孩子的起點都不同；從不敢問到願意思考、從卡住到慢慢理解，看看學生的真實學習成果、成長歷程與家長回饋",
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
