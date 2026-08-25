import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { FOUNDER_PERSON_ID, WEBSITE_ID } from "@/lib/organization-schema";
import { StoryClient } from "./StoryClient";
import { founderSignatureFont } from "./fonts";

export const metadata: Metadata = buildPageMetadata({
  path: "/story",
  title: "為什麼想做一間學苑？品識學苑的創辦故事",
  description:
    "從學生、成為老師，到決定創立一間學苑；認識創辦人葉以德一路走進教育的故事，以及「品識」這個名字真正想做的事",
  titleAbsolute: true,
});

export default function StoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "創辦人初心與品識學苑理念",
    description:
      "品識學苑創辦人葉以德分享教育理念與品牌誕生的故事",
    url: `${SITE.url}/story`,
    inLanguage: "zh-Hant",
    isPartOf: { "@id": WEBSITE_ID },
    about: {
      "@type": "EducationalOrganization",
      name: SITE.name,
      url: SITE.url,
    },
    author: { "@id": FOUNDER_PERSON_ID },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoryClient signatureNameClassName={founderSignatureFont.className} />
    </>
  );
}
