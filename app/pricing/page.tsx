import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PricingClient } from "./PricingClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/pricing",
  title: "線上一對一課程費用｜國小國中高中參考價目｜品識學苑",
  description:
    "品識學苑線上一對一課程參考價格，涵蓋國小至高中各科單堂費用、課程內容、免費學習診斷與試教體驗說明。實際報價依學生需求調整。",
  titleAbsolute: true,
});

export default function PricingPage() {
  return <PricingClient />;
}
