import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RefundClient } from "./RefundClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/refund",
  title: "課程退費、請假與補課辦法｜品識學苑",
  description:
    "查看線上一對一、小班與預錄課程的退費規則，以及請假、改期、補課與退款方式，報名前即可完整了解相關規範",
  titleAbsolute: true,
});

export default function RefundPage() {
  return <RefundClient />;
}
