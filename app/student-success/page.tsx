import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { StudentSuccessClient } from "./StudentSuccessClient";

export const metadata: Metadata = {
  title: "學生成果",
  description: "看看學生如何在品識學苑找到學習節奏，建立自信，穩定進步。",
  alternates: { canonical: `${SITE.url}/student-success` },
};

export default function StudentSuccessPage() {
  return <StudentSuccessClient />;
}

