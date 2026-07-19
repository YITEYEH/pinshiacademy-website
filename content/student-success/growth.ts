export type GrowthDimension = {
  id: string;
  title: string;
  description: string;
};

export type GrowthPhase = {
  id: string;
  title: string;
  description: string;
};

export const growthDimensions: GrowthDimension[] = [
  {
    id: "ask",
    title: "願意發問",
    description: "學生不再害怕答錯，能夠說出自己卡住的地方。",
  },
  {
    id: "understand",
    title: "理解觀念",
    description: "不只記住公式，也能用自己的方式說明原因。",
  },
  {
    id: "practice",
    title: "主動練習",
    description: "從等待老師安排，轉變為願意自己完成題目。",
  },
  {
    id: "read",
    title: "閱讀題目",
    description: "能夠耐心閱讀條件，不因題目較長就先放棄。",
  },
  {
    id: "mistakes",
    title: "面對錯誤",
    description: "不再把錯題視為失敗，而是找到需要補強的位置。",
  },
  {
    id: "confidence",
    title: "建立自信",
    description: "開始相信自己可以學會，也願意再次挑戰。",
  },
];

export const growthPhases: GrowthPhase[] = [
  {
    id: "phase-1",
    title: "了解學生",
    description: "確認學生目前程度、學習習慣、錯誤類型與目標。",
  },
  {
    id: "phase-2",
    title: "補足基礎",
    description: "找出真正卡住的觀念，不讓學生在不穩固的基礎上繼續堆疊。",
  },
  {
    id: "phase-3",
    title: "建立理解",
    description: "讓學生知道公式、方法與解題步驟背後的原因。",
  },
  {
    id: "phase-4",
    title: "鼓勵表達",
    description: "透過提問、口頭說明與課堂互動，確認學生是否真正理解。",
  },
  {
    id: "phase-5",
    title: "增加挑戰",
    description: "在學生能夠負擔的範圍內，逐步提高題目難度與閱讀量。",
  },
  {
    id: "phase-6",
    title: "走向自主",
    description: "學生開始能夠自己發現問題、安排練習並主動尋求協助。",
  },
];

export const growthTimelineClosing =
  "從「老師告訴我怎麼做」，到「我知道自己可以怎麼想」。這就是我們期待學生帶走的能力。";
