import type { TeachifyCourse } from "@/content/teachify-courses";
import { fetchTeachifyCourses } from "@/lib/fetch-teachify-courses";
import { fetchTeachifyCourseCover } from "@/lib/teachify-course-cover";

export type OnlineCourseView = TeachifyCourse & {
  coverImageUrl?: string;
};

export async function getOnlineCourses(): Promise<OnlineCourseView[]> {
  const courses = await fetchTeachifyCourses();

  return Promise.all(
    courses.map(async (course) => {
      const coverImageUrl =
        course.coverImageUrl ??
        (await fetchTeachifyCourseCover(course.purchaseUrl));
      return { ...course, coverImageUrl };
    }),
  );
}
