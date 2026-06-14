import { organizationRef } from "@/lib/organization-schema";
import { SITE } from "@/lib/site";

export const COURSE_SUBJECTS = [
  {
    slug: "chinese",
    name: "國文",
    description:
      "品識學苑國文課程著重閱讀理解、寫作表達與古文素養，協助國中會考與高中學測建立穩固語文能力。",
    teaches: "國文",
    educationalLevel: "國中、高中",
  },
  {
    slug: "english",
    name: "英文",
    description:
      "品識學苑英文課程整合聽說讀寫，建立語感與文法觀念，支援會考與學測英文準備。",
    teaches: "英文",
    educationalLevel: "國中、高中",
  },
  {
    slug: "math",
    name: "數學",
    description:
      "品識學苑數學課程從觀念到解題，建立邏輯思維，協助國中會考與高中學測、分科數學提升。",
    teaches: "數學",
    educationalLevel: "國中、高中",
  },
  {
    slug: "social",
    name: "社會",
    description:
      "品識學苑社會科課程整合歷史、地理、公民，培養理解脈絡與答題能力。",
    teaches: "社會",
    educationalLevel: "國中、高中",
  },
  {
    slug: "science",
    name: "自然",
    description:
      "品識學苑自然科課程涵蓋理化、生物、地科，強調概念理解與實驗邏輯。",
    teaches: "自然",
    educationalLevel: "國中、高中",
  },
] as const;

export function buildCoursesJsonLd() {
  const courses = COURSE_SUBJECTS.map((course) => ({
    "@type": "Course",
    "@id": `${SITE.url}/courses#${course.slug}`,
    name: `品識學苑${course.name}課程`,
    description: course.description,
    provider: organizationRef(),
    teaches: course.teaches,
    educationalLevel: course.educationalLevel,
    inLanguage: "zh-TW",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "依學生需求安排",
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": courses,
  };
}
