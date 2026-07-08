import type { MetadataRoute } from "next";
import { getAllTeacherSlugs } from "@/content/teachers-data";
import { SITE, STATIC_SITEMAP_LAST_MODIFIED } from "@/lib/site";
import { getAllPosts } from "@/content/content-api/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticLastMod = STATIC_SITEMAP_LAST_MODIFIED;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: staticLastMod, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/about`, lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/story`, lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE.url}/courses`, lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/online-courses`, lastModified: staticLastMod, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE.url}/live-events`, lastModified: staticLastMod, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE.url}/teachers`, lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.8 },
    ...getAllTeacherSlugs().map((slug) => ({
      url: `${SITE.url}/teachers/${slug}`,
      lastModified: staticLastMod,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    { url: `${SITE.url}/team`, lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/student-success`, lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/blog`, lastModified: staticLastMod, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/faq`, lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/pricing`, lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/teacher-recruitment`, lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/team-recruitment`, lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/contact`, lastModified: staticLastMod, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE.url}/privacy`, lastModified: staticLastMod, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/terms`, lastModified: staticLastMod, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/refund`, lastModified: staticLastMod, changeFrequency: "yearly", priority: 0.3 },
  ];

  const posts = (await getAllPosts()).map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...posts];
}

