export type Teacher = {
  slug: string;
  name: string;
  subject: string;
  jobTitle: string;
  grades: string;
  tags: readonly string[];
  image: string;
  /** 橫式照片建議使用 center，直式人像預設 top */
  imagePosition?: "top" | "center";
  philosophy: string;
  bio: string;
  teachingHighlights: readonly string[];
  /** 僅放已授權／可公開的學生回饋；無則不顯示評價區塊 */
  studentReview?: string;
  experience: string;
  knowsAbout: readonly string[];
};

export const teachers = [
  {
    slug: "yeh-yide",
    name: "葉以德",
    subject: "數學",
    jobTitle: "數學教師",
    grades: "國中、高中",
    tags: ["國中數學", "高中數學", "邏輯思維"],
    image: "/teacher-yeh-yide.jpg",
    philosophy:
      "數學不是背公式，而是建立邏輯思維我相信每個孩子都能找到自己的解題方式",
    bio: "葉老師專注國中與高中數學教學，擅長將抽象概念轉化為可理解的步驟，幫助學生建立穩固的邏輯思維與解題自信課堂上注重引導式提問，讓學生真正理解「為什麼」，而不只是記住「怎麼做」",
    teachingHighlights: [
      "以提問引導取代直接給答案，培養獨立思考",
      "針對弱點設計循序漸進的練習題型",
      "重視錯題分析，建立個人化解題策略",
    ],
    studentReview:
      "葉老師讓我從害怕數學到喜歡數學，他總是很有耐心地解釋到我真的懂為止",
    experience: "六年以上教學經驗",
    knowsAbout: ["國中數學", "高中數學", "邏輯思維"],
  },
  {
    slug: "HSU-Hsi",
    name: "徐璽（Alma）",
    subject: "英文",
    jobTitle: "英文教師",
    grades: "國中、高中",
    tags: ["國中英文", "高中英文", "英文檢定"],
    image: "/teacher-xu-xi.jpg?v=2",
    imagePosition: "center",
    philosophy:
      "英文不是死背單字，而是建立能理解、能表達、能應考的語言能力我相信每個孩子都能找到適合自己的學習節奏",
    bio: "徐老師專注國中與高中英文教學，並協助學生準備英文檢定課堂上重視聽說讀寫的均衡訓練，擅長把文法與單字放回真實語境中理解，讓學生不只會考試，更能真正開口與運用",
    teachingHighlights: [
      "以語境理解取代死背，讓單字與文法記得更久",
      "依程度調整聽說讀寫練習比重，穩步建立語感",
      "結合段考、會考與檢定需求，規劃清楚學習路徑",
    ],
    studentReview:
      "徐老師會把文法講得很清楚，也會陪我練習開口，現在英文比較敢用、也比較有信心了",
    experience: "六年以上教學經驗",
    knowsAbout: ["國中英文", "高中英文", "英文檢定"],
  },
  {
    slug: "tseng-hsiao-chu",
    name: "曾筱筑（Gloria）",
    subject: "英文",
    jobTitle: "英文教師",
    grades: "國中、高中",
    tags: ["國中英文", "高中英文", "引導教學"],
    image: "/teacher-tseng-hsiao-chu.jpg",
    imagePosition: "center",
    philosophy:
      "英文學習不必從死背開始，先把規則講清楚，再對照中英文差異，學生往往更能真正理解、也記得更久",
    bio: "曾老師從事英文教學五年，採引導式教學，擅長以中英雙語對比說明文法，並在單字教學中補充同義詞用法與差異她亦具備跨國華語教學與語言文化實務經驗，能幫助學生在理解語言結構的同時，建立更穩定的學習節奏",
    teachingHighlights: [
      "引導式教學，用簡單易懂的方式說明英文文法",
      "中英雙語對比，協助學生釐清母語干擾與常見錯誤",
      "單字講解補充同義詞用法與差異，提升運用精準度",
    ],
    experience: "五年以上英文教學經驗",
    knowsAbout: ["國中英文", "高中英文", "文法理解", "單字與同義詞"],
  },
] as const satisfies readonly Teacher[];

export function getTeacherBySlug(slug: string): Teacher | undefined {
  return teachers.find((teacher) => teacher.slug === slug);
}

export function getAllTeacherSlugs(): string[] {
  return teachers.map((teacher) => teacher.slug);
}

export function getTeachersGroupedBySubject(): {
  subject: string;
  teachers: Teacher[];
}[] {
  const groups = new Map<string, Teacher[]>();

  for (const teacher of teachers) {
    const list = groups.get(teacher.subject) ?? [];
    list.push(teacher);
    groups.set(teacher.subject, list);
  }

  return Array.from(groups.entries()).map(([subject, subjectTeachers]) => ({
    subject,
    teachers: subjectTeachers,
  }));
}
