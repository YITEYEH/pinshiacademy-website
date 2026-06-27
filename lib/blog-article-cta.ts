export type ArticleConsultCtaContent = {
  title: string;
  description: string;
  lineButtonLabel: string;
  analyticsLabel: string;
};

const DEFAULT_CTA: ArticleConsultCtaContent = {
  title: "想進一步規劃學習方向？",
  description: "品識學苑提供線上一對一與小班升學輔導，歡迎預約免費諮詢。",
  lineButtonLabel: "預約免費諮詢",
  analyticsLabel: "blog_article_line_consult",
};

/** 依 WordPress 文章分類對應 CTA；新增分類時在此擴充即可 */
const CATEGORY_CTA: Record<string, ArticleConsultCtaContent> = {
  學習方法: {
    title: "不確定自己的讀書方法是否有效？",
    description:
      "品識學苑可協助診斷學習瓶頸，規劃適合的讀書節奏與複習策略。",
    lineButtonLabel: "預約學習方法諮詢",
    analyticsLabel: "blog_article_line_consult_study_methods",
  },
  教育觀點: {
    title: "想為孩子規劃更適合的升學路徑？",
    description: "與學習顧問聊聊孩子的程度與目標，一起找到下一步方向。",
    lineButtonLabel: "預約升學規劃諮詢",
    analyticsLabel: "blog_article_line_consult_education",
  },
  親子溝通: {
    title: "孩子抗拒讀書、親子常為功課起衝突？",
    description: "我們可協助家長調整溝通方式，並搭配適合的學習支持。",
    lineButtonLabel: "跟顧問聊聊怎麼開始",
    analyticsLabel: "blog_article_line_consult_parenting",
  },
};

export function getArticleConsultCta(
  category?: string,
): ArticleConsultCtaContent {
  if (!category?.trim()) return DEFAULT_CTA;
  return CATEGORY_CTA[category.trim()] ?? DEFAULT_CTA;
}
