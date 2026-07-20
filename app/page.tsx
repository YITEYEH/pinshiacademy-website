import type { Metadata } from "next";
import { getAllPosts } from "@/content/content-api/posts";
import { faqCategories } from "@/content/faq-data";
import { buildPageMetadata } from "@/lib/seo";
import { buildHomeJsonLd } from "@/lib/home-schema";
import { HomeClient } from "./HomeClient";

const homeTitle =
  "品識學苑｜國中會考・高中學測線上輔導｜一對一找到孩子卡關點";
const homeDescription =
  "成績卡住、越補越焦慮？品識學苑提供國英數社自線上一對一與小班，先診斷弱點再排課，協助會考、學測與分科穩步進步。立即預約學習評估。";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: homeTitle,
  description: homeDescription,
  titleAbsolute: true,
});

/** 與 WP fetch 快取一致；WordPress 發布時另由 /api/revalidate 即時清除 */
export const revalidate = 60;

export default async function HomePage() {
  const latestPosts = (await getAllPosts()).slice(0, 5);
  const faqPreview = faqCategories.flatMap((c) => c.questions).slice(0, 4);
  const homeJsonLd = buildHomeJsonLd(faqPreview);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HomeClient latestPosts={latestPosts} faqPreview={faqPreview} />
    </>
  );
}

