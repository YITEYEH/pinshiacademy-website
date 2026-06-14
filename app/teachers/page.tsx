import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildTeachersJsonLd } from "@/lib/teachers-schema";
import { TeachersClient } from "./TeachersClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/teachers",
  title: "師資團隊介紹｜品識學苑國小國中高中升學輔導教師",
  description:
    "認識品識學苑專業師資：具備12年國教升學輔導與線上教學經驗，涵蓋國文、數學等科目，陪伴國中會考與高中學測學生穩定成長。",
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

