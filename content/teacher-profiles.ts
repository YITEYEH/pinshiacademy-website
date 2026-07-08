export type TeacherProfileFeature = {
  title: string;
  description: string;
};

export type TeacherProfileCourseFormat = {
  title: string;
  description: string;
  suitableFor: string;
};

export type TeacherProfileFaqItem = {
  question: string;
  answer: string;
};

export type TeacherProfileContent = {
  slug: string;
  experienceHighlights: readonly string[];
  aboutParagraphs: readonly string[];
  teachingFeatures: readonly TeacherProfileFeature[];
  suitableStudents: readonly string[];
  courseFormats: readonly TeacherProfileCourseFormat[];
  teachingProcess: readonly TeacherProfileFeature[];
  faq: readonly TeacherProfileFaqItem[];
  footerCta: {
    title: string;
    description: string;
  };
};

const yehYideProfile: TeacherProfileContent = {
  slug: "yeh-yide",
  experienceHighlights: [
    "五年以上教學經驗",
    "5000+ 堂授課經驗",
    "專攻國高中數學",
  ],
  aboutParagraphs: [
    "葉以德老師專注國中與高中數學教學，擅長將抽象的數學概念，轉化為清楚、可操作的解題步驟，讓學生不再只是「看起來會了」，而是真正理解每個環節為什麼要這樣做。",
    "課堂上，葉老師重視引導式提問，鼓勵學生先思考、再嘗試、最後整理。他相信數學學習的關鍵，在於幫助學生理解「為什麼」，而不是只記住「怎麼做」。",
    "許多原本害怕數學、對解題缺乏信心的學生，在葉老師的陪伴下，逐步找回學習節奏，建立屬於自己的解題方式與自信心。",
  ],
  teachingFeatures: [
    {
      title: "引導式提問",
      description:
        "透過循序提問，引導學生自己找到解題方向，培養獨立思考與邏輯推理能力。",
    },
    {
      title: "弱點分析",
      description:
        "從作業、測驗與課堂表現中找出學習盲點，針對薄弱環節設計補強計畫。",
    },
    {
      title: "錯題整理",
      description:
        "建立系統化的錯題筆記，幫助學生釐清錯誤原因，避免同類型問題一再發生。",
    },
    {
      title: "解題策略建立",
      description:
        "不只教會單一題型，更協助學生歸納解題架構，面對變化題型也能靈活應對。",
    },
    {
      title: "客製化學習安排",
      description:
        "依學生程度、目標與學習節奏，調整進度與練習強度，讓學習更有效率。",
    },
  ],
  suitableStudents: [
    "國中會考準備",
    "高中段考準備",
    "學測數學準備",
    "數學基礎不穩的學生",
    "害怕數學、缺乏解題信心的學生",
    "想建立邏輯思維與解題能力的學生",
  ],
  courseFormats: [
    {
      title: "一對一課程",
      description:
        "全程專注個別學習狀況，針對弱點即時調整教學節奏，適合需要深度補強或衝刺的學生。",
      suitableFor: "適合：基礎待加強、進度需彈性調整、目標明確的學生",
    },
    {
      title: "小班互動課程",
      description:
        "在適當的學習氛圍中互相討論、共同進步，兼顧互動感與個別關注。",
      suitableFor: "適合：喜歡同儕討論、希望穩定學習節奏的學生",
    },
    {
      title: "預錄課程",
      description:
        "彈性安排觀看時間，搭配重點講解與練習，適合需要反覆複習的學習內容。",
      suitableFor: "適合：時間較難固定、想自主複習的學生",
    },
  ],
  teachingProcess: [
    {
      title: "預約諮詢",
      description: "透過 LINE 預約，初步了解學習需求與目標。",
    },
    {
      title: "學習狀況了解",
      description: "了解目前程度、學習困難與期待，找出最適合的起步方式。",
    },
    {
      title: "安排適合課程",
      description: "依年級、目標與學習節奏，建議一對一、小班或預錄課程。",
    },
    {
      title: "正式上課",
      description: "開始系統化學習，建立穩定的解題思路與練習節奏。",
    },
    {
      title: "定期追蹤學習成效",
      description: "持續檢視進步狀況，調整學習策略，確保方向正確。",
    },
  ],
  faq: [
    {
      question: "程度不好可以上課嗎？",
      answer:
        "可以。葉老師會從學生目前的理解程度出發，先補足基礎概念，再循序建立信心與解題能力，不需要擔心「跟不上」。",
    },
    {
      question: "一對一和小班課程怎麼選？",
      answer:
        "若需要較高頻率的個別指導、進度彈性調整，建議選擇一對一；若希望在互動中學習、同時維持穩定節奏，小班課程會是更好的選擇。",
    },
    {
      question: "上課會有教材或作業嗎？",
      answer:
        "會依學生程度與學習目標安排練習內容，並在課後提供適量的複習與作業，幫助鞏固課堂所學。",
    },
    {
      question: "多久可以看到學習成效？",
      answer:
        "因學生起點與目標不同而有所差異。多數學生在建立穩定學習節奏後，約 1 至 3 個月可感受到解題思路與信心的明顯改變。",
    },
    {
      question: "可以先預約諮詢再決定嗎？",
      answer:
        "當然可以。歡迎先預約學習評估，我們會依孩子的狀況說明適合的課程方向，再決定是否開始上課。",
    },
  ],
  footerCta: {
    title: "想找到適合自己的數學學習方式嗎？",
    description:
      "立即預約學習評估，讓品識學苑協助你安排最適合的課程。",
  },
};

