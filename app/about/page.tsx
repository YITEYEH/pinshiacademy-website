import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "關於品識學苑｜專注12年國教升學規劃的教育品牌",
  description:
    "從制度理解到學習規劃，品識學苑專注於12年國教升學輔導與國高中課程設計，幫助學生在成績與能力上同步成長",
  alternates: { canonical: `${SITE.url}/about` },
};

export default function AboutPage() {
  return <AboutClient />;
}

