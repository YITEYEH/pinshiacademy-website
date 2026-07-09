import type { FaqItem } from "@/content/faq-data";
import { learningProcess } from "@/content/learning-process";
import { SITE } from "@/lib/site";
import { organizationRef, WEBSITE_ID } from "@/lib/organization-schema";
import { buildLearningProcessHowToJsonLd } from "@/lib/learning-process-schema";

export function buildHomeFaqJsonLd(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function buildHomeJsonLd(faqPreview: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/#webpage`,
        url: SITE.url,
        name: "品識學苑｜線上升學輔導",
        description:
          "品識學苑提供線上國文、英文、數學、自然、社會升學輔導，支援一對一與小班制，協助國中會考與高中學測準備。",
        inLanguage: "zh-Hant",
        isPartOf: { "@id": WEBSITE_ID },
        about: organizationRef(),
      },
      buildHomeFaqJsonLd(faqPreview),
      buildLearningProcessHowToJsonLd(),
    ],
  };
}
