import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { StoryClient } from "./StoryClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/story",
  title: "創辦人的初心與品識學苑的理念｜理解才是底氣",
  description:
    "品識學苑創辦人葉以德分享從學生到教育工作者的歷程，以及品牌如何以品德、知識、見識、膽識陪伴每位孩子建立真正的學習能力。",
  titleAbsolute: true,
});

export default function StoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "創辦人的初心與品識學苑的理念",
    description:
      "品識學苑創辦人葉以德分享教育理念與品牌誕生的故事。",
    url: `${SITE.url}/story`,
    inLanguage: "zh-Hant",
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: {
      "@type": "EducationalOrganization",
      name: SITE.name,
      url: SITE.url,
    },
    author: {
      "@type": "Person",
      name: "葉以德",
      jobTitle: "品識學苑創辦人",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoryClient />
    </>
  );
}
