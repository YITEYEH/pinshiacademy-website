import "server-only";

import {
  TEACHIFY_COURSE_CATEGORY_SLUGS,
  TEACHIFY_COURSE_OVERRIDES,
  TEACHIFY_PLATFORM_URL,
  type TeachifyCourse,
  type TeachifyCourseOverride,
} from "@/content/teachify-courses";
import {
  extractFlightObjectBySlug,
  extractFlightObjectsByTypename,
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

type FlightLecturer = {
  __typename?: "Lecturer";
  name?: string;
  headline?: string;
};

type FlightCourseFeatures = {
  __typename?: "CourseFeatures";
  lecturesCount?: number;
  videoTotalHours?: number;
};

type FlightPlan = {
  __typename?: "CurriculumPlan";
  amount?: number;
  compareAtPrice?: number | null;
};

type FlightCategory = {
  __typename?: "Category";
  name?: string;
};

type FlightCourse = {
  __typename?: "Course";
  id?: string;
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
  categories?: FlightCategory[];
  lecturers?: FlightLecturer[];
  plans?: FlightPlan[];
  courseFeatures?: FlightCourseFeatures;
};

type ApolloCourse = FlightCourse & {
  categories?: ApolloRef[];
  lecturers?: ApolloRef[];
  plans?: ApolloRef[];
  courseFeatures?: ApolloRef;
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
  if (title.includes("英文")) return "高中英文";
  return undefined;
}

function inferDescription(title: string, seoDescription?: string): string {
  if (seoDescription) return seoDescription;
  if (title.includes("會考")) {
    return "精選歷屆試題解析，掌握會考出題邏輯與解題策略，可重複觀看複習";
  }
  return "品識學苑線上預錄課程，依自己的步調學習、反覆複習";
}

function resolveCategoryFromApollo(
  state: TeachifyApolloState,
  refs: ApolloRef[] | undefined,
): string | undefined {
  const category = refs
    ?.map((ref) => resolveApolloRef<{ __typename: "Category"; name: string }>(state, ref))
    .find(Boolean);
  return category?.name;
}

function resolveLecturersFromApollo(
  state: TeachifyApolloState,
  refs: ApolloRef[] | undefined,
): { name: string; role: string }[] {
  if (!refs) return [];

  return refs
    .map((ref) =>
      resolveApolloRef<{ __typename: "Lecturer"; name: string; headline?: string }>(
        state,
        ref,
      ),
    )
    .filter(
      (lecturer): lecturer is { __typename: "Lecturer"; name: string; headline?: string } =>
        lecturer !== null,
    )
    .map((lecturer) => ({
      name: displayName(lecturer.name),
      role: lecturer.headline ?? "",
    }));
}

function resolvePricingFromApollo(
  state: TeachifyApolloState,
  refs: ApolloRef[] | undefined,
): { priceFrom: number; priceOriginal?: number } {
  const plans = (refs ?? [])
    .map((ref) =>
      resolveApolloRef<{ __typename: "CurriculumPlan"; amount: number; compareAtPrice?: number | null }>(
        state,
        ref,
      ),
    )
    .filter(
      (
        plan,
      ): plan is {
        __typename: "CurriculumPlan";
        amount: number;
        compareAtPrice?: number | null;
      } => plan !== null,
    )
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

function resolveCourseFeaturesFromApollo(
  state: TeachifyApolloState,
  ref: ApolloRef | undefined,
  totalHours?: number,
): { lectureCount: number; videoHours: string } {
  const features = ref
    ? resolveApolloRef<{
        __typename: "CourseFeatures";
        lecturesCount?: number;
        videoTotalHours?: number;
      }>(state, ref)
    : null;

  return {
    lectureCount: features?.lecturesCount ?? 0,
    videoHours: formatVideoHours(features?.videoTotalHours ?? totalHours),
  };
}

function resolvePricingFromFlight(
  plans: FlightPlan[] | undefined,
): { priceFrom: number; priceOriginal?: number } {
  const priced = (plans ?? []).filter(
    (plan) => typeof plan.amount === "number" && plan.amount > 0,
  );
  if (priced.length === 0) {
    return { priceFrom: 0 };
  }

  const cheapest = priced.reduce((min, plan) =>
    (plan.amount ?? 0) < (min.amount ?? 0) ? plan : min,
  );

  return {
    priceFrom: cheapest.amount ?? 0,
    priceOriginal:
      cheapest.compareAtPrice &&
      cheapest.compareAtPrice > (cheapest.amount ?? 0)
        ? cheapest.compareAtPrice
        : undefined,
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

function mapFlightCourse(course: FlightCourse): TeachifyCourse | null {
  if (course.invisible) return null;
  if (!course.slug || !course.name) return null;

  const { priceFrom, priceOriginal } = resolvePricingFromFlight(course.plans);
  const features = course.courseFeatures;
  const lectureCount = features?.lecturesCount ?? 0;
  const videoHours = formatVideoHours(
    features?.videoTotalHours ?? course.totalHours,
  );
  const instructors = (course.lecturers ?? [])
    .filter((lecturer) => Boolean(lecturer.name))
    .map((lecturer) => ({
      name: displayName(lecturer.name!),
      role: lecturer.headline ?? "",
    }));
  const tags = course.tags ?? [];
  const plainDescription =
    typeof course.description === "string" && course.description.startsWith("<")
      ? stripHtml(course.description)
      : typeof course.description === "string" && !course.description.startsWith("$")
        ? course.description
        : "";

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
    category: course.categories?.[0]?.name ?? "線上課程",
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

function mapApolloCourse(
  course: ApolloCourse,
  state: TeachifyApolloState,
): TeachifyCourse | null {
  if (course.invisible) return null;

  const { priceFrom, priceOriginal } = resolvePricingFromApollo(
    state,
    course.plans as ApolloRef[] | undefined,
  );
  const { lectureCount, videoHours } = resolveCourseFeaturesFromApollo(
    state,
    course.courseFeatures as ApolloRef | undefined,
    course.totalHours,
  );
  const instructors = resolveLecturersFromApollo(
    state,
    course.lecturers as ApolloRef[] | undefined,
  );
  const tags = course.tags ?? [];
  const plainDescription = stripHtml(
    typeof course.description === "string" ? course.description : "",
  );

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
    category:
      resolveCategoryFromApollo(state, course.categories as ApolloRef[] | undefined) ??
      "線上課程",
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

function extractSlugsFromHtml(html: string): string[] {
  const fromLinks = [
    ...html.matchAll(/\/courses\/([a-z0-9][a-z0-9-]{2,})/gi),
  ].map((match) => match[1]);

  const fromFlight = extractFlightObjectsByTypename<FlightCourse>(
    html,
    "Course",
  )
    .map((course) => course.slug)
    .filter(Boolean);

  return [...fromLinks, ...fromFlight];
}

async function discoverCourseSlugs(): Promise<string[]> {
  const sources = [
    `${TEACHIFY_PLATFORM_URL}/courses`,
    ...TEACHIFY_COURSE_CATEGORY_SLUGS.map(
      (categorySlug) =>
        `${TEACHIFY_PLATFORM_URL}/categories/${categorySlug}`,
    ),
  ];

  const slugSets = await Promise.all(
    sources.map(async (url) => {
      const html = await fetchTeachifyHtml(url);
      if (!html) return [] as string[];

      const fromHtml = extractSlugsFromHtml(html);

      const state = parseTeachifyNextData(html);
      const fromApollo = state
        ? getCourseRefsFromCategoryPage(state)
            .map(
              (ref) =>
                resolveApolloRef<ApolloCourseSummary>(state, ref)?.slug,
            )
            .filter((slug): slug is string => Boolean(slug))
        : [];

      return [...fromHtml, ...fromApollo];
    }),
  );

  const skip = new Set(["all", "new", "search", "categories"]);
  return [
    ...new Set(
      slugSets
        .flat()
        .map((slug) => slug.toLowerCase())
        .filter((slug) => !skip.has(slug) && !slug.includes("/")),
    ),
  ];
}

async function fetchCourseDetail(slug: string): Promise<{
  course: FlightCourse | ApolloCourse | null;
  state: TeachifyApolloState | null;
  mode: "flight" | "apollo" | null;
}> {
  const html = await fetchTeachifyHtml(
    `${TEACHIFY_PLATFORM_URL}/courses/${slug}`,
  );
  if (!html) return { course: null, state: null, mode: null };

  const flightCourse = extractFlightObjectBySlug<FlightCourse>(
    html,
    slug,
    (value) =>
      value.slug === slug &&
      (value.__typename === "Course" ||
        (typeof value.name === "string" && "invisible" in value)),
  );
  if (flightCourse) {
    return { course: flightCourse, state: null, mode: "flight" };
  }

  const state = parseTeachifyNextData(html);
  if (!state) return { course: null, state: null, mode: null };

  const entry = Object.entries(state).find(
    ([key, value]) => key.startsWith("Course:") && value.slug === slug,
  );

  return {
    course: (entry?.[1] as ApolloCourse | undefined) ?? null,
    state,
    mode: entry ? "apollo" : null,
  };
}

/** 從 Teachify 課程分類／列表頁自動抓取線上預錄課程 */
export async function fetchTeachifyCourses(): Promise<TeachifyCourse[]> {
  const slugs = await discoverCourseSlugs();
  if (slugs.length === 0) return [];

  const courses = await Promise.all(
    slugs.map(async (slug) => {
      const { course, state, mode } = await fetchCourseDetail(slug);
      if (!course) return null;
      if (mode === "flight") return mapFlightCourse(course as FlightCourse);
      if (mode === "apollo" && state) {
        return mapApolloCourse(course as ApolloCourse, state);
      }
      return null;
    }),
  );

  return courses
    .filter((course): course is TeachifyCourse => course !== null)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.title.localeCompare(b.title, "zh-Hant");
    });
}
