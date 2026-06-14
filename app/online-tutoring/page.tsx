import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { OnlineTutoringClient } from "./OnlineTutoringClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/online-tutoring",
  title: "線上家教・線上補習｜一對一與小班｜品識學苑",
  description:
    "品識學苑提供線上一對一與小班制升學輔導，涵蓋國文、英文、數學、自然、社會五科，服務全台國中會考與高中學測考生，彈性排課、即時互動教學。",
  titleAbsolute: true,
});

export default function OnlineTutoringPage() {
  return <OnlineTutoringClient />;
}
