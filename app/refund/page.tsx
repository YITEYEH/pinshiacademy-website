import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RefundClient } from "./RefundClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/refund",
  title: "課程報名與退費辦法｜品識學苑",
  description:
    "說明線上一對一、小班、預錄課程與數位教材的退費條件、計算方式、請假補課及退款作業流程，報名前請詳閱",
  titleAbsolute: true,
});

export default function RefundPage() {
  return <RefundClient />;
}
