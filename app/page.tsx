import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getAllPosts } from "@/content/content-api/posts";
import { faqCategories } from "@/content/faq-data";
import { buildPageMetadata } from "@/lib/seo";
import { buildHomeJsonLd } from "@/lib/home-schema";
import { HomeHero } from "@/components/home/HomeHero";

const HomeClient = dynamic(
  () =>
    import("./HomeClient").then((mod) => ({ default: mod.HomeClient })),
  {
    loading: () => (
      <div className="min-h-[40vh] bg-white" aria-hidden />
    ),
  },
);

const homeTitle = "品識學苑｜會考學測線上一對一｜找到卡關點";
const homeDescription =
  "成績卡住、越補越焦慮？品識學苑提供國英數社自線上一對一與小班，先診斷弱點再排課，協助會考與學測穩步進步立即預約學習評估";

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
      <HomeHero />
      <HomeClient latestPosts={latestPosts} faqPreview={faqPreview} />
    </>
  );
}

