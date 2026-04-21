import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PrivacyClient } from "./PrivacyClient";

export const metadata: Metadata = {
  title: "隱私權政策",
  description: "品識學苑結合12年國教升學策略與AI個人化學習系統，提供國高中完整課程與長期學習規劃，協助學生穩定提升成績與建立終身學習能力",
  alternates: { canonical: `${SITE.url}/privacy` },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}

