import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PrivacyClient } from "./PrivacyClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/privacy",
  title: "隱私權政策｜品識學苑",
  description:
    "說明品識學苑如何蒐集、處理、利用與保護官網、表單及課程服務中的個人資料，以及您的相關權利與聯絡方式",
  titleAbsolute: true,
});

export default function PrivacyPage() {
  return <PrivacyClient />;
}

