import { dreamProjectFaqs, dreamProjectSeo } from "@/content/dream-project/page-copy";
import { SITE } from "@/lib/site";
import { buildBreadcrumbJsonLd } from "@/lib/about-schema";
import { organizationRef, WEBSITE_ID } from "@/lib/organization-schema";

export function buildDreamProjectJsonLd() {
  const pageUrl = `${SITE.url}/dream-project`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: dreamProjectSeo.title,
        description: dreamProjectSeo.description,
        inLanguage: "zh-Hant",
        isPartOf: { "@id": WEBSITE_ID },
        about: organizationRef(),
        publisher: organizationRef(),
      },
      buildBreadcrumbJsonLd([
        { name: "首頁", path: "/" },
        { name: "築夢計畫", path: "/dream-project" },
      ]),
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: dreamProjectFaqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };
}
