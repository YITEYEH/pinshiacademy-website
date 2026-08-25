import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildTeachersJsonLd } from "@/lib/teachers-schema";
import { teachersPageSeo } from "@/content/teachers/page-copy";
import { TeachersClient } from "./TeachersClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/teachers",
  title: teachersPageSeo.title,
  description: teachersPageSeo.description,
  titleAbsolute: true,
  ogImageAlt: teachersPageSeo.ogTitle,
});

export default function TeachersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildTeachersJsonLd()),
        }}
      />
      <TeachersClient />
    </>
  );
}
