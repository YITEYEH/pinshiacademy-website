import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildDreamProjectJsonLd } from "@/lib/dream-project-schema";
import { dreamProjectSeo } from "@/content/dream-project/page-copy";
import { DreamProjectClient } from "./DreamProjectClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/dream-project",
  title: dreamProjectSeo.title,
  description: dreamProjectSeo.description,
  titleAbsolute: true,
  ogImageAlt: dreamProjectSeo.ogTitle,
});

export default function DreamProjectPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildDreamProjectJsonLd()),
        }}
      />
      <DreamProjectClient />
    </>
  );
}
