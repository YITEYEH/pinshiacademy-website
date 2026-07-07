import { LINE_CTA_LABELS } from "@/lib/line-cta";

export type PricingRow = {
  subject: string;
  amount: number;
};

export type PricingCardTier = {
  id: "elementary" | "junior-high" | "senior-high";
  title: string;
  startingAmount: number;
  sessionLabel: string;
  rows: readonly PricingRow[];
  ctaLineKey: "homeAssessment" | "coursesConsult";
  ctaLabel: string;
  analyticsLabel: string;
  featured?: boolean;
};

export const pricingHero = {
  title: "課程費用",
  subtitle: "找到適合孩子的學習方式，比找到最便宜的課程更重要",
  description:
    "國小、國中、高中一對一線上課程，依學生程度與目標量身規劃，費用透明公開",
  ctaNote: "透過 LINE 預約，首次諮詢免費",
} as const;

export const pricingCardsSection = {
  title: "一對一課程費用",
  subtitle: [
    "依年級與科目安排不同課程規劃",
    "以下為每堂 50 分鐘的參考費用，實際報價依學生需求調整",
  ],
} as const;

export const pricingCardTiers: readonly PricingCardTier[] = [
  {
    id: "elementary",
    title: "國小課程",
    startingAmount: 500,
    sessionLabel: "50 分鐘／堂",
    ctaLineKey: "homeAssessment",
    ctaLabel: LINE_CTA_LABELS.pricingCardElementary,
    analyticsLabel: "pricing_card_elementary",
    rows: [
      { subject: "國語", amount: 500 },
      { subject: "英文", amount: 600 },
      { subject: "數學", amount: 700 },
      { subject: "自然", amount: 700 },
      { subject: "社會", amount: 500 },
    ],
  },
  {
    id: "junior-high",
    title: "國中課程",
    startingAmount: 700,
    sessionLabel: "50 分鐘／堂",
    ctaLineKey: "homeAssessment",
    ctaLabel: LINE_CTA_LABELS.pricingCardJuniorHigh,
    analyticsLabel: "pricing_card_junior_high",
    rows: [
      { subject: "國文", amount: 700 },
      { subject: "英文", amount: 800 },
      { subject: "數學", amount: 1000 },
      { subject: "歷史", amount: 700 },
      { subject: "地理", amount: 700 },
      { subject: "公民", amount: 700 },
      { subject: "生物", amount: 800 },
      { subject: "理化", amount: 1000 },
      { subject: "地球科學", amount: 800 },
    ],
  },
  {
    id: "senior-high",
    title: "高中課程",
    startingAmount: 900,
    sessionLabel: "50 分鐘／堂",
    ctaLineKey: "homeAssessment",
    ctaLabel: LINE_CTA_LABELS.pricingCardSeniorHigh,
    analyticsLabel: "pricing_card_senior_high",
    featured: true,
    rows: [
      { subject: "國文", amount: 900 },
      { subject: "英文", amount: 1000 },
      { subject: "數學", amount: 1200 },
      { subject: "歷史", amount: 900 },
      { subject: "地理", amount: 900 },
      { subject: "公民", amount: 900 },
      { subject: "生物", amount: 1000 },
      { subject: "化學", amount: 1200 },
      { subject: "物理", amount: 1400 },
      { subject: "地球科學", amount: 1000 },
    ],
  },
];

export const pricingIncludedSection = {
  title: "課程內容包含",
  subtitle:
    "每一堂課，不只是 50 分鐘的授課，更是一套完整的學習支持，幫助學生建立理解、培養習慣，穩定提升學習成效",
  items: [
    {
      title: "一對一專業授課",
      description: "依學生程度調整教學節奏，打造最適合的學習方式",
      icon: "video",
    },
    {
      title: "客製化教材",
      description: "根據學習需求安排教材與課程內容，提升學習效率",
      icon: "book",
    },
    {
      title: "課後作業與回饋",
      description: "透過作業練習與講解，持續鞏固課堂所學",
      icon: "clipboard",
    },
    {
      title: "學習弱點分析",
      description: "找出真正需要加強的觀念，避免盲目刷題",
      icon: "search",
    },
    {
      title: "學習規劃建議",
      description: "協助安排讀書方向，建立更有效率的學習節奏",
      icon: "map",
    },
    {
      title: "LINE 課業協助",
      description: "課後遇到問題，也能即時獲得老師協助",
      icon: "message",
    },
    {
      title: "考試準備規劃",
      description: "依段考、會考、學測等不同目標安排學習策略",
      icon: "graduation",
    },
    {
      title: "學習成效追蹤",
      description: "定期檢視學習進度，陪伴學生穩定成長",
      icon: "chart",
    },
  ] as const,
} as const;

