import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildAboutJsonLd } from "@/lib/about-schema";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "為什麼不只看分數？認識品識學苑的教育理念",
  description:
    "分數是過程，理解是底氣；認識品識如何從理解學生開始，把課程、學習方法與陪伴放在一起，讓進步不只停留在下一次考試",
  titleAbsolute: true,
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildAboutJsonLd()),
        }}
      />
      <AboutClient />
    </>
  );
}

