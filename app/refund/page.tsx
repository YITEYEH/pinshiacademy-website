import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RefundClient } from "./RefundClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/refund",
  title: "品識學苑課程報名、退費與退款辦法",
  description:
    "說明品識學苑線上一對一、小班、預錄課程與數位教材之退費條件、計算方式、請假補課及退款作業流程。",
  titleAbsolute: true,
});

export default function RefundPage() {
  return <RefundClient />;
}
