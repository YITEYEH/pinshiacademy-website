import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { faqCategories } from "@/content/faq-data";
import { FaqClient } from "./FaqClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/faq",
  title: "線上家教怎麼上？費用、試聽與排課問題一次看",
  description:
    "可以試聽嗎？費用怎麼算？請假怎麼辦？整理品識學苑課程、報名、排課與上課常見問題，開始以前先把疑問一次看懂",
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
