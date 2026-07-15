import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildTeachersJsonLd } from "@/lib/teachers-schema";
import { TeachersClient } from "./TeachersClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/teachers",
  title: "認識授課老師｜數學・國文線上師資｜品識學苑",
  description:
    "老師合不合適，比教材更重要。了解品識學苑師資的教學理念與專長，選擇適合孩子個性與程度的國中會考、高中學測輔導老師。",
  titleAbsolute: true,
});

export default function TeachersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildTeachersJsonLd()),
        }}
      />
      <TeachersClient />
    </>
  );
}

