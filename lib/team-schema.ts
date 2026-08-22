import { SITE } from "@/lib/site";
import { organizationRef, WEBSITE_ID } from "@/lib/organization-schema";
import { buildBreadcrumbJsonLd } from "@/lib/about-schema";
import { threeTeachersSeo } from "@/content/team/page-copy";

export function buildTeamJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/team#webpage`,
        url: `${SITE.url}/team`,
        name: threeTeachersSeo.title,
        description: threeTeachersSeo.description,
        inLanguage: "zh-Hant",
        isPartOf: { "@id": WEBSITE_ID },
        about: organizationRef(),
      },
      buildBreadcrumbJsonLd([
        { name: "首頁", path: "/" },
        { name: "學習支持團隊", path: "/team" },
      ]),
    ],
  };
}
