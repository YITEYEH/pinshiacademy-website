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
  studentReview: string;
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
      "數學不是背公式，而是建立邏輯思維。我相信每個孩子都能找到自己的解題方式。",
    bio: "葉老師專注國中與高中數學教學，擅長將抽象概念轉化為可理解的步驟，幫助學生建立穩固的邏輯思維與解題自信。課堂上注重引導式提問，讓學生真正理解「為什麼」，而不只是記住「怎麼做」。",
    teachingHighlights: [
      "以提問引導取代直接給答案，培養獨立思考",
      "針對弱點設計循序漸進的練習題型",
      "重視錯題分析，建立個人化解題策略",
    ],
    studentReview:
      "葉老師讓我從害怕數學到喜歡數學，他總是很有耐心地解釋到我真的懂為止。",
    experience: "五年以上教學經驗",
    knowsAbout: ["國中數學", "高中數學", "邏輯思維"],
  },
  {
    slug: "ye-xuezhen",
    name: "葉學貞",
    subject: "數學",
    jobTitle: "數學教師",
    grades: "國小、國中",
    tags: ["國小數學", "國中數學", "教材設計", "課程架構"],
    image: "/team/ye-xuezhen.jpg",
    imagePosition: "center",
    philosophy:
      "將抽象概念拆解為可理解的學習步驟，幫助每位學生建立穩定成長的解題邏輯。",
    bio: "葉學貞老師專注國小與國中數學教學與課程設計，擅長把複雜的數學概念轉化為清楚、可循序理解的學習步驟。除了第一線教學，她也參與教材研發與師資培訓，讓課堂內容更貼近學生的學習節奏與需求。",
    teachingHighlights: [
      "將抽象概念拆解為可操作的學習步驟",
      "依學生程度設計循序漸進的練習架構",
      "結合教材設計經驗，讓學習路徑更清楚",
    ],
    studentReview:
      "葉老師講解很有條理，會把題目拆成幾個步驟，讓我慢慢理解，不再那麼害怕數學。",
    experience: "數學教學與課程設計經驗",
    knowsAbout: ["國小數學", "國中數學", "教材設計", "課程架構"],
  },
  {
    slug: "jiang-jiqin",
    name: "蔣季芹",
    subject: "國文",
    jobTitle: "國文教師",
    grades: "國中、高中",
    tags: ["國中國文", "高中國文", "閱讀寫作"],
    image: "/teacher-jiang-jiqin.jpg",
    philosophy:
      "讓閱讀成為力量，讓表達成為自信。我相信每個孩子都能在文字裡，找到理解世界與認識自己的能力。",
    bio: "蔣老師深耕國文閱讀與寫作教學，擅長用清晰的架構帶領學生拆解文章，並逐步引導學生將想法組織成有條理的表達。課堂氛圍溫暖而專注，讓學生在文字中找到自信。",
    teachingHighlights: [
      "以架構化閱讀法幫助學生掌握文章重點",
      "從素材累積到段落組織，循序建立寫作能力",
      "結合歷屆試題，培養考場應對的閱讀策略",
    ],
    studentReview:
      "蔣老師總能用清楚的架構帶我讀懂文章，也會一步步引導我把想法寫出來，現在寫作更有自信了。",
    experience: "三年教學經驗",
    knowsAbout: ["國中國文", "高中國文", "閱讀寫作"],
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
