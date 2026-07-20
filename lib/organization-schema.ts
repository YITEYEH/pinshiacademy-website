import { CONTACT } from "@/lib/contact";
import { SOCIAL_SAME_AS } from "@/lib/social-links";
import { SITE } from "@/lib/site";
import { brandLogoUrl } from "@/lib/site-assets";

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

/** 創辦人 Person @id，與師資頁與 story 頁共用 */
export const FOUNDER_PERSON_ID = `${SITE.url}/teachers/yeh-yide`;

const ORGANIZATION_ALTERNATE_NAMES = [
  SITE.englishName,
  "PinShi Academy",
  "pinshiacademy",
] as const;

export function buildSiteJsonLdGraph() {
  const organization = {
    "@type": ["Organization", "EducationalOrganization"],
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: [...ORGANIZATION_ALTERNATE_NAMES],
    legalName: CONTACT.companyName,
    taxID: CONTACT.taxId,
    url: SITE.url,
    logo: brandLogoUrl(),
    description: SITE.defaultDescription,
    email: CONTACT.email,
    founder: { "@id": FOUNDER_PERSON_ID },
    sameAs: SOCIAL_SAME_AS,
    areaServed: {
      "@type": "Country",
      name: "Taiwan",
    },
    knowsAbout: [
      "12年國教",
      "會考",
      "學測",
      "分科測驗",
      "國文",
      "英文",
      "數學",
      "自然",
      "社會",
      "線上教學",
      "升學輔導",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT.email,
      availableLanguage: ["zh-TW"],
    },
    address: {
      "@type": "PostalAddress",
      postalCode: CONTACT.postalCode,
      streetAddress: CONTACT.registeredAddress,
      addressLocality: "台北市",
      addressCountry: "TW",
      description: CONTACT.registeredAddressNote,
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE.url}/`,
    name: SITE.name,
    alternateName: [
      SITE.englishName,
      "PinShi Academy",
      "www.pinshiacademy.com",
      "pinshiacademy.com",
    ],
    description: SITE.defaultDescription,
    inLanguage: "zh-Hant",
    publisher: { "@id": ORG_ID },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };
}

export function organizationRef() {
  return { "@id": ORG_ID };
}

export { ORG_ID, WEBSITE_ID };
