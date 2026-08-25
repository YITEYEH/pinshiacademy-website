import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PrivacyClient } from "./PrivacyClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/privacy",
  title: "隱私權政策｜個人資料保護｜品識學苑",
  description:
    "說明品識學苑如何蒐集、處理與保護您於官網、表單或課程服務中提供的個人資料，以及您依法享有的權利與聯絡方式",
  titleAbsolute: true,
});

export default function PrivacyPage() {
  return <PrivacyClient />;
}

