import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PricingClient } from "./PricingClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/pricing",
  title: "線上一對一課程費用參考｜國小國中高中價目｜品識學苑",
  description:
    "品識學苑線上一對一課程參考價目，涵蓋國小至高中各科單堂價格區間、班型方案與免費學習診斷。小班與期班請洽顧問取得專屬報價。",
  titleAbsolute: true,
});

export default function PricingPage() {
  return <PricingClient />;
}
