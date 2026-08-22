import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { buildTeamJsonLd } from "@/lib/team-schema";
import { threeTeachersSeo } from "@/content/team/page-copy";
import { TeamClient } from "./TeamClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/team",
  title: threeTeachersSeo.title,
  description: threeTeachersSeo.description,
  titleAbsolute: true,
  ogImageAlt: threeTeachersSeo.ogTitle,
});

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildTeamJsonLd()),
        }}
      />
      <TeamClient />
    </>
  );
}
