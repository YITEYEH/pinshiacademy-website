/** 全站 LINE CTA 預設文案（未指定情境時） */
export const LINE_CTA_LABEL = "預約學習評估";

/** 依頁面／區塊情境區分的 CTA 文案（補教語境：評估、規劃、了解課程） */
export const LINE_CTA_LABELS = {
  navbar: "立即學習評估",
  homeHero: "預約學習評估",
  homeAssessment: "預約學習診斷",
  homeProcess: "預約學習規劃",
  pricingHero: "了解課程方案",
  pricingCardElementary: "了解國小課程",
  pricingCardJuniorHigh: "了解國中課程",
  pricingCardSeniorHigh: "了解高中課程",
  pricingFinal: "預約學習規劃",
  coursesBottom: "預約課程規劃",
  teachers: "預約媒合師資",
  about: "了解學習方式",
  story: "預約學習規劃",
  faq: "預約學習評估",
  contact: "預約學習評估",
  studentSuccess: "預約學習規劃",
  liveEvents: "了解活動與課程",
  onlineCourses: "預約課程規劃",
  teacherProfileHero: "預約學習評估",
  teacherProfileFooter: "預約學習評估",
  landing: "預約學習評估",
  dreamApply: "申請築夢計畫",
  dreamTeacher: "成為築夢教師",
  dreamPartner: "洽談合作",
} as const;

/** 課程介紹頁 — 各科目的 LINE CTA */
export function courseLineCtaLabel(subject: string): string {
  return `了解${subject}課程`;
}
