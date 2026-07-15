import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildContactPageJsonLd } from "@/lib/contact-schema";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "預約學習評估｜線上諮詢會考學測課程｜品識學苑",
  description:
    "不確定孩子適不適合一對一或小班？透過 LINE／表單預約學習評估，說明年級、弱科與目標，我們協助規劃下一步。通常盡快回覆。",
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

