/**
 * 僅覆寫「搜尋結果」用的 title／description，不改文章 H1 與內文。
 * 原則：保留已排名關鍵詞，只讓標題更對齊搜尋意圖、描述更利於點擊；避免誇大。
 */
export type BlogSeoOverride = {
  /** 不含「｜品識學苑」後綴；generateMetadata 會再補上 */
  title: string;
  description: string;
};

/**
 * key = WordPress slug
 * 對象：高曝光、低 CTR，且現有 SERP 文案偏長或偏故事／行銷口吻
 */
export const BLOG_SEO_OVERRIDES: Record<string, BlogSeoOverride> = {
  "classical-chinese-for-high-school": {
    title: "古文15篇怎麼讀？108課綱重點整理與學測準備",
    description:
      "高中古文15篇重點、閱讀方法與學測準備建議一次整理，適合想系統複習、不想死背的學生與家長",
  },
  "the-child-doesnt-like-reading-2": {
    title: "小孩不愛讀書怎麼辦？常見原因與家長可做的調整",
    description:
      "孩子不愛讀書不一定是懶惰。整理常見原因與家長可調整的方式，從動機、方法到學習節奏，一步步找回讀書動力",
  },
  "how-to-choose-between-math-a-and-math-b": {
    title: "數A數B怎麼選？差別、適合科系與升學影響一次搞懂",
    description:
      "108課綱數A與數B差在哪？整理難度、考科差異、適合科系與選科注意事項，幫高中生與家長做決定",
  },
  "countdown-to-the-scholastic-aptitude-test": {
    title: "學測倒數30天怎麼衝？4週計畫、考古題與衝刺重點",
    description:
      "學測倒數一個月怎麼安排？4週讀書計畫、複習與考古題優先序，幫你在焦慮中穩住最後衝刺節奏",
  },
  "countdown-to-the-gsat": {
    title: "學測倒數100天怎麼準備？衝刺計畫與複習重點",
    description:
      "學測倒數100天如何分配時間？整理複習優先序、各科衝刺重點與常見踩雷，讓有限時間用在對的地方",
  },
};

export function getBlogSeoOverride(
  slug: string,
): BlogSeoOverride | undefined {
  return BLOG_SEO_OVERRIDES[slug];
}
