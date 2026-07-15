import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildAboutJsonLd } from "@/lib/about-schema";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "為什麼選品識學苑？｜12年國教線上升學輔導品牌",
  description:
    "我們相信分數是過程、理解才是底氣。了解品識學苑如何用線上一對一與小班，陪台灣學生做會考、學測與長期學習力規劃。",
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