export const pricingExplanationSection = {
  title: "如何計算課程費用？",
  body: "每位學生的學習需求、目標與程度都不同，因此品識學苑不採固定制式課程，而是依照學生的實際需求規劃最適合的學習方案",
  factorsTitle: "課程方案將依以下因素規劃",
  factors: [
    { label: "學習階段" },
    { label: "授課科目" },
    { label: "學習程度" },
    { label: "授課老師" },
    { label: "上課頻率與堂數" },
    { label: "班型（一對一／小班）" },
  ] as const,
  footnote:
    "課程費用將依學生的學習階段、授課科目、目前程度、授課老師、班型及堂數方案等因素綜合評估。正式報名前，我們會完整說明課程內容與費用，讓家長清楚了解每一項安排，安心選擇適合的課程",
} as const;

export const pricingTrustSection = {
  title: "品識學苑的承諾",
  items: [
    {
      title: "收費公開透明",
      description:
        "每堂課程的費用、方案內容與服務項目皆會於報名前完整說明，讓家長安心了解每一筆支出。",
    },
    {
      title: "彈性課程方案",
      description:
        "提供多元課程與堂數選擇，可依學生的學習進度與需求調整，陪伴每個階段穩定成長。",
    },
    {
      title: "客製化學習規劃",
      description:
        "依照學生的程度、學習目標與需求，規劃最適合的課程內容與學習安排，而非套用固定方案。",
    },
    {
      title: "專業師資媒合",
      description:
        "根據學生的年級、科目、個性與學習需求安排合適的授課老師，讓每一堂課都更有效率。",
    },
  ] as const,
} as const;

export const pricingFaqSection = {
  title: "常見問題",
  items: [
    {
      question: "可以只報名一堂課嗎？",
      answer:
        "可以。品識學苑提供單堂預約，您也可以先預約免費學習諮詢，了解孩子的學習狀況與需求，再選擇最適合的課程方案",
    },
    {
      question: "有堂數優惠嗎？",
      answer:
        "有，多堂課程方案會比單堂預約享有更優惠的平均單堂費用。如果已有明確的學習目標，例如段考、會考或學測，我們也會協助規劃更適合的課程安排",
    },
    {
      question: "有提供免費學習諮詢嗎？",
      answer:
        "有。首次提供免費學習諮詢，協助了解學生目前的學習狀況、分析學習需求，並提供適合的課程規劃建議，讓家長在報名前能更安心做出選擇",
    },
    {
      question: "如何安排授課老師？",
      answer:
        "我們相信，適合的老師比任何教材都重要。課程開始前，我們會了解學生的學習需求、目標與程度，並依照老師的專業領域與教學風格進行媒合，讓每位學生都能找到最適合自己的學習夥伴，若課程進行後發現不適合，也會協助調整授課老師，讓學生能持續獲得最適合的學習支持",
    },
    {
      question: "小班課程價格也一樣嗎？",
      answer:
        "小班課程採不同的收費方式，會依班級人數、課程規劃及堂數安排有所調整。實際方案與費用將依課程內容提供完整說明",
    },
    {
      question: "報名後可以申請退費嗎？",
      answerPrefix: "可以。品識學苑提供公開透明的退費制度，相關規定皆依",
      answerSuffix: "辦理，並會於報名前完整說明，讓家長安心了解自身權益",
      refundLink: true,
    },
  ] as const,
} as const;

export const pricingFinalCta = {
  title: "不知道孩子適合哪一種課程？",
  subtitle:
    "先從免費學習諮詢開始，了解目前程度、找出學習弱點，並取得專屬課程建議。",
} as const;
