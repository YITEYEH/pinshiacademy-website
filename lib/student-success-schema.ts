import { studentSuccessFaqs } from "@/content/student-success";
import { SITE } from "@/lib/site";
import { buildBreadcrumbJsonLd } from "@/lib/about-schema";
import { organizationRef, WEBSITE_ID } from "@/lib/organization-schema";

export function buildStudentSuccessJsonLd() {
  const pageUrl = `${SITE.url}/student-success`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "學生成長故事｜看見孩子真正的改變｜品識學苑",
        description:
          "每一位孩子都有不同的起點，看品識學苑學生如何從不敢問、害怕數學，到願意思考、主動學習的真實成長故事",
        inLanguage: "zh-Hant",
        isPartOf: { "@id": WEBSITE_ID },
        about: organizationRef(),
      },
      buildBreadcrumbJsonLd([
        { name: "首頁", path: "/" },
        { name: "學生成果", path: "/student-success" },
      ]),
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: studentSuccessFaqs.map((item) => ({
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
