import {
  pricingCardTiers,
  pricingFaqSection,
} from "@/content/pricing";
import { SITE } from "@/lib/site";
import { organizationRef, WEBSITE_ID } from "@/lib/organization-schema";
import { buildBreadcrumbJsonLd } from "@/lib/about-schema";

function pricingFaqAnswerText(
  item: (typeof pricingFaqSection.items)[number],
): string {
  if ("answer" in item && item.answer) {
    return item.answer;
  }
  if (
    "answerPrefix" in item &&
    item.answerPrefix &&
    item.answerSuffix
  ) {
    return `${item.answerPrefix}${SITE.url}/refund${item.answerSuffix}`;
  }
  return "";
}

export function buildPricingJsonLd() {
  const minPrice = Math.min(...pricingCardTiers.map((t) => t.startingAmount));
  const maxPrice = Math.max(...pricingCardTiers.map((t) => t.startingAmount));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE.url}/pricing#service`,
        name: "品識學苑線上升學輔導課程",
        description:
          "品識學苑提供國小、國中、高中一對一與小班制線上升學輔導，涵蓋國文、英文、數學、社會、自然五科。",
        provider: organizationRef(),
        areaServed: {
          "@type": "Country",
          name: "Taiwan",
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "TWD",
          lowPrice: minPrice,
          highPrice: maxPrice,
          offerCount: pricingCardTiers.length,
          url: `${SITE.url}/pricing`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/pricing#faq`,
        mainEntity: pricingFaqSection.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: pricingFaqAnswerText(item),
          },
        })),
      },
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/pricing#webpage`,
        url: `${SITE.url}/pricing`,
        name: "課程費用｜品識學苑",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": `${SITE.url}/pricing#service` },
      },
      buildBreadcrumbJsonLd([
        { name: "首頁", path: "/" },
        { name: "課程費用", path: "/pricing" },
      ]),
    ],
  };
}
