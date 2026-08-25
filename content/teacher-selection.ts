import type { ProcessStep } from "@/components/ProcessTimeline";

export const teacherSelectionProcess = {
  title: "我們如何挑選老師？",
  description:
    "品識學苑不只看重學經歷，更重視老師能不能真正教懂、願意陪伴學生每位授課老師都需通過以下篩選流程",
  steps: [
    {
      title: "履歷審核",
      description: "檢視學科背景、教學經驗與相關資格，確認基本專業門檻",
    },
    {
      title: "專業測驗",
      description: "評估學科觀念、解題邏輯與對課綱內容的掌握程度",
    },
    {
      title: "試教評估",
      description: "實際進行試教，觀察講解清晰度、互動方式與對學生的耐心",
    },
    {
      title: "師培培訓",
      description: "通過品識學苑教學理念與授課流程培訓，對齊教學品質標準",
    },
    {
      title: "正式授課",
      description: "完成培訓後始得安排授課，並持續接受教學回饋與品質追蹤",
    },
  ] satisfies ProcessStep[],
} as const;