const yeXuezhenProfile: TeacherProfileContent = {
  slug: "ye-xuezhen",
  experienceHighlights: [
    "國小、國中數學教學經驗",
    "數學教材研發背景",
    "專長課程架構設計",
  ],
  aboutParagraphs: [
    "葉學貞老師專注國小與國中數學教學，同時深耕教材研發與課程架構設計，擅長將抽象概念拆解為清楚、可理解的學習步驟，幫助學生建立穩定成長的解題邏輯。",
    "課堂上，葉老師注重讓學生理解每個步驟背後的原因，而不只是記住解法。她會依學生的程度調整節奏，讓基礎待加強的學生也能穩步跟上。",
    "結合教學設計的專業背景，葉老師能為學生規劃更有系統的學習路徑，協助他們在國小至國中階段打好根基、建立信心。",
  ],
  teachingFeatures: [
    {
      title: "概念拆解",
      description:
        "將複雜題型拆解為清楚步驟，幫助學生理解每個環節的邏輯與目的。",
    },
    {
      title: "循序架構",
      description:
        "依學生程度設計漸進式練習，從基礎理解到綜合應用，穩步建立能力。",
    },
    {
      title: "教材設計優勢",
      description:
        "結合教材研發經驗，讓學習內容更系統化、更容易複習與內化。",
    },
    {
      title: "弱點診斷",
      description:
        "從作業與測驗中找出學習盲點，針對薄弱環節安排補強練習。",
    },
    {
      title: "學習路徑規劃",
      description:
        "依會考目標與學習節奏，規劃適合的複習進度與練習強度。",
    },
  ],
  suitableStudents: [
    "國小數學基礎建立",
    "國中會考數學準備",
    "國中段考衝刺",
    "數學基礎待加強的學生",
    "概念理解困難、需要拆解步驟的學生",
    "學習節奏需要彈性調整的學生",
    "想建立穩定解題邏輯的學生",
  ],
  courseFormats: [
    {
      title: "一對一課程",
      description:
        "針對個別弱點進行深度指導，依學習節奏彈性調整進度與練習內容。",
      suitableFor: "適合：需個別加強、進度彈性需求的學生",
    },
    {
      title: "小班互動課程",
      description:
        "在適當的學習氛圍中討論解題思路，兼顧互動與個別關注。",
      suitableFor: "適合：喜歡同儕討論、希望穩定學習節奏的學生",
    },
    {
      title: "預錄課程",
      description:
        "彈性複習重點概念與題型，適合需要反覆觀看、自主複習的學習內容。",
      suitableFor: "適合：時間較難固定、想自主複習的學生",
    },
  ],
  teachingProcess: [
    {
      title: "預約諮詢",
      description: "透過 LINE 預約，初步了解學習需求與目標。",
    },
    {
      title: "學習狀況了解",
      description: "了解目前程度、學習困難與會考目標，找出適合的起點。",
    },
    {
      title: "安排適合課程",
      description: "依程度與目標，建議一對一、小班或預錄課程。",
    },
    {
      title: "正式上課",
      description: "開始系統化學習，建立穩定的解題思路與練習節奏。",
    },
    {
      title: "定期追蹤學習成效",
      description: "持續檢視進步狀況，調整學習重點與複習策略。",
    },
  ],
  faq: [
    {
      question: "程度不好可以上課嗎？",
      answer:
        "可以。葉老師擅長將概念拆解為清楚步驟，會從學生目前的理解程度出發，循序建立信心與解題能力。",
    },
    {
      question: "一對一和小班課程怎麼選？",
      answer:
        "若需要較高頻率的個別指導與彈性進度，建議選擇一對一；若希望在互動中學習、維持穩定節奏，小班課程會更適合。",
    },
    {
      question: "上課會有教材或作業嗎？",
      answer:
        "會依學習目標安排練習內容，結合葉老師的教材設計經驗，提供有系統的複習與作業安排。",
    },
    {
      question: "多久可以看到學習成效？",
      answer:
        "因起點而異，多數學生在建立穩定學習節奏後，約 1 至 3 個月可感受到解題思路與信心的改變。",
    },
    {
      question: "可以先預約諮詢再決定嗎？",
      answer:
        "當然可以。歡迎先預約學習評估，了解適合的課程方向後再決定。",
    },
  ],
  footerCta: {
    title: "想找到適合自己的數學學習方式嗎？",
    description:
      "立即預約學習評估，讓品識學苑協助你安排最適合的課程。",
  },
};

