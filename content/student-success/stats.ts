export type SuccessStat = {
  id: string;
  value: string;
  unit?: string;
  label: string;
  note?: string;
};

/** 與首頁 homeProof.stats 對齊 */
export const successStats: SuccessStat[] = [
  {
    id: "gsat-5a",
    value: "10",
    unit: "位",
    label: "會考5A++",
  },
  {
    id: "top-three",
    value: "13",
    unit: "位",
    label: "校排名前三",
  },
  {
    id: "score-gain",
    value: "23",
    unit: "位",
    label: "在校成績進步10分以上",
  },
  {
    id: "gsat-target",
    value: "17",
    unit: "位",
    label: "學測達成目標級分",
  },
];

export const successStatsTitle = "每一份成績背後，都是持續累積的努力";

export const successStatsNote =
  "以上內容依目前可公開之教學成果整理；品識學苑重視學生隱私，不公開未經授權之姓名、學校與個人成績資料";
