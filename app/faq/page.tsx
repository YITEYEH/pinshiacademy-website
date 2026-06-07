import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { faqCategories } from "@/content/faq-data";
import { FaqClient } from "./FaqClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/faq",
  title: "常見問題｜課程、排課與12年國教升學諮詢一次看懂",
  description:
    "整理家長最常詢問的排課方式、課程費用、學習診斷與12年國教升學規劃等問題，協助您快速了解品識學苑的教學理念與服務流程。",
  titleAbsolute: true,
});

function buildFaqJsonLd() {
  const mainEntity = faqCategories.flatMap((cat) =>
    cat.questions.map((item) => ({
      "@type": "Question" as const,
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.a,
      },
    })),
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/faq#faq`,
    mainEntity,
  };
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd()),
        }}
      />
      <FaqClient />
    </>
  );
}
