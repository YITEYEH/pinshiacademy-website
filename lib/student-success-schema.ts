import { successStories } from "@/content/student-success-stories";
import { SITE } from "@/lib/site";
import { organizationRef, WEBSITE_ID } from "@/lib/organization-schema";

export function buildStudentSuccessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/student-success#webpage`,
        url: `${SITE.url}/student-success`,
        name: "升學輔導成果與家長見證｜品識學苑",
        description:
          "品識學苑學生真實成長案例與家長見證，了解線上升學輔導如何發揮效果。",
        inLanguage: "zh-Hant",
        isPartOf: { "@id": WEBSITE_ID },
        about: organizationRef(),
      },
      ...successStories.map((story, index) => ({
        "@type": "Review" as const,
        "@id": `${SITE.url}/student-success#review-${index + 1}`,
        author: {
          "@type": "Person",
          name: story.name,
        },
        reviewBody: story.testimonial,
        itemReviewed: {
          "@type": "EducationalOrganization",
          name: "品識學苑",
          url: SITE.url,
        },
        about: `${story.grade}${story.subject}升學輔導`,
      })),
    ],
  };
}
