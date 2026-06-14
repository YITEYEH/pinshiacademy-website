import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { faqCategories } from "@/content/faq-data";
import { FaqClient } from "./FaqClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/faq",
  title: "補習常見問題｜線上一對一、會考學測、費用與排課｜品識學苑",
  description:
    "整理線上補習、一對一與小班制、會考學測準備、課程費用與排課等常見問題，協助家長快速了解品識學苑的教學方式與服務流程。",
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
