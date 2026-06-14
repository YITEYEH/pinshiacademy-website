import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildContactPageJsonLd } from "@/lib/contact-schema";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "聯絡品識學苑｜預約諮詢、課程規劃與合作洽詢",
  description:
    "想預約線上升學諮詢、了解國中會考或高中學測課程安排，或有合作提案，歡迎透過本頁與品識學苑聯繫，我們將盡快回覆。",
  titleAbsolute: true,
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildContactPageJsonLd()),
        }}
      />
      <ContactClient />
    </>
  );
}

