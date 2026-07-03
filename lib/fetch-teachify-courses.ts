import "server-only";

import {
  TEACHIFY_COURSE_CATEGORY_SLUGS,
  TEACHIFY_COURSE_OVERRIDES,
  TEACHIFY_PLATFORM_URL,
  type TeachifyCourse,
  type TeachifyCourseOverride,
} from "@/content/teachify-courses";
import {
  fetchTeachifyHtml,
  getCourseRefsFromCategoryPage,
  parseTeachifyNextData,
  resolveApolloRef,
  type TeachifyApolloState,
} from "@/lib/teachify-next-data";

type ApolloRef = { __ref: string };

type ApolloCourseSummary = {
  __typename: "Course";
  slug: string;
  invisible?: boolean;
};

type ApolloCourse = {
  __typename: "Course";
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  seoDescription?: string;
  description?: string;
  image?: string;
  invisible?: boolean;
  featured?: boolean;
  courseType?: string;
  tags?: string[];
  totalHours?: number;
  categories?: ApolloRef[];
  lecturers?: ApolloRef[];
  plans?: ApolloRef[];
  courseFeatures?: ApolloRef;
};

type ApolloCategory = {
  __typename: "Category";
  name: string;
};

type ApolloLecturer = {
  __typename: "Lecturer";
  name: string;
  headline?: string;
};

type ApolloCurriculumPlan = {
  __typename: "CurriculumPlan";
  amount: number;
  compareAtPrice?: number | null;
};

