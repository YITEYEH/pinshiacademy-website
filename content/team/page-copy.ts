/** 三師共學制度頁文案（/team）— 頁面內文不加句號 */

export const threeTeachersSeo = {
  title: "三師共學制度｜授課老師、解題老師、輔導老師｜品識學苑",
  description:
    "品識學苑透過授課老師、解題老師與輔導老師三師共學制度，從學科教學、學習策略到成長陪伴，持續了解學生的學習狀況，找到真正適合自己的學習方式。",
  ogTitle: "三師共學制度｜品識學苑",
  h1Line1: "三師共學制度",
  h1Line2: "一個孩子的學習，不該只交給一位老師",
} as const;

export const threeTeachersHero = {
  roles: [
    { id: "teaching", label: "授課老師", focus: "把知識教懂" },
    { id: "advisor", label: "解題老師", focus: "把策略找對" },
    { id: "guidance", label: "輔導老師", focus: "把成長陪好" },
  ],
  intro: [
    "學習從來不只是把一堂課上完",
    "在品識學苑，我們建立「三師共學制度」，從課程教學、學習策略到長期陪伴，由不同角色共同關注學生的學習歷程",
  ],
  emphasis: "有人把知識教懂，有人把策略找對，也有人把成長陪好",
} as const;

export const threeTeachersWhy = {
  title: "為什麼需要三師？",
  lead: "學習遇到的問題，從來不只有「不會」",
  paragraphs: [
    "當成績不如預期，我們很容易認為，只要再多上一點課、多做一些題目就好了；但真正影響學習成果的原因，可能完全不同",
    "有些學生是觀念沒有理解；有些學生知道內容，卻沒有適合自己的學習方法；也有些學生在一次次挫折之後，逐漸失去方向與動力",
    "不同的問題，需要不同的專業角色處理；因此，品識學苑不希望把所有責任都交給同一位老師，而是透過三師之間的分工與協作，看見學生更完整的學習狀況",
  ],
} as const;

export type ThreeTeacherRoleId = "teaching" | "advisor" | "guidance";

export type ThreeTeacherRoleCopy = {
  id: ThreeTeacherRoleId;
  number: string;
  title: string;
  subtitle: string;
  question: string;
  body: readonly string[];
  duties: readonly string[];
  highlight: string;
  /** advisor 專用流程 */
  process?: readonly string[];
};

export const threeTeacherRoles: readonly ThreeTeacherRoleCopy[] = [
  {
    id: "teaching",
    number: "01",
    title: "授課老師",
    subtitle: "把知識教懂",
    question: "「我哪裡不會？」",
    body: [
      "授課老師專注於學生的學科學習",
      "從觀念理解、題型解析到實際應用，授課老師會依照學生目前的程度與學習反應調整教學方式，找出真正沒有理解的地方",
      "我們不希望學生只是記住老師教過的解法，而是逐漸具備自己思考、拆解問題與解決問題的能力",
    ],
    duties: [
      "課程教學與觀念建立",
      "題型解析與解題能力訓練",
      "找出學科弱點與觀念盲區",
      "依學生程度調整教學方式",
      "培養獨立思考與應用能力",
    ],
    highlight: "讓「老師講過」慢慢變成「我真的會了」",
  },
  {
    id: "advisor",
    number: "02",
    title: "解題老師",
    subtitle: "把策略找對",
    question: "「我該怎麼進步？」",
    body: [
      "努力很重要，但方向不對，再多的時間也可能沒有轉換成真正的學習成果",
      "解題老師不負責重新教一次課程，而是從學生整體的學習狀況出發，協助分析目前遇到的問題，找出影響學習成效的關鍵因素，並制定適合學生的學習策略",
      "從目標設定、時間安排、複習方式到實際執行情況，透過持續追蹤與調整，讓學生逐漸找到真正適合自己的學習方式",
    ],
    duties: [
      "分析學生目前的學習狀況",
      "協助設定階段學習目標",
      "規劃學習策略與執行方式",
      "追蹤學習進度與實際成效",
      "根據結果持續調整學習方法",
      "必要時與授課老師協作調整學習策略",
    ],
    process: ["診斷", "規劃", "執行", "追蹤", "調整"],
    highlight: "不是只告訴孩子「要努力」，而是一起找出「怎麼努力才有效」",
  },
  {
    id: "guidance",
    number: "03",
    title: "輔導老師",
    subtitle: "把成長陪好",
    question: "「接下來，我想往哪裡走？」",
    body: [
      "學習是一段很長的過程，而孩子在不同階段遇到的問題，也不一定都能用一道題目的解法回答",
      "可能是一次考試失利後開始懷疑自己，可能是不知道下一個階段該往哪裡走，也可能只是在長期學習之中，需要一個願意理解自己的人",
      "輔導老師負責從更長期的角度陪伴學生，關注學習狀態、階段目標與成長方向，並在需要時協助學生、家長與教學團隊之間進行溝通",
    ],
    duties: [
      "定期了解學生整體學習狀態",
      "陪伴學生建立階段性目標",
      "關注學習動機與自信",
      "協助面對學習歷程中的挫折",
      "升學與階段方向討論",
      "家長溝通與學習狀況回饋",
      "協調學生、家長與教學團隊需求",
    ],
    highlight: "我們想知道的不只是「這次考幾分」，還有「最近學得好不好」",
  },
] as const;

