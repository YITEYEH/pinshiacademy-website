import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "聯絡我們",
  description: "預約諮詢、課程規劃或合作提案，歡迎與品識學苑聯繫。",
});

export default function ContactPage() {
  return <ContactClient />;
}

