/** 品識學苑 Teachify 開課平台（購買與上課在此進行） */
export const TEACHIFY_PLATFORM_URL = "https://pinshiacademy.tw";

export type TeachifyCourse = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** 完整課程購買頁 URL */
  purchaseUrl: string;
  /** 可手動指定；未填則由伺服器從 Teachify 抓取 */
  coverImageUrl?: string;
  category: string;
  tags: string[];
  lectureCount: number;
  videoHours: string;
  instructors: { name: string; role: string }[];
  /** 方案最低價（新台幣） */
  priceFrom: number;
  priceOriginal?: number;
  featured?: boolean;
  badge?: string;
};

/** 依 Teachify slug 覆寫自動抓取的欄位（選用） */
export type TeachifyCourseOverride = Partial<
  Pick<
    TeachifyCourse,
    | "subtitle"
    | "description"
    | "coverImageUrl"
    | "category"
    | "tags"
    | "instructors"
    | "badge"
    | "featured"
  >
>;

/** Teachify 導覽列課程分類，用於掃描所有上架課程 */
export const TEACHIFY_COURSE_CATEGORY_SLUGS = [
  "junior-high-school-progress-class",
  "junior-high-school-entrance-examination-review-class",
  "high-school-progress-class",
  "high-school-academic-assessment-review-class",
  "high-school-subject-review-class",
] as const;

/**
 * 選用：針對特定課程微調文案。未列出的課程會完全依 Teachify 自動同步。
 */
export const TEACHIFY_COURSE_OVERRIDES: Record<string, TeachifyCourseOverride> =
  {
    "114-mathematics-in-the-junior-high-school-education-examination": {
      description:
        "13 堂精選解析，從選擇題到非選題，帶你讀懂會考數學出題邏輯。含補充講義，可重複觀看，另有陪跑與衝刺方案可於購課頁選擇。",
      instructors: [
        { name: "葉以德", role: "品識學苑創辦人／資深數學授課師" },
        { name: "葉學貞", role: "教學設計師（數學組）" },
      ],
      tags: ["會考總複習", "114會考總複習", "數學"],
      badge: "會考數學",
    },
  };

export function teachifyPurchaseUrl(
  courseUrl: string,
  campaign = "online_courses",
): string {
  const url = new URL(courseUrl);
  url.searchParams.set("utm_source", "pinshiacademy");
  url.searchParams.set("utm_medium", campaign);
  return url.toString();
}

export function teachifyPlatformUrl(campaign = "online_courses"): string {
  const url = new URL(TEACHIFY_PLATFORM_URL);
  url.searchParams.set("utm_source", "pinshiacademy");
  url.searchParams.set("utm_medium", campaign);
  return url.toString();
}
