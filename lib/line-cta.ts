/** 全站 LINE CTA 預設文案（未指定情境時） */
export const LINE_CTA_LABEL = "預約免費學習評估";

/** 依頁面／區塊情境區分的 CTA 文案 */
export const LINE_CTA_LABELS = {
  navbar: "免費學習評估",
  homeHero: "預約免費學習評估",
  homeAssessment: "預約免費學習評估",
  homeProcess: "預約免費學習評估",
  pricingHero: "了解課程方案",
  pricingCardElementary: "了解國小課程",
  pricingCardJuniorHigh: "了解國中課程",
  pricingCardSeniorHigh: "了解高中課程",
  pricingFinal: "預約免費學習評估",
  coursesBottom: "預約免費學習評估",
  teachers: "預約媒合師資",
  about: "了解學習方式",
  story: "預約免費學習評估",
  faq: "預約免費學習評估",
  contact: "預約免費學習評估",
  studentSuccess: "預約免費學習評估",
  liveEvents: "了解活動與課程",
  onlineCourses: "預約免費學習評估",
  teacherProfileHero: "預約免費學習評估",
  teacherProfileFooter: "預約免費學習評估",
  landing: "預約免費學習評估",
  dreamApply: "申請築夢計畫",
  dreamTeacher: "成為築夢教師",
  dreamPartner: "洽談合作",
} as const;

/** 課程介紹頁 — 各科目的 LINE CTA */
export function courseLineCtaLabel(subject: string): string {
  return `了解${subject}課程`;
}
