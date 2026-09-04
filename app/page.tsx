import type { Metadata } from "next";
import { getAllPosts } from "@/content/content-api/posts";
import { buildPageMetadata } from "@/lib/seo";
import { buildHomeJsonLd } from "@/lib/home-schema";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeClient } from "./HomeClient";

const homeTitle = "線上一對一家教怎麼選？品識學苑先陪孩子找到卡關點";
const homeDescription =
  "成績卡住，不一定是題目做得不夠；國英數社自線上一對一與小班課程，先了解程度、弱點與目標，再找到適合孩子的學習方式";

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
  const homeJsonLd = buildHomeJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HomeHero />
      <HomeClient latestPosts={latestPosts} />
    </>
  );
}
