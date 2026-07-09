import { SITE } from "@/lib/site";
import { organizationRef, WEBSITE_ID } from "@/lib/organization-schema";
import { buildBreadcrumbJsonLd } from "@/lib/about-schema";

export function buildTeamJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/team#webpage`,
        url: `${SITE.url}/team`,
        name: "營運團隊｜品識學苑",
        description:
          "認識品識學苑營運團隊，了解我們如何支援教學品質與學生服務。",
        inLanguage: "zh-Hant",
        isPartOf: { "@id": WEBSITE_ID },
        about: organizationRef(),
      },
      buildBreadcrumbJsonLd([
        { name: "首頁", path: "/" },
        { name: "營運團隊", path: "/team" },
      ]),
    ],
  };
}
