export type ArticleSecondaryLink = {
  href: string;
  label: string;
  analyticsLabel: string;
};

export type ArticleConsultCtaContent = {
  title: string;
  description: string;
  lineButtonLabel: string;
  analyticsLabel: string;
  secondaryLinks: readonly ArticleSecondaryLink[];
};

const DEFAULT_CTA: ArticleConsultCtaContent = {
  title: "不確定孩子適不適合一對一或小班？",
  description: "預約免費試聽，說明年級與弱科，我們協助規劃下一步",
  lineButtonLabel: "預約免費試聽",
  analyticsLabel: "blog_article_line_consult",
  secondaryLinks: [
    {
      href: "/courses",
      label: "查看課程",
      analyticsLabel: "blog_article_nav_courses",
    },
    {
      href: "/pricing",
      label: "看課程費用",
      analyticsLabel: "blog_article_nav_pricing",
    },
    {
      href: "/student-success",
      label: "看學生成果",
      analyticsLabel: "blog_article_nav_student_success",
    },
  ],
};

/** 依 WordPress 文章分類對應 CTA；新增分類時在此擴充即可 */
const CATEGORY_CTA: Record<string, ArticleConsultCtaContent> = {
  國小萬試通: {
    title: "想幫孩子打好國小基礎、建立學習節奏嗎？",
    description: "預約免費試聽，了解程度與適合的上課方式後再決定",
    lineButtonLabel: "預約免費試聽",
    analyticsLabel: "blog_article_line_consult_elementary",
    secondaryLinks: [
      {
        href: "/courses",
        label: "查看課程",
        analyticsLabel: "blog_article_nav_courses_elementary",
      },
      {
        href: "/pricing",
        label: "看課程費用",
        analyticsLabel: "blog_article_nav_pricing_elementary",
      },
      {
        href: "/student-success",
        label: "看學生成果",
        analyticsLabel: "blog_article_nav_student_success_elementary",
      },
    ],
  },
  國中好試多: {
    title: "段考或會考卡住，不知道從哪裡補強？",
    description: "預約免費試聽，先找出弱點再安排一對一或小班",
    lineButtonLabel: "預約免費試聽",
    analyticsLabel: "blog_article_line_consult_junior_high",
    secondaryLinks: [
      {
        href: "/courses",
        label: "查看課程",
        analyticsLabel: "blog_article_nav_courses_junior",
      },
      {
        href: "/pricing",
        label: "看課程費用",
        analyticsLabel: "blog_article_nav_pricing_junior",
      },
      {
        href: "/student-success",
        label: "看學生成果",
        analyticsLabel: "blog_article_nav_student_success_junior",
      },
    ],
  },
  學習技巧: {
    title: "想確認現在的讀書方法有沒有效？",
    description: "預約免費試聽，一起檢視節奏、錯題與複習方式",
    lineButtonLabel: "預約免費試聽",
    analyticsLabel: "blog_article_line_consult_study_skills",
    secondaryLinks: [
      {
        href: "/student-success",
        label: "看學生成果",
        analyticsLabel: "blog_article_nav_student_success_skills",
      },
      {
        href: "/courses",
        label: "查看課程",
        analyticsLabel: "blog_article_nav_courses_skills",
      },
    ],
  },
  高中芝士補給站: {
    title: "學測、課業壓力大，想提早把方向抓穩？",
    description: "預約免費試聽，依年級與目標規劃適合的輔導方式",
    lineButtonLabel: "預約免費試聽",
    analyticsLabel: "blog_article_line_consult_senior_high",
    secondaryLinks: [
      {
        href: "/courses",
        label: "查看課程",
        analyticsLabel: "blog_article_nav_courses_senior",
      },
      {
        href: "/pricing",
        label: "看課程費用",
        analyticsLabel: "blog_article_nav_pricing_senior",
      },
      {
        href: "/student-success",
        label: "看學生成果",
        analyticsLabel: "blog_article_nav_student_success_senior",
      },
    ],
  },
  /** 親子教育：偏家長意圖，CTA 溫和、不硬推報名 */
  親子教育: {
    title: "想先搞清楚孩子卡在哪裡，再決定要不要補習？",
    description: "預約免費試聽，先了解狀況與適合的學習方向",
    lineButtonLabel: "預約免費試聽",
    analyticsLabel: "blog_article_line_consult_parenting",
    secondaryLinks: [
      {
        href: "/student-success",
        label: "看學生成果",
        analyticsLabel: "blog_article_nav_student_success_parenting",
      },
      {
        href: "/teachers",
        label: "認識老師",
        analyticsLabel: "blog_article_nav_teachers_parenting",
      },
    ],
  },
};

export type ArticleTrustLink = {
  href: string;
  label: string;
  description: string;
  analyticsLabel: string;
};

export function getArticleConsultCta(
  category?: string,
): ArticleConsultCtaContent {
  if (!category?.trim()) return DEFAULT_CTA;
  return CATEGORY_CTA[category.trim()] ?? DEFAULT_CTA;
}

/** 文章頁信任／師資捷徑（依分類） */
export function getArticleTrustLinks(
  category?: string,
): readonly ArticleTrustLink[] {
  const key = category?.trim() ?? "";

  if (key === "國小萬試通") {
    return [
      {
        href: "/teachers",
        label: "認識師資團隊",
        description: "先了解教學風格，再決定是否預約免費試聽",
        analyticsLabel: "blog_article_trust_teachers_elementary",
      },
      {
        href: "/student-success",
        label: "看學生成果",
        description: "了解其他家庭如何一步步找回學習信心",
        analyticsLabel: "blog_article_trust_student_success",
      },
    ];
  }

  if (key === "國中好試多") {
    return [
      {
        href: "/teachers/yeh-yide",
        label: "認識葉以德老師",
        description: "國中、高中數學，重視理解與解題思維",
        analyticsLabel: "blog_article_trust_teacher_yeh_yide",
      },
      {
        href: "/student-success",
        label: "看學生成果",
        description: "從害怕到聽得懂、考得穩的真實歷程",
        analyticsLabel: "blog_article_trust_student_success",
      },
    ];
  }

  if (key === "高中芝士補給站") {
    return [
      {
        href: "/teachers",
        label: "認識高中師資",
        description: "依科目與目標，找到適合的線上輔導老師",
        analyticsLabel: "blog_article_trust_teachers",
      },
      {
        href: "/student-success",
        label: "看學生成果",
        description: "看看其他學生如何穩定進步",
        analyticsLabel: "blog_article_trust_student_success_senior",
      },
    ];
  }

  return [
    {
      href: "/teachers",
      label: "認識師資團隊",
      description: "先了解教學風格，再決定是否預約免費試聽",
      analyticsLabel: "blog_article_trust_teachers",
    },
    {
      href: "/student-success",
      label: "看學生成果",
      description: "看看其他學生如何穩定進步",
      analyticsLabel: "blog_article_trust_student_success",
    },
  ];
}

export function categorySupportsLiveBridge(category?: string): boolean {
  const key = category?.trim() ?? "";
  return (
    key === "國中好試多" ||
    key === "高中芝士補給站" ||
    key === "學習技巧" ||
    key === "國小萬試通"
  );
}
