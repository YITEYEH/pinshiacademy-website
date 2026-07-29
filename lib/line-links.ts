const LINE_BASE = {
  /** 主要諮詢、Navbar、聯絡頁、師資頁等 */
  consult: "https://lin.ee/8nQNuYl",
  /** 首頁底部預約檢測 */
  homeAssessment: "https://lin.ee/7j5iJiV",
  /** 關於我們 */
  about: "https://lin.ee/5cE2MLo",
  /** 課程頁底部諮詢 */
  coursesConsult: "https://lin.ee/9x27qTh",
  /** 國文、英文等科目 */
  humanities: "https://lin.ee/5itUHpZ",
  /** 數學、自然等科目 */
  stem: "https://lin.ee/rl0Wyvh",
} as const;

export type LineLinkKey = keyof typeof LINE_BASE;

/** 為 LINE 短網址加上 UTM（lin.ee 會保留 query string） */
export function withLineUtm(baseUrl: string, campaign: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set("utm_source", "website");
  url.searchParams.set("utm_medium", "cta");
  url.searchParams.set("utm_campaign", campaign);
  return url.href;
}

/** 依用途取得帶 UTM 的 LINE 連結；campaign 可覆寫預設（通常用 analyticsLabel） */
export function lineLink(key: LineLinkKey, campaign?: string): string {
  return withLineUtm(LINE_BASE[key], campaign ?? key);
}

/** 全站 LINE 官方帳號連結（依用途集中管理，已含預設 UTM） */
export const LINE_LINKS: Record<LineLinkKey, string> = {
  consult: lineLink("consult"),
  homeAssessment: lineLink("homeAssessment"),
  about: lineLink("about"),
  coursesConsult: lineLink("coursesConsult"),
  humanities: lineLink("humanities"),
  stem: lineLink("stem"),
};

/** 築夢計畫專用 CTA（共用 consult 短網址，以 UTM 區分用途） */
export const DREAM_PROJECT_LINE = {
  apply: lineLink("consult", "dream_project_apply"),
  teacher: lineLink("consult", "dream_project_teacher"),
  partner: lineLink("consult", "dream_project_partner"),
} as const;
