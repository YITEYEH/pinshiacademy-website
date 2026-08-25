import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { faqCategories } from "@/content/faq-data";
import { FaqClient } from "./FaqClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/faq",
  title: "線上補習常見問題｜費用排課試聽｜品識學苑",
  description:
    "線上上課穩不穩？可以試聽嗎？費用怎麼算？整理家長最常問的報名、排課與升學問題，快速了解品識學苑怎麼陪孩子學習",
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
