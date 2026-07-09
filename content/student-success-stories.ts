export type SuccessStory = {
  name: string;
  grade: string;
  subject: string;
  before: {
    score: string;
    description: string;
    challenges: string[];
  };
  journey: {
    period: string;
    focus: string;
    actions: string[];
  }[];
  after: {
    score: string;
    description: string;
    achievements: string[];
  };
  testimonial: string;
};

export const successStories: SuccessStory[] = [
  {
    name: "小明",
    grade: "國三",
    subject: "數學",
    before: {
      score: "45分",
      description: "對數學感到害怕，看到題目就放棄",
      challenges: ["基礎概念不清楚", "缺乏解題信心", "考試容易緊張"],
    },
    journey: [
      {
        period: "第1-2個月",
        focus: "建立基礎",
        actions: ["重新理解基本概念", "從簡單題型開始練習", "建立解題筆記"],
      },
      {
        period: "第3-4個月",
        focus: "強化應用",
        actions: ["增加題型難度", "學習解題策略", "定期小測驗"],
      },
      {
        period: "第5-6個月",
        focus: "穩定進步",
        actions: ["模擬考試練習", "時間管理訓練", "錯題分析複習"],
      },
    ],
    after: {
      score: "82分",
      description: "能獨立解題，對數學產生興趣",
      achievements: ["成績進步37分", "建立自信心", "主動問問題"],
    },
    testimonial:
      "謝謝葉老師的耐心教導，讓我發現數學其實沒有想像中那麼難",
  },
  {
    name: "小華",
    grade: "高一",
    subject: "英文",
    before: {
      score: "58分",
      description: "單字背了就忘，文法觀念混亂",
      challenges: ["單字量不足", "文法不熟練", "閱讀速度慢"],
    },
    journey: [
      {
        period: "第1-2個月",
        focus: "語感建立",
        actions: ["情境式單字學習", "基礎文法整理", "每日英文短文閱讀"],
      },
      {
        period: "第3-4個月",
        focus: "能力提升",
        actions: ["擴充單字量", "複雜文法練習", "文章結構分析"],
      },
      {
        period: "第5-6個月",
        focus: "綜合應用",
        actions: ["長篇閱讀訓練", "寫作練習", "聽力加強"],
      },
    ],
    after: {
      score: "85分",
      description: "能流暢閱讀英文文章，寫作有明顯進步",
      achievements: ["成績進步27分", "通過英檢中級", "敢開口說英文"],
    },
    testimonial:
      "透過系統化練習，我終於找到學英文的訣竅，現在看英文文章不再害怕了！",
  },
  {
    name: "小芳",
    grade: "國二",
    subject: "國文",
    before: {
      score: "62分",
      description: "作文常常寫不出來，古文看不懂",
      challenges: ["閱讀理解困難", "作文缺乏結構", "國學常識薄弱"],
    },
    journey: [
      {
        period: "第1-2個月",
        focus: "理解力培養",
        actions: ["白話文精讀", "文意分析練習", "作文架構訓練"],
      },
      {
        period: "第3-4個月",
        focus: "深度學習",
        actions: ["古文翻譯技巧", "修辭手法運用", "寫作素材累積"],
      },
      {
        period: "第5-6個月",
        focus: "表達提升",
        actions: ["長篇作文練習", "文學賞析", "綜合題型演練"],
      },
    ],
    after: {
      score: "88分",
      description: "作文能寫出有深度的內容，古文理解力大幅提升",
      achievements: ["成績進步26分", "作文比賽佳作", "愛上閱讀"],
    },
    testimonial:
      "蔣老師讓我發現國文不只是考試科目，更是表達自我的工具！",
  },
];