const jiangJiqinProfile: TeacherProfileContent = {
  slug: "jiang-jiqin",
  experienceHighlights: ["三年教學經驗", "專攻國高中國文", "閱讀寫作指導"],
  aboutParagraphs: [
    "蔣季芹老師深耕國中與高中國文教學，擅長用清晰的架構帶領學生拆解文章，從閱讀理解到寫作表達，建立完整的語文學習能力。",
    "課堂上注重引導學生思考文章脈絡與寫作邏輯，幫助他們在文字中找到理解世界與表達自我的力量。",
    "蔣老師相信，每個孩子都能在閱讀與寫作中建立自信，找到屬於自己的學習節奏。",
  ],
  teachingFeatures: [
    {
      title: "架構化閱讀",
      description: "以清楚步驟拆解文章，幫助學生掌握重點與作者意圖。",
    },
    {
      title: "寫作引導",
      description: "從素材累積到段落組織，循序建立有條理的寫作能力。",
    },
    {
      title: "弱點診斷",
      description: "找出閱讀或寫作上的關鍵瓶頸，針對性加強練習。",
    },
    {
      title: "考題策略",
      description: "結合歷屆試題，培養考場閱讀與作答策略。",
    },
    {
      title: "客製化進度",
      description: "依學生程度調整學習內容與節奏，穩步建立語文能力。",
    },
  ],
  suitableStudents: [
    "國中會考國文準備",
    "高中段考準備",
    "學測國文準備",
    "閱讀理解待加強的學生",
    "寫作缺乏結構與自信的學生",
    "想提升語文表達能力的學生",
  ],
  courseFormats: [
    {
      title: "一對一課程",
      description: "針對閱讀或寫作弱點進行深度指導，進度可依需求彈性調整。",
      suitableFor: "適合：需個別加強、進度彈性需求的學生",
    },
    {
      title: "小班互動課程",
      description: "在討論與分享中深化閱讀理解，培養表達與思辨能力。",
      suitableFor: "適合：喜歡互動學習、希望穩定進度的學生",
    },
    {
      title: "預錄課程",
      description: "彈性複習閱讀與寫作技巧，適合需要反覆練習的學習內容。",
      suitableFor: "適合：時間較難固定、想自主複習的學生",
    },
  ],
  teachingProcess: [
    {
      title: "預約諮詢",
      description: "透過 LINE 預約，初步了解學習需求與目標。",
    },
    {
      title: "學習狀況了解",
      description: "了解閱讀、寫作現況與學習目標，規劃適合的起點。",
    },
    {
      title: "安排適合課程",
      description: "依程度與目標，建議一對一、小班或預錄課程。",
    },
    {
      title: "正式上課",
      description: "開始系統化學習，建立閱讀與寫作的穩定能力。",
    },
    {
      title: "定期追蹤學習成效",
      description: "持續檢視進步狀況，調整學習重點與策略。",
    },
  ],
  faq: [
    {
      question: "程度不好可以上課嗎？",
      answer:
        "可以。蔣老師會從學生目前的閱讀與寫作基礎出發，循序建立能力，讓學生在適合的節奏中逐步進步。",
    },
    {
      question: "一對一和小班課程怎麼選？",
      answer:
        "需要較多個別指導時建議一對一；希望在互動中學習、維持穩定進度則適合小班課程。",
    },
    {
      question: "上課會有教材或作業嗎？",
      answer:
        "會依學習目標安排閱讀材料與寫作練習，並提供課後複習建議，幫助鞏固所學。",
    },
    {
      question: "多久可以看到學習成效？",
      answer:
        "因起點而異，多數學生在建立穩定學習習慣後，約 1 至 3 個月可感受到閱讀或寫作能力的提升。",
    },
    {
      question: "可以先預約諮詢再決定嗎？",
      answer:
        "當然可以。歡迎先預約學習評估，了解適合的課程方向後再決定。",
    },
  ],
  footerCta: {
    title: "想找到適合自己的國文學習方式嗎？",
    description:
      "立即預約學習評估，讓品識學苑協助你安排最適合的課程。",
  },
};

const teacherProfiles: Record<string, TeacherProfileContent> = {
  "yeh-yide": yehYideProfile,
  "ye-xuezhen": yeXuezhenProfile,
  "jiang-jiqin": jiangJiqinProfile,
};

export function getTeacherProfile(slug: string): TeacherProfileContent | undefined {
  return teacherProfiles[slug];
}
