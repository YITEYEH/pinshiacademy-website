import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "關於我們",
  description:
    "認識品識學苑的使命與教學理念：以診斷、對齊與成長的系統化路徑，陪伴每位學生找到學習節奏。",
  alternates: { canonical: `${SITE.url}/about` },
};

export default function AboutPage() {
  return <AboutClient />;
}

