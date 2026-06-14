import { organizationRef } from "@/lib/organization-schema";
import { CONTACT } from "@/lib/contact";
import { SITE } from "@/lib/site";

export function buildContactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE.url}/contact#contact`,
        url: `${SITE.url}/contact`,
        name: "聯絡品識學苑",
        description:
          "預約升學諮詢、了解線上課程安排，或洽詢合作提案。",
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: organizationRef(),
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: CONTACT.email,
        availableLanguage: ["zh-TW"],
        areaServed: "TW",
      },
    ],
  };
}
