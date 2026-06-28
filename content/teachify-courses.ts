/** 品識學苑 Teachify 開課平台（購買與上課在此進行） */
export const TEACHIFY_PLATFORM_URL = "https://pinshiacademy.tw";

export type TeachifyCourse = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** 完整課程購買頁 URL */
  purchaseUrl: string;
  /** 可手動指定；未填則由伺服器從 Teachify 課程頁 og:image 抓取 */
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

export const TEACHIFY_COURSES: TeachifyCourse[] = [
  {
    id: "114-mathematics-in-the-junior-high-school-education-examination",
    title: "A++計畫｜114會考數學歷屆試題完全解析班",
    subtitle: "針對歷屆題型與最新素養趨勢設計，完整掌握會考高分關鍵",
    description:
      "13 堂精選解析，從選擇題到非選題，帶你讀懂會考數學出題邏輯。含補充講義，可重複觀看，另有陪跑與衝刺方案可於購課頁選擇。",
    purchaseUrl:
      "https://pinshiacademy.tw/courses/114-mathematics-in-the-junior-high-school-education-examination",
    category: "國中會考總複習",
    tags: ["會考總複習", "114會考總複習", "數學"],
    lectureCount: 13,
    videoHours: "0.6 小時",
    instructors: [
      { name: "葉以德", role: "品識學苑創辦人／資深數學授課師" },
      { name: "葉學貞", role: "教學設計師（數學組）" },
    ],
    priceFrom: 1980,
    priceOriginal: 2980,
    featured: true,
    badge: "會考數學",
  },
];

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
