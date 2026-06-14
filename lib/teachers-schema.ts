import { teachers } from "@/content/teachers-data";
import { organizationRef } from "@/lib/organization-schema";
import { SITE } from "@/lib/site";

export function buildTeachersJsonLd() {
  const people = teachers.map((teacher) => ({
    "@type": "Person",
    "@id": `${SITE.url}/teachers#${encodeURIComponent(teacher.name)}`,
    name: teacher.name,
    jobTitle: teacher.jobTitle,
    image: `${SITE.url}${teacher.image}`,
    worksFor: organizationRef(),
    knowsAbout: [...teacher.knowsAbout],
    description: teacher.philosophy,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": people,
  };
}
