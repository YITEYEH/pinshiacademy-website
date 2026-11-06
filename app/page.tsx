import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/content/content-api/posts";
import { buildPageMetadata } from "@/lib/seo";
import { buildHomeJsonLd } from "@/lib/home-schema";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeBelowFold } from "./HomeClient";

/** 對齊 Hero，保留品牌與「線上一對一」搜尋意圖；不刪既有可排名詞 */
const homeTitle = "國高中線上一對一家教｜品識學苑從學習診斷開始找卡點";
const homeDescription =
  "國英數社自線上一對一與小班輔導；從學習程度、觀念與解題方式找出瓶頸，再規劃適合孩子的方向。可先預約免費試聽";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: homeTitle,
  description: homeDescription,
  titleAbsolute: true,
});

/** 與 WP fetch／部落格列表對齊，避免新文卡在舊 Data Cache */
export const revalidate = 60;

async function HomeLatestPosts() {
  const latestPosts = (await getAllPosts()).slice(0, 5);
  return <HomeBelowFold latestPosts={latestPosts} />;
}

export default function HomePage() {
  const homeJsonLd = buildHomeJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HomeHero />
      <Suspense fallback={null}>
        <HomeLatestPosts />
      </Suspense>
    </>
  );
}
