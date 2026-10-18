/** 首頁 CRO 文案（頁面內文不加句號） */

/** CTA 旁下一步說明（全站試聽承諾對齊） */
export const homeCtaNextStep =
  "先了解狀況再安排試聽 · 約 1 個工作天回覆 · 不一定要馬上報名";

export const homeHero = {
  h1Product: "國高中線上一對一家教",
  h1Benefit: "從學習診斷開始，找到真正需要加強的地方",
  subtitle:
    "每個孩子都有不同的學習步調。品識學苑從學習程度、觀念理解與解題方式出發，找出學習瓶頸，規劃適合孩子的學習方向，讓每一分努力都更有意義",
  primaryCta: "預約免費試聽",
  secondaryCta: "了解品識怎麼教",
  secondaryHref: "/about",
} as const;

export const homePainPoints = {
  title: "孩子最近，也有這些學習狀況嗎？",
  cards: [
    {
      number: "01",
      line1: "很努力讀書",
      line2: "成績卻一直卡住",
    },
    {
      number: "02",
      line1: "題目做了很多",
      line2: "換個問法又不會",
    },
    {
      number: "03",
      line1: "知道自己不會",
      line2: "卻不知道問題到底在哪裡",
    },
    {
      number: "04",
      line1: "補習、刷題都試過",
      line2: "效果還是不穩定",
    },
  ] as const,
  closing: "與其急著再多上一堂課，不如先弄清楚孩子真正卡住的地方",
  lineCta: "預約免費試聽",
} as const;

export const homeProof = {
  worthTitle: "真正值得被看見的成果",
  worthLead: "成績很重要，但這些改變，往往比分數更早出現",
  beforeLabel: "之前",
  afterLabel: "之後",
  statsTitle: "每一份成績背後，都是持續累積的努力",
  /** 皆為「學生人數＋具體學習成果」；上線前須核對統計依據與隱私授權 */
  stats: [
    { value: "10", unit: "位", label: "會考5A++" },
    { value: "13", unit: "位", label: "校排名前三" },
    { value: "23", unit: "位", label: "在校成績進步10分以上" },
    { value: "17", unit: "位", label: "學測達成目標級分" },
  ] as const,
  lineCta: "預約免費試聽",
  moreCta: "看更多學生的學習改變",
  moreHref: "/student-success",
} as const;

export const homeCourses = {
  titleLine1: "每個孩子需要的方式不同",
  titleLine2: "不必現在就決定",
  formats: [
    {
      name: "一對一課程",
      description: "針對個別弱點進行深度指導，依學習節奏彈性調整進度",
      href: "/courses",
      linkLabel: "了解更多",
    },
    {
      name: "小班互動課程",
      description: "小班制即時互動教學，老師充分關注每位學生，即時解答疑問",
      href: "/courses",
      linkLabel: "了解更多",
    },
    {
      name: "預錄課程",
      description: "高品質錄製課程，隨時隨地學習，依照自己的步調反覆觀看",
      href: "/online-courses",
      linkLabel: "了解更多",
    },
  ] as const,
  closing: "還不知道適合哪一種？很正常",
  lineCta: "預約免費試聽",
} as const;

export const homeTeachers = {
  title: "品識師資團隊",
  subtitle: "先認識老師怎麼教，不必現在就自己選老師",
  cta: "了解品識師資",
  ctaHref: "/teachers",
} as const;

export const homeBrand = {
  title: "學習的意義，不只停留在分數",
  subtitle: "因為真正能讓孩子長期進步的，從來不只是分數",
  values: [
    {
      icon: "品",
      title: "品德",
      subtitle: "Character",
      description: "培養面對人生的責任感與選擇能力",
    },
    {
      icon: "知",
      title: "知識",
      subtitle: "Knowledge",
      description: "建立紮實學科基礎與學習方法",
    },
    {
      icon: "見",
      title: "見識",
      subtitle: "Vision",
      description: "拓展視野與獨立思考的能力",
    },
    {
      icon: "膽",
      title: "膽識",
      subtitle: "Courage",
      description: "勇於面對挑戰與克服困難",
    },
  ] as const,
} as const;

export const homeFinalCta = {
  titleLine1: "不知道從哪裡開始",
  titleLine2: "就先預約免費試聽",
  subtitle: "先了解孩子卡點，再決定適不適合；不用先選課",
  nextStep: homeCtaNextStep,
  primaryCta: "預約免費試聽",
  secondaryCta: "了解課程介紹",
  secondaryHref: "/courses",
} as const;

export const homeSticky = {
  message: "不確定適不適合？先預約免費試聽",
  label: "預約免費試聽",
} as const;
