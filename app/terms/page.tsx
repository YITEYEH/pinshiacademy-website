import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { TermsClient } from "./TermsClient";

export const metadata: Metadata = {
  title: "使用政策",
  description: "品識學苑使用政策：費用與付款、出席請假、行為規範、智慧財產權與爭議處理等條款。",
  alternates: { canonical: `${SITE.url}/terms` },
};

export default function TermsPage() {
  return <TermsClient />;
}

