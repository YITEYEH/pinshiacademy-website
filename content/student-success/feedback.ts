export type ParentFeedbackType =
  | "verified-feedback"
  | "adapted-feedback"
  | "learning-summary";

export type ParentFeedback = {
  id: string;
  category: string;
  content: string;
  /** 去識別化署名或來源說明 */
  source: string;
  verified: boolean;
  type: ParentFeedbackType;
  /** learning-summary 可用標題 */
  title?: string;
};

export const parentFeedbackItems: ParentFeedback[] = [
  {
    id: "adapted-progress",
    category: "國中數學",
    content:
      "最近真的感覺孩子不一樣了，不只會的題變多，上課的態度也明顯改變。",
    source: "國中學生家長",
    verified: false,
    type: "adapted-feedback",
  },
  {
    id: "summary-motivation",
    category: "國中數學",
    title: "開始主動期待課程",
    content:
      "學生從原本對數學缺乏明確動機，逐漸轉變為願意提問、嘗試解題，並開始期待老師安排的新題目。",
    source: "課程觀察",
    verified: false,
    type: "learning-summary",
  },
  {
    id: "summary-explain",
    category: "高中數學",
    title: "更能說出自己不懂的地方",
    content:
      "學生不再只用「我不會」概括整道題目，而是能逐步說明自己在哪個觀念或步驟卡住。",
    source: "課程觀察",
    verified: false,
    type: "learning-summary",
  },
  {
    id: "summary-reading",
    category: "高中數學",
    title: "願意閱讀敘述較長的題目",
    content:
      "透過逐步增加題目文字量與條件整理練習，學生開始願意把題目完整讀完，再判斷應使用的方法。",
    source: "課程觀察",
    verified: false,
    type: "learning-summary",
  },
  {
    id: "summary-exams",
    category: "統測準備",
    title: "從被動練習到主動索取題目",
    content:
      "學生在建立基礎與信心後，開始主動向老師索取更多考卷，並願意在課外持續練習。",
    source: "課程觀察",
    verified: false,
    type: "learning-summary",
  },
  {
    id: "summary-peer",
    category: "自主學習",
    title: "有能力將觀念說給同學聽",
    content:
      "學生不僅能完成自己的學習，也開始協助同學理解內容，展現出更完整的觀念掌握與學習自信。",
    source: "課程觀察",
    verified: false,
    type: "learning-summary",
  },
  {
    id: "summary-exam-errors",
    category: "會考數學",
    title: "依錯誤原因安排補強",
    content:
      "課程會區分學生是因粗心、閱讀錯誤、計算問題或觀念不足而失分，再安排不同的練習方式。",
    source: "教學紀錄整理",
    verified: false,
    type: "learning-summary",
  },
  {
    id: "summary-parent-comm",
    category: "親師溝通",
    title: "家長能掌握每一階段的學習狀況",
    content:
      "透過課後回饋，家長可了解當次課程內容、學生吸收狀況、需要補強的觀念與後續進度安排。",
    source: "教學紀錄整理",
    verified: false,
    type: "learning-summary",
  },
  {
    id: "summary-confidence",
    category: "學習信心",
    title: "從害怕答錯，到願意先試一次",
    content:
      "學生逐漸理解答錯不是能力不足，而是找到下一個需要練習的位置，因此更願意嘗試陌生題型。",
    source: "課程觀察",
    verified: false,
    type: "learning-summary",
  },
];