type ApolloCourseFeatures = {
  __typename: "CourseFeatures";
  lecturesCount?: number;
  videoTotalHours?: number;
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function displayName(name: string): string {
  return name.replace(/（[^）]*）/g, "").trim();
}

function formatVideoHours(hours: number | undefined): string {
  if (hours === undefined || Number.isNaN(hours)) return "—";
  const rounded = Math.round(hours * 10) / 10;
  return `${rounded} 小時`;
}

function inferBadge(title: string, tags: string[]): string | undefined {
  if (tags[0]) return tags[0];
  if (title.includes("會考")) return "會考數學";
  if (title.includes("學測")) return "學測";
  return undefined;
}

function inferDescription(title: string, seoDescription?: string): string {
  if (seoDescription) return seoDescription;
  if (title.includes("會考")) {
    return "精選歷屆試題解析，掌握會考出題邏輯與解題策略，可重複觀看複習。";
  }
  return "品識學苑線上預錄課程，依自己的步調學習、反覆複習。";
}

function resolveCategory(
  state: TeachifyApolloState,
  refs: ApolloRef[] | undefined,
): string | undefined {
  const category = refs
    ?.map((ref) => resolveApolloRef<ApolloCategory>(state, ref))
    .find(Boolean);
  return category?.name;
}

function resolveLecturers(
  state: TeachifyApolloState,
  refs: ApolloRef[] | undefined,
): { name: string; role: string }[] {
  if (!refs) return [];

  return refs
    .map((ref) => resolveApolloRef<ApolloLecturer>(state, ref))
    .filter((lecturer): lecturer is ApolloLecturer => lecturer !== null)
    .map((lecturer) => ({
      name: displayName(lecturer.name),
      role: lecturer.headline ?? "",
    }));
}

function resolvePricing(
  state: TeachifyApolloState,
  refs: ApolloRef[] | undefined,
): { priceFrom: number; priceOriginal?: number } {
  const plans = (refs ?? [])
    .map((ref) => resolveApolloRef<ApolloCurriculumPlan>(state, ref))
    .filter((plan): plan is ApolloCurriculumPlan => plan !== null)
    .filter((plan) => plan.amount > 0);

  if (plans.length === 0) return { priceFrom: 0 };

  const cheapest = plans.reduce((min, plan) =>
    plan.amount < min.amount ? plan : min,
  );

  return {
    priceFrom: cheapest.amount,
    priceOriginal:
      cheapest.compareAtPrice && cheapest.compareAtPrice > cheapest.amount
        ? cheapest.compareAtPrice
        : undefined,
  };
}

function resolveCourseFeatures(
  state: TeachifyApolloState,
  ref: ApolloRef | undefined,
  totalHours?: number,
): { lectureCount: number; videoHours: string } {
  const features = ref
    ? resolveApolloRef<ApolloCourseFeatures>(state, ref)
    : null;

  return {
    lectureCount: features?.lecturesCount ?? 0,
    videoHours: formatVideoHours(features?.videoTotalHours ?? totalHours),
  };
}

function applyOverride(
  course: TeachifyCourse,
  override?: TeachifyCourseOverride,
): TeachifyCourse {
  if (!override) return course;

  return {
    ...course,
    ...override,
    instructors: override.instructors ?? course.instructors,
    tags: override.tags ?? course.tags,
  };
}

function mapApolloCourse(
  course: ApolloCourse,
  state: TeachifyApolloState,
): TeachifyCourse | null {
  if (course.invisible) return null;

  const { priceFrom, priceOriginal } = resolvePricing(state, course.plans);
  const { lectureCount, videoHours } = resolveCourseFeatures(
    state,
    course.courseFeatures,
    course.totalHours,
  );
  const instructors = resolveLecturers(state, course.lecturers);
  const tags = course.tags ?? [];
  const plainDescription = stripHtml(course.description ?? "");

  const base: TeachifyCourse = {
    id: course.slug,
    title: course.name,
    subtitle:
      course.subtitle ??
      course.seoDescription ??
      inferDescription(course.name),
    description:
      plainDescription ||
      course.seoDescription ||
      inferDescription(course.name, course.seoDescription),
    purchaseUrl: `${TEACHIFY_PLATFORM_URL}/courses/${course.slug}`,
    coverImageUrl: course.image,
    category: resolveCategory(state, course.categories) ?? "線上課程",
    tags,
    lectureCount,
    videoHours,
    instructors,
    priceFrom,
    priceOriginal,
    featured: course.featured ?? false,
    badge: inferBadge(course.name, tags),
  };

  return applyOverride(base, TEACHIFY_COURSE_OVERRIDES[course.slug]);
}

async function fetchCourseDetail(slug: string): Promise<{
  course: ApolloCourse | null;
  state: TeachifyApolloState | null;
}> {
  const html = await fetchTeachifyHtml(
    `${TEACHIFY_PLATFORM_URL}/courses/${slug}`,
  );
  if (!html) return { course: null, state: null };

  const state = parseTeachifyNextData(html);
  if (!state) return { course: null, state: null };

  const entry = Object.entries(state).find(
    ([key, value]) => key.startsWith("Course:") && value.slug === slug,
  );

  return {
    course: (entry?.[1] as ApolloCourse | undefined) ?? null,
    state,
  };
}

async function discoverCourseSlugs(): Promise<string[]> {
  const slugSets = await Promise.all(
    TEACHIFY_COURSE_CATEGORY_SLUGS.map(async (categorySlug) => {
      const html = await fetchTeachifyHtml(
        `${TEACHIFY_PLATFORM_URL}/categories/${categorySlug}`,
      );
      if (!html) return [] as string[];

      const state = parseTeachifyNextData(html);
      if (!state) return [];

      return getCourseRefsFromCategoryPage(state)
        .map((ref) => resolveApolloRef<ApolloCourseSummary>(state, ref)?.slug)
        .filter((slug): slug is string => Boolean(slug));
    }),
  );

  return [...new Set(slugSets.flat())];
}

/** 從 Teachify 課程分類頁自動抓取線上預錄課程 */
export async function fetchTeachifyCourses(): Promise<TeachifyCourse[]> {
  const slugs = await discoverCourseSlugs();
  if (slugs.length === 0) return [];

  const courses = await Promise.all(
    slugs.map(async (slug) => {
      const { course, state } = await fetchCourseDetail(slug);
      if (!course || !state) return null;
      return mapApolloCourse(course, state);
    }),
  );

  return courses
    .filter((course): course is TeachifyCourse => course !== null)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.title.localeCompare(b.title, "zh-Hant");
    });
}
