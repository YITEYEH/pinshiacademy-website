import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "聯絡我們",
  description: "預約諮詢、課程規劃或合作提案，歡迎與品識學苑聯繫。",
  alternates: { canonical: `${SITE.url}/contact` },
};

export default function ContactPage() {
  return <ContactClient />;
}

