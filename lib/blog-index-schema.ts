import type { BlogPostSummary } from "@/content/content-api/types";
import { organizationRef } from "@/lib/organization-schema";
import { SITE } from "@/lib/site";

export function buildBlogIndexJsonLd(posts: BlogPostSummary[]) {
  const blogId = `${SITE.url}/blog#blog`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": blogId,
        name: "品識學苑學習專欄",
        url: `${SITE.url}/blog`,
        description:
          "品識學苑關於12年國教升學規劃、學習方法、親子溝通與各科讀書策略的文章。",
        publisher: organizationRef(),
        inLanguage: "zh-TW",
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE.url}/blog#collection`,
        url: `${SITE.url}/blog`,
        name: "學習專欄",
        isPartOf: { "@id": blogId },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: posts.slice(0, 20).map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE.url}/blog/${post.slug}`,
            name: post.frontmatter.title,
          })),
        },
      },
    ],
  };
}
