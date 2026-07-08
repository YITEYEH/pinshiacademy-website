import type { Teacher } from "@/content/teachers-data";
import { teachers } from "@/content/teachers-data";
import { organizationRef } from "@/lib/organization-schema";
import { SITE } from "@/lib/site";

function personNode(teacher: Teacher) {
  return {
    "@type": "Person",
    "@id": `${SITE.url}/teachers/${teacher.slug}`,
    name: teacher.name,
    jobTitle: teacher.jobTitle,
    image: `${SITE.url}${teacher.image}`,
    url: `${SITE.url}/teachers/${teacher.slug}`,
    worksFor: organizationRef(),
    knowsAbout: [...teacher.knowsAbout],
    description: teacher.philosophy,
  };
}

export function buildTeachersJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": teachers.map(personNode),
  };
}

export function buildTeacherProfileJsonLd(teacher: Teacher) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(teacher),
      {
        "@type": "ProfilePage",
        "@id": `${SITE.url}/teachers/${teacher.slug}#webpage`,
        url: `${SITE.url}/teachers/${teacher.slug}`,
        name: `${teacher.name}｜品識學苑師資介紹`,
        description: teacher.bio,
        mainEntity: { "@id": `${SITE.url}/teachers/${teacher.slug}` },
      },
    ],
  };
}
