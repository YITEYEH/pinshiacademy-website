export type ArticleConsultCtaContent = {
  title: string;
  description: string;
  lineButtonLabel: string;
  analyticsLabel: string;
};

const DEFAULT_CTA: ArticleConsultCtaContent = {
  title: "不知道自己的學習狀況該如何改善？",
  description: "歡迎與我們聊聊，一起找到最適合的學習方向。",
  lineButtonLabel: "預約免費諮詢",
  analyticsLabel: "blog_article_line_consult",
};

/** 依 WordPress 文章分類對應 CTA；新增分類時在此擴充即可 */
const CATEGORY_CTA: Record<string, ArticleConsultCtaContent> = {
  國小萬試通: {
    title: "想幫孩子建立紮實的學習基礎嗎？",
    description: "讓老師為孩子規劃適合的學習方式。",
    lineButtonLabel: "預約國小學習諮詢",
    analyticsLabel: "blog_article_line_consult_elementary",
  },
  國中好試多: {
    title: "想提升段考與會考成績，不知道該從哪裡開始？",
    description: "讓老師協助規劃專屬學習策略。",
    lineButtonLabel: "預約會考升學諮詢",
    analyticsLabel: "blog_article_line_consult_junior_high",
  },
  學習技巧: {
    title: "想知道目前的讀書方法是否適合自己？",
    description: "透過專業分析找到更有效率的學習方式。",
    lineButtonLabel: "預約學習方法諮詢",
    analyticsLabel: "blog_article_line_consult_study_skills",
  },
  高中芝士補給站: {
    title: "面對高中課業與學測壓力，提早規劃才能穩定提升成績。",
    description: "",
    lineButtonLabel: "預約學測規劃諮詢",
    analyticsLabel: "blog_article_line_consult_senior_high",
  },
};

export function getArticleConsultCta(
  category?: string,
): ArticleConsultCtaContent {
  if (!category?.trim()) return DEFAULT_CTA;
  return CATEGORY_CTA[category.trim()] ?? DEFAULT_CTA;
}
