import { SITE } from "@/lib/site";
import { organizationRef, WEBSITE_ID } from "@/lib/organization-schema";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  const lastPath = items[items.length - 1]?.path ?? "/";
  const pageUrl = lastPath === "/" ? SITE.url : `${SITE.url}${lastPath}`;

  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE.url : `${SITE.url}${item.path}`,
    })),
  };
}

export function buildAboutJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE.url}/about#webpage`,
        url: `${SITE.url}/about`,
        name: "關於品識學苑",
        description:
          "從制度理解到學習規劃，品識學苑專注於12年國教升學輔導與國高中課程設計",
        inLanguage: "zh-Hant",
        isPartOf: { "@id": WEBSITE_ID },
        about: organizationRef(),
      },
      buildBreadcrumbJsonLd([
        { name: "首頁", path: "/" },
        { name: "關於我們", path: "/about" },
      ]),
    ],
  };
}
