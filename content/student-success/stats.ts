export type SuccessStat = {
  id: string;
  value: string;
  label: string;
  note?: string;
};

export const successStats: SuccessStat[] = [
  {
    id: "a-plus-plus",
    value: "2",
    label: "會考數學 A++ 學生",
  },
  {
    id: "exam-levels",
    value: "4",
    label: "會考數學達 A++、B++ 或 B+ 的學生案例",
  },
  {
    id: "one-on-one",
    value: "1 對 1",
    label: "依學生程度調整教學內容",
  },
  {
    id: "tracking",
    value: "持續追蹤",
    label: "每堂課記錄學習狀況與後續安排",
  },
];

export const successStatsNote =
  "以上內容依目前可公開之教學成果整理。品識學苑重視學生隱私，不公開未經授權之姓名、學校與個人成績資料。";
