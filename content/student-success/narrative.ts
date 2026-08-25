/**
 * 學生成果頁敘事文案（給家長讀的版本）
 */

export type OutcomeSignal = {
  id: string;
  label: string;
  detail: string;
};

export const outcomeSignals: OutcomeSignal[] = [
  {
    id: "ask",
    label: "敢說「我卡在這裡」",
    detail: "不再整題放棄，能指出自己哪一步不懂",
  },
  {
    id: "read",
    label: "願意把長題讀完",
    detail: "先看懂條件，再動手——而不是直接跳過",
  },
  {
    id: "why",
    label: "能說出為什麼這樣算",
    detail: "不是背公式，而是真的理解",
  },
  {
    id: "try",
    label: "先試一次，再求助",
    detail: "答錯變成線索，而不是打擊",
  },
  {
    id: "own",
    label: "主動想多練一點",
    detail: "從「被要求寫」變成「自己想寫」",
  },
];

export type HonestStat = {
  id: string;
  value: string;
  label: string;
};

export const honestStats: HonestStat[] = [
  {
    id: "a-plus-plus",
    value: "2",
    label: "會考數學拿到 A++",
  },
  {
    id: "levels",
    value: "4",
    label: "會考數學達 A++、B++ 或 B+",
  },
  {
    id: "track",
    value: "每堂",
    label: "課後都會告訴你學到哪、下一步怎麼走",
  },
];

export type ShiftMoment = {
  id: string;
  from: string;
  to: string;
  context: string;
};

export const shiftMoments: ShiftMoment[] = [
  {
    id: "m1",
    from: "覺得數學沒意思，不知道為什麼要學",
    to: "會問：老師，今天要出什麼題？",
    context: "國中數學",
  },
  {
    id: "m2",
    from: "公式背了就忘，題型一變就停筆",
    to: "能試著說出：這題為什麼這樣想",
    context: "高中數學",
  },
  {
    id: "m3",
    from: "看到字多的題，先跳過再說",
    to: "願意慢慢讀完，再決定怎麼解",
    context: "高中數學",
  },
  {
    id: "m4",
    from: "幾乎不敢碰統測數學",
    to: "主動跟老師要考卷，還能教同學",
    context: "高職統測",
  },
];

export type ProcessEvidence = {
  id: string;
  title: string;
  description: string;
  fields: string[];
};

export const processEvidence: ProcessEvidence[] = [
  {
    id: "observe",
    title: "上課怎麼看",
    description: "我們不只看對不對，更看孩子怎麼面對「不會」",
    fields: [
      "卡在哪一個觀念",
      "能不能用自己的話說",
      "讀題時會不會慌",
      "今天的節奏適不適合",
    ],
  },
  {
    id: "feedback",
    title: "下課你會知道",
    description: "每次課後，家長都能掌握進度，不用等到段考才緊張",
    fields: [
      "這堂教了什麼",
      "吸收得好不好",
      "哪裡還要補強",
      "下一堂怎麼安排",
    ],
  },
  {
    id: "errors",
    title: "錯題怎麼用",
    description: "同樣是錯，原因不同，練法就不同",
    fields: [
      "是粗心、沒讀懂，還是觀念缺口",
      "對應要練什麼",
      "類似題能不能自己處理",
    ],
  },
];

export const privacyFootnote =
  "為保護隱私，故事中不公開學生姓名與學校每位孩子的起點與進度不同，成長步調也會不一樣";