export const threeTeachersCollaboration = {
  eyebrow: "三師如何一起陪伴",
  title: "三個角色，看見同一個孩子",
  nodes: [
    {
      id: "teaching" as const,
      title: "授課老師",
      question: "我哪裡不會？",
      english: "TEACHING",
    },
    {
      id: "advisor" as const,
      title: "解題老師",
      question: "我該怎麼進步？",
      english: "LEARNING STRATEGY",
    },
    {
      id: "guidance" as const,
      title: "輔導老師",
      question: "我接下來往哪裡走？",
      english: "GUIDANCE",
    },
  ],
  studentLabel: "學生",
  studentEnglish: "STUDENT",
  sees: [
    "授課老師，看見孩子的「知識」",
    "解題老師，看見孩子的「策略」",
    "輔導老師，看見孩子的「成長」",
  ],
  closing: [
    "三個角色關注不同的問題，卻共享同一個目標：",
    "讓學生不只是完成一堂又一堂課，而是在每一次學習裡，逐漸找到自己的方法、節奏與方向",
  ],
} as const;

export const threeTeachersOperation = {
  eyebrow: "三師制度如何運作",
  title: "從發現問題，到真正產生改變",
  steps: [
    {
      title: "發現",
      description:
        "透過課堂表現、學習紀錄與學生回饋，了解目前遇到的問題",
    },
    {
      title: "分析",
      description:
        "判斷問題主要來自學科理解、學習策略，或目前的學習狀態與方向",
    },
    {
      title: "協作",
      description:
        "由授課老師、解題老師與輔導老師依照各自專業進行分工與溝通",
    },
    {
      title: "執行",
      description:
        "將改善方向轉換成學生可以實際執行的課程安排與學習行動",
    },
    {
      title: "追蹤",
      description: "持續觀察學習狀況與實際成果，必要時再次調整策略",
    },
  ],
  highlight: "不是等到成績出問題才處理，而是在學習的過程中持續看見問題",
} as const;

export const threeTeachersBrand = {
  eyebrow: "品牌理念",
  title: "不是多幾位老師，而是每一個重要環節，都有人負責",
  paragraphs: [
    "我們知道家長在意孩子的成績，我們也在意",
    "但比一次考試的數字更重要的是，孩子能不能逐漸知道自己為什麼不會、理解自己該怎麼進步，並在一次次突破之後，建立屬於自己的學習能力",
    "這也是品識學苑建立三師共學制度的原因",
    "從把知識教懂、把策略找對，到把成長陪好，我們希望學生的每一段學習歷程，都有人真正看見",
  ],
  closing: "願意努力的孩子，都值得有人好好陪著學",
} as const;

export const threeTeachersFinalCta = {
  title: "每個孩子的問題不同，適合的學習方式也不同",
  paragraphs: [
    "與其急著增加更多課程，不如先了解孩子現在真正遇到的問題",
    "品識學苑會從學生目前的程度、學習狀況與目標出發，一起找到適合的學習方式",
  ],
  primaryLabel: "預約學習諮詢",
  secondaryLabel: "了解課程方案",
  secondaryHref: "/courses",
} as const;
