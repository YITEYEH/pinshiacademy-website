import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PrivacyClient } from "./PrivacyClient";

export const metadata: Metadata = {
  title: "隱私權政策",
  description: "品識學苑隱私權政策：說明個人資料蒐集、使用與保護方式，以及您的相關權利。",
  alternates: { canonical: `${SITE.url}/privacy` },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}

