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
    "六年以上教學經驗",
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
    {
      title: "信心重建陪伴",
      description:
        "從會的地方重新出發，累積成功解題經驗，幫助害怕數學的學生逐步找回學習自信。",
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

const xuXiProfile: TeacherProfileContent = {
  slug: "HSU-Hsi",
  experienceHighlights: [
    "六年以上教學經驗",
    "專攻國高中英文",
    "英文檢定指導",
  ],
  aboutParagraphs: [
    "徐璽老師專注國中與高中英文教學，同時協助學生準備英文檢定。她擅長把單字、文法與閱讀放回真實語境中理解，讓學生不再只是死背規則，而是真正建立能理解、能表達、能應考的語言能力。",
    "課堂上，徐老師重視聽說讀寫的均衡訓練，會依學生程度調整練習比重，讓基礎待加強的學生也能穩步跟上，並逐步建立開口與應試的信心。",
    "無論是段考、會考、學測、分科或是英檢目標，徐老師都會協助學生釐清起點與方向，規劃清楚的學習路徑，陪伴每一位孩子找到適合自己的英文學習節奏。",
  ],
  teachingFeatures: [
    {
      title: "語境理解",
      description:
        "把單字與文法放回句子與生活情境中學習，幫助學生記得更久、用得更自然。",
    },
    {
      title: "聽說讀寫並進",
      description:
        "依程度調整四技能練習比重，兼顧考試需求與實際溝通能力。",
    },
    {
      title: "弱點診斷",
      description:
        "從作業、測驗與課堂表現找出學習盲點，針對薄弱環節安排補強。",
    },
    {
      title: "檢定與應考策略",
      description:
        "結合段考、會考與英文檢定題型，培養清楚的解題與作答策略。",
    },
    {
      title: "客製化進度",
      description:
        "依學生目標與學習節奏調整進度與練習強度，讓學習更有效率。",
    },
    {
      title: "開口練習陪伴",
      description:
        "用低壓、可重複的口說練習，協助學生克服害怕表達的心理，逐步建立說英文的自信。",
    },
  ],
  suitableStudents: [
    "國中會考英文準備",
    "高中段考英文準備",
    "學測英文準備",
    "英文檢定準備",
    "英文基礎待加強的學生",
    "害怕開口、缺乏表達信心的學生",
    "想建立穩定英文學習節奏的學生",
    "想提升閱讀理解與寫作表達的學生",
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
        "在適當的學習氛圍中練習表達與討論，兼顧互動感與個別關注。",
      suitableFor: "適合：喜歡同儕互動、希望穩定學習節奏的學生",
    },
    {
      title: "預錄課程",
      description:
        "彈性複習文法、單字與閱讀技巧，適合需要反覆觀看的學習內容。",
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
      description: "了解目前程度、學習困難與英文目標，找出適合的起點。",
    },
    {
      title: "安排適合課程",
      description: "依程度與目標，建議一對一、小班或預錄課程。",
    },
    {
      title: "正式上課",
      description: "開始系統化學習，建立穩定的語感與應試能力。",
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
        "可以。徐老師會從學生目前的理解程度出發，先補強基礎，再循序建立信心與運用能力，不需要擔心跟不上。",
    },
    {
      question: "一對一和小班課程怎麼選？",
      answer:
        "若需要較高頻率的個別指導與彈性進度，建議選擇一對一；若希望在互動中練習表達、維持穩定節奏，小班課程會更適合。",
    },
    {
      question: "上課會有教材或作業嗎？",
      answer:
        "會依學習目標安排練習內容，並在課後提供適量複習與作業，幫助鞏固課堂所學。",
    },
    {
      question: "多久可以看到學習成效？",
      answer:
        "因起點與目標不同而有所差異。多數學生在建立穩定學習節奏後，約 1 至 3 個月可感受到理解、表達或應試信心的改變。",
    },
    {
      question: "可以先預約諮詢再決定嗎？",
      answer:
        "當然可以。歡迎先預約學習評估，我們會依孩子的狀況說明適合的課程方向，再決定是否開始上課。",
    },
  ],
  footerCta: {
    title: "想找到適合自己的英文學習方式嗎？",
    description:
      "立即預約學習評估，讓品識學苑協助你安排最適合的課程。",
  },
};

const teacherProfiles: Record<string, TeacherProfileContent> = {
  "yeh-yide": yehYideProfile,
  "HSU-Hsi": xuXiProfile,
};

export function getTeacherProfile(slug: string): TeacherProfileContent | undefined {
  return teacherProfiles[slug];
}
