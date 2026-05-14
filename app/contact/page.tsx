import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "聯絡品識學苑｜預約諮詢、課程規劃與合作洽詢",
  description:
    "想預約升學諮詢、了解國小國中高中課程安排，或有企業與校園合作提案，歡迎透過本頁方式與品識學苑聯繫，我們將盡快回覆您的需求。",
  titleAbsolute: true,
});

export default function ContactPage() {
  return <ContactClient />;
}

