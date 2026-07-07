/** 全站 LINE CTA 預設文案（未指定情境時） */
export const LINE_CTA_LABEL = "加入 LINE 免費諮詢";

/** 依頁面／區塊情境區分的 CTA 文案 */
export const LINE_CTA_LABELS = {
  navbar: "LINE 免費諮詢",
  homeHero: "加入 LINE 免費諮詢",
  homeAssessment: "LINE 預約學習診斷",
  homeProcess: "LINE 開始免費諮詢",
  pricingHero: "LINE 諮詢課程費用",
  pricingCardElementary: "LINE 諮詢國小課程",
  pricingCardJuniorHigh: "LINE 諮詢國中課程",
  pricingCardSeniorHigh: "LINE 諮詢高中課程",
  pricingFinal: "LINE 取得專屬報價",
  coursesBottom: "LINE 預約課程諮詢",
  teachers: "LINE 媒合適合老師",
  about: "LINE 了解品識學苑",
  story: "LINE 聊聊學習規劃",
  faq: "LINE 預約免費諮詢",
  contact: "加入 LINE 聯繫顧問",
  studentSuccess: "LINE 規劃學習計畫",
  liveEvents: "LINE 諮詢活動報名",
  onlineCourses: "LINE 諮詢預錄課程",
  landing: "加入 LINE 免費諮詢",
} as const;

/** 課程介紹頁 — 各科目的 LINE CTA */
export function courseLineCtaLabel(subject: string): string {
  return `LINE 諮詢${subject}課程`;
}
