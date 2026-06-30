export type PricingRow = {
  subject: string;
  price: string;
};

export type PricingGroup = {
  subtitle?: string;
  rows: readonly PricingRow[];
};

export type PricingLevel = {
  level: string;
  sessionDuration: string;
  groups: readonly PricingGroup[];
};

export type PricingPlan = {
  name: string;
  billing: string;
  description: string;
  priceHint: string;
};

export const pricingMeta = {
  title: "課程費用參考",
  intro:
    "以下為品識學苑線上一對一、單堂課程之參考價格（每堂 50 分鐘）。小班制與期班方案請洽課程顧問取得報價。",
} as const;

export const pricingPlans: readonly PricingPlan[] = [
  {
    name: "一對一",
    billing: "單堂計費",
    description: "專屬教學進度，適合對症加強或衝刺的學生",
    priceHint: "見下方參考價目",
  },
  {
    name: "小班制",
    billing: "期班計費",
    description: "2–6 人互動學習，兼顧同儕激勵與老師關注",
    priceHint: "依班級人數洽詢報價",
  },
  {
    name: "期班方案",
    billing: "多堂優惠",
    description: "固定上課頻率，協助建立穩定複習節奏",
    priceHint: "依堂數享有優惠",
  },
];

export const pricingStructureDimensions = [
  {
    label: "年級",
    description: "國小、國中、高中，依科目與學習階段規劃",
  },
  {
    label: "班型",
    description: "一對一個別指導，或小班制互動課程",
  },
  {
    label: "計費方式",
    description: "單堂計費，或依期班（多堂）方案規劃",
  },
] as const;

export const pricingDisclaimer =
  "實際費用依學習規劃、優惠方案而定。" as const;

export const pricingStructureNote =
  "本頁價目表為一對一、單堂之參考價格；小班與期班方案因班級人數、堂數與優惠活動而異，歡迎預約免費學習診斷取得專屬報價。" as const;

export const pricingLevels: readonly PricingLevel[] = [
  {
    level: "國小",
    sessionDuration: "50 分鐘／堂",
    groups: [
      {
        rows: [
          { subject: "國語文", price: "NT$500－700" },
          { subject: "英語文", price: "NT$600－800" },
          { subject: "數學", price: "NT$700－1,000" },
          { subject: "自然", price: "NT$700－1,000" },
          { subject: "社會", price: "NT$500－700" },
        ],
      },
    ],
  },
  {
    level: "國中",
    sessionDuration: "50 分鐘／堂",
    groups: [
      {
        subtitle: "國文、英文、數學",
        rows: [
          { subject: "國文", price: "NT$700－1,000" },
          { subject: "英文", price: "NT$800－1,200" },
          { subject: "數學", price: "NT$1,000－1,500" },
        ],
      },
      {
        subtitle: "社會科",
        rows: [
          { subject: "歷史", price: "NT$700－1,000" },
          { subject: "地理", price: "NT$700－1,000" },
          { subject: "公民", price: "NT$700－1,000" },
        ],
      },
      {
        subtitle: "自然科",
        rows: [
          { subject: "生物", price: "NT$800－1,200" },
          { subject: "理化", price: "NT$1,000－1,500" },
          { subject: "地科", price: "NT$800－1,200" },
        ],
      },
    ],
  },
  {
    level: "高中",
    sessionDuration: "50 分鐘／堂",
    groups: [
      {
        subtitle: "國文、英文、數學",
        rows: [
          { subject: "國文", price: "NT$900－1,400" },
          { subject: "英文", price: "NT$1,000－1,600" },
          { subject: "高一數學／數A／數B／數甲／數乙", price: "NT$1,200－2,000" },
        ],
      },
      {
        subtitle: "社會科",
        rows: [
          { subject: "歷史", price: "NT$900－1,400" },
          { subject: "地理", price: "NT$900－1,400" },
          { subject: "公民", price: "NT$900－1,400" },
        ],
      },
      {
        subtitle: "自然科",
        rows: [
          { subject: "生物", price: "NT$1,000－1,600" },
          { subject: "化學", price: "NT$1,200－2,000" },
          { subject: "物理", price: "NT$1,400－2,200" },
          { subject: "地科", price: "NT$1,000－1,600" },
        ],
      },
    ],
  },
];

export const pricingIncludes = [
  "50 分鐘一對一授課",
  "課後作業檢討",
  "學習弱點分析",
  "學習方向建議",
  "LINE 課業問題回覆",
  "段考／會考／學測學習規劃",
  "免費學習診斷",
] as const;

export const pricingTrialIncludes = [
  "學習狀況分析",
  "觀念弱點診斷",
  "學習方式建議",
  "未來讀書規劃方向",
] as const;

export const pricingNotes = [
  "以上價格為參考價格，實際收費將依學生年級、課程需求、師資經歷及授課內容調整。",
  "課程皆採預約制，實際開課時間依雙方協調安排。",
  "詳細課程方案與優惠內容請洽品識學苑顧問。",
] as const;
