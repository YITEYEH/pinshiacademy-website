export type LearningMethodStep = {
  id: string;
  title: string;
  intro: string;
  points: string[];
};

export const learningMethodSteps: LearningMethodStep[] = [
  {
    id: "understand",
    title: "了解真正的學習狀況",
    intro: "不是只看目前分數，而是了解學生：",
    points: [
      "哪些觀念沒有建立",
      "平常如何寫題目",
      "面對不會的內容時會有什麼反應",
      "是否能讀懂題目",
      "是否能說出自己的思考過程",
      "目前最需要改善的問題",
    ],
  },
  {
    id: "adjust",
    title: "依程度調整課程",
    intro: "相同年級的學生，也可能需要完全不同的教學方式。老師會依學生的：",
    points: [
      "基礎程度",
      "學習目標",
      "吸收速度",
      "考試時間",
      "題型弱點",
      "學習習慣",
    ],
  },
  {
    id: "confirm",
    title: "確認學生真正理解",
    intro: "品識學苑不只確認學生有沒有寫出答案，也會透過：",
    points: [
      "課堂提問",
      "口頭說明",
      "觀念抽問",
      "類題練習",
      "錯題檢討",
      "不同題型轉換",
    ],
  },
  {
    id: "track",
    title: "持續追蹤與回饋",
    intro: "每堂課後，老師會依實際狀況記錄：",
    points: [
      "本次課程內容",
      "學生吸收狀況",
      "需要補強的觀念",
      "作業安排",
      "下次課程方向",
      "近期進度規劃",
    ],
  },
];
