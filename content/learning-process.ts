export type LearningProcessStep = {
  title: string;
  description: string;
};

export const learningProcess = {
  title: "品識學苑學習流程",
  description:
    "從第一次諮詢到看見學習成果，我們陪學生與家長走完每一步，讓報名與上課都清楚安心。",
  steps: [
    {
      title: "免費諮詢",
      description: "了解學生程度、學習習慣與升學目標，釐清家長最在意的問題。",
    },
    {
      title: "能力診斷",
      description: "找出真正卡關的觀念與盲點，作為後續課程規劃的依據。",
    },
    {
      title: "安排試聽",
      description: "實際體驗教學方式與師資風格，確認適合再決定是否報名。",
    },
    {
      title: "正式上課",
      description: "依規劃開始一對一或小班課程，建立穩定的學習節奏。",
    },
    {
      title: "定期追蹤",
      description: "持續檢討學習進度，適時調整教學內容與複習策略。",
    },
    {
      title: "成果檢視",
      description: "看見成績、理解力與學習信心的變化，累積長期成長動能。",
    },
  ] satisfies LearningProcessStep[],
} as const;
