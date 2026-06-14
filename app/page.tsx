import type { Metadata } from "next";
import { getAllPosts } from "@/content/content-api/posts";
import { faqCategories } from "@/content/faq-data";
import { buildPageMetadata } from "@/lib/seo";
import { HomeClient } from "./HomeClient";

const homeTitle = "品識學苑｜線上升學輔導｜國中會考・高中學測・五科一對一";
const homeDescription =
  "品識學苑提供線上國文、英文、數學、自然、社會升學輔導，支援一對一與小班制，協助國中會考與高中學測、分科測驗準備，建立長期學習能力。";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: homeTitle,
  description: homeDescription,
  titleAbsolute: true,
});

export default async function HomePage() {
  const latestPosts = (await getAllPosts()).slice(0, 3);
  const faqPreview = faqCategories.flatMap((c) => c.questions).slice(0, 3);
  return <HomeClient latestPosts={latestPosts} faqPreview={faqPreview} />;
}

