import {
  TEACHIFY_COURSES,
  type TeachifyCourse,
} from "@/content/teachify-courses";
import { fetchTeachifyCourseCover } from "@/lib/teachify-course-cover";

export type OnlineCourseView = TeachifyCourse & {
  coverImageUrl?: string;
};

export async function getOnlineCourses(): Promise<OnlineCourseView[]> {
  return Promise.all(
    TEACHIFY_COURSES.map(async (course) => {
      const coverImageUrl =
        course.coverImageUrl ??
        (await fetchTeachifyCourseCover(course.purchaseUrl));
      return { ...course, coverImageUrl };
    }),
  );
}
