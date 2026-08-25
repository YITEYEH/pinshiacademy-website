import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildContactPageJsonLd } from "@/lib/contact-schema";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "不知道孩子該怎麼補？先從品識學苑學習評估開始",
  description:
    "一對一還是小班？該補哪一科？告訴我們孩子目前的年級、學習狀況與目標，先釐清真正遇到的問題，再一起找到下一步",
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

