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
        name: "學生成長故事｜真實學習改變與會考案例｜品識學苑",
        description:
          "看品識學苑去識別化的學生成長故事、會考數學公開成果整理，以及課程觀察與家長回饋；先了解改變，再預約免費試聽",
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
