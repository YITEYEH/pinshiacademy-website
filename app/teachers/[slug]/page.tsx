import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata, buildNotFoundMetadata } from "@/lib/seo";
import { buildTeacherProfileJsonLd } from "@/lib/teachers-schema";
import {
  getAllTeacherSlugs,
  getTeacherBySlug,
} from "@/content/teachers-data";
import { getTeacherProfile } from "@/content/teacher-profiles";
import { SITE } from "@/lib/site";
import { TeacherProfileClient } from "./TeacherProfileClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllTeacherSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const teacher = getTeacherBySlug(slug);

  if (!teacher) {
    return buildNotFoundMetadata(`/teachers/${slug}`, "師資頁面");
  }

  const profile = getTeacherProfile(slug);
  const experienceText = profile
    ? profile.experienceHighlights.join("、")
    : teacher.experience;

  return buildPageMetadata({
    path: `/teachers/${teacher.slug}`,
    title: `${teacher.name}｜${teacher.subject}老師｜品識學苑`,
    description: `${teacher.name}老師，${experienceText}，專長${teacher.grades}${teacher.subject}${teacher.philosophy}`,
    ogImages: [`${SITE.url}${teacher.image}`],
    ogImageAlt: `${teacher.name}老師｜品識學苑`,
    titleAbsolute: true,
  });
}

export default async function TeacherProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const teacher = getTeacherBySlug(slug);
  const profile = getTeacherProfile(slug);

  if (!teacher || !profile) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildTeacherProfileJsonLd(teacher)),
        }}
      />
      <TeacherProfileClient teacher={teacher} profile={profile} />
    </>
  );
}
