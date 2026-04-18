import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { FaqClient } from "./FaqClient";

export const metadata: Metadata = {
  title: "常見問題",
  description: "整理家長與學生最常詢問的問題，幫助您快速了解品識學苑。",
  alternates: { canonical: `${SITE.url}/faq` },
};

export default function FaqPage() {
  return <FaqClient />;
}

