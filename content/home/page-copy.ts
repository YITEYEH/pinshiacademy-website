/** 首頁 CRO 文案（頁面內文不加句號） */

export const homeHero = {
  h1Line1: "成績上不去？",
  h1Line2: "問題不一定是不夠努力",
  h1Line3: "而是還沒找到適合的方法",
  subtitle:
    "從孩子目前的程度、觀念與學習方式開始了解，找出真正卡住的地方，再一起看看適合怎麼學",
  primaryCta: "LINE 了解學習建議",
  secondaryCta: "了解品識怎麼教",
  secondaryHref: "#how-we-help",
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
} as const;

export const homeLineValue = {
  id: "initial-analysis",
  titleLine1: "孩子到底卡在哪裡？",
  titleLine2: "先不用急著決定要補什麼",
  body: "告訴我們孩子的年級、科目與目前遇到的問題，學習顧問會先協助整理可能的學習卡點，並提供初步的學習方向建議",
  steps: [
    {
      number: "01",
      label: "年級",
      example: "例如：國二",
    },
    {
      number: "02",
      label: "科目",
      example: "例如：數學",
    },
    {
      number: "03",
      label: "目前遇到的問題",
      example:
        "例如：「平常作業大多會寫，但考試遇到變化題就容易卡住」",
    },
  ] as const,
  analysisCta: "LINE 免費做初步分析",
  analysisMicrocopy: "免費・不需先選課・不需立即報名",
  conversationLabel: "對話示意（非真實聊天紀錄）",
  parentMessage:
    "您好，孩子目前國二，數學應用題比較容易卡住，想了解看看適合怎麼加強",
  advisorMessage:
    "您好，沒問題！我們可以先了解孩子目前的學習狀況，再一起看看比較適合從哪裡開始",
  conversationHint:
    "不知道怎麼問也沒關係，告訴我們「年級＋科目＋目前問題」就可以開始",
  conversationCta: "LINE 了解學習建議",
} as const;

export const homeHowWeHelp = {
  id: "how-we-help",
  titleLine1: "我們不急著推薦課程",
  titleLine2: "先找出孩子真正卡住的地方",
  steps: [
    {
      number: "01",
      title: "了解現況",
      description: "了解目前程度、學習狀況與學習目標",
    },
    {
      number: "02",
      title: "找出卡點",
      description:
        "從觀念、計算、閱讀理解、解題策略、學習方式，協助整理目前主要問題",
    },
    {
      number: "03",
      title: "討論學習方向",
      description: "再依照實際需求，討論適合的課程或學習安排",
    },
  ] as const,
  highlight:
    "不是先選課，再把孩子放進去；而是先了解孩子，再討論適合怎麼學",
} as const;

export const homeProof = {
  worthTitle: "真正值得被看見的成果",
  worthLead: "成績很重要，但這些改變，往往比分數更早出現",
  beforeLabel: "之前",
  afterLabel: "之後",
  statsTitle: "這些數據，來自我們實際帶過的學生",
  stats: [
    { value: "95%", label: "學生在3個月內看到進步" },
    { value: "4.8", label: "平均滿意度" },
    { value: "500+", label: "輔導學生數" },
    { value: "5", label: "核心學科涵蓋" },
  ] as const,
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
      name: "家教制課程",
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
  lineCta: "LINE 了解學習建議",
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
  titleLine2: "就先從聊聊孩子的狀況開始",
  subtitle: "不用先選課，也不用現在就做決定",
  primaryCta: "LINE 了解學習建議",
  secondaryCta: "了解課程介紹",
  secondaryHref: "/courses",
} as const;

export const homeSticky = {
  message: "LINE 詢問學習顧問",
  label: "LINE 詢問學習顧問",
} as const;
