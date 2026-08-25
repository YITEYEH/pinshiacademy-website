/** 師資頁文案（/teachers）— 頁面內文不加句號 */

export const teachersPageSeo = {
  title: "品識學苑師資｜線上數學英文家教｜教學品質",
  description:
    "認識品識學苑核心教師與選師標準線上數學、英文家教注重理解與篩選，陪國中會考、高中學測穩步學習",
  ogTitle: "品識學苑師資｜核心教師與教學品質",
} as const;

export const teachersHero = {
  h1Line1: "好的教學",
  h1Line2: "從選對老師開始",
  subtitle:
    "我們相信，真正好的老師不只是自己會解題，而是能理解學生卡在哪裡，把複雜的觀念說清楚，並陪孩子建立屬於自己的理解",
  primaryCta: "認識核心教師",
  primaryHref: "#core-faculty",
  secondaryCta: "了解我們如何選老師",
  secondaryHref: "#how-we-select",
} as const;

export const teachersStatement = {
  titleLine1: "我們寧願少一位老師",
  titleLine2: "也不願多一位還沒準備好的老師",
  paragraphs: [
    "對品識學苑而言，增加一位老師，不只是增加一個名字",
    "因為每一位真正站上課堂的人，都可能影響學生對一門科目的理解、自信，以及面對學習的方式",
    "因此，比起快速擴張師資人數，我們更在意每一位老師是否具備扎實的學科能力、清楚的教學表達、理解學生的耐心，以及與品識相近的教育理念",
  ],
  highlight:
    "我們希望，每一位站上品識課堂的老師，都不只是會教，更懂得如何讓學生真正學會",
} as const;

export const teachersFacultySection = {
  id: "core-faculty",
  title: "認識目前的核心教師",
  paragraphs: [
    "從課程設計、實際授課到學生學習狀況的回饋，核心教師深度參與每一個教學環節",
    "我們希望老師不只是完成一堂課，而是真正知道學生今天理解了什麼、還卡在哪裡，以及下一步應該往哪裡走",
  ],
} as const;

/** 列表頁展示用欄位（濃縮自既有 teacher data／profile，不虛構經歷） */
export const teachersFacultyCards = [
  {
    slug: "yeh-yide",
    featureTags: ["觀念理解", "解題思維", "弱點分析"] as const,
    statement: "比起記住一道題目的解法，我更希望學生知道：為什麼可以這樣想",
    body: "我在意的不只是學生有沒有算出答案，而是能不能理解題目背後的觀念，知道自己卡在哪裡，並逐步建立面對不同題型時的思考方式",
    suitableFor:
      "適合希望補強數學觀念、釐清學習弱點，並建立穩定解題思路的學生",
    profileCta: "認識老師",
  },
  {
    slug: "HSU-Hsi",
    featureTags: ["語境理解", "聽說讀寫", "應考策略"] as const,
    statement:
      "比起記住更多單字與文法，我更希望學生知道：英文在不同語境裡，是怎麼被理解與使用的",
    body: "課堂上重視聽、說、讀、寫能力的整合，不把單字與文法拆成一條條需要死記的規則，而是帶著學生從語境中理解英文，逐步建立語感，也學會將所學運用在閱讀、表達與考試之中",
    suitableFor:
      "適合希望建立英文基礎與語感，同時提升閱讀、表達與應考能力的學生",
    profileCta: "認識老師",
  },
] as const;

export const teachersSelection = {
  id: "how-we-select",
  titleLine1: "一位老師正式授課以前",
  titleLine2: "還要經過這些事",
  steps: [
    {
      number: "01",
      title: "履歷與背景審核",
      description:
        "了解教師的教學經驗、專業背景與授課經歷，確認是否符合品識的基本師資條件",
    },
    {
      number: "02",
      title: "學科專業評估",
      description:
        "教得清楚以前，自己必須先真正理解；我們會從學科知識與觀念掌握，了解教師是否具備足夠的專業基礎",
    },
    {
      number: "03",
      title: "試教與表達評估",
      description:
        "自己理解是一件事，能不能讓學生理解，是另一件事；透過實際試教，觀察教師如何拆解觀念、引導思考，以及在學生聽不懂時，能不能換一種方式重新說明",
    },
    {
      number: "04",
      title: "教學理念與師培",
      description:
        "除了怎麼教，我們也在意老師怎麼看待學生與學習；透過交流與師培，逐步建立共同的教學理念與品質標準，同時保留每位老師自己的教學特色",
    },
    {
      number: "05",
      title: "正式授課與持續成長",
      description:
        "正式開始授課，不代表培訓就此結束；我們會持續關注課堂與學生的學習狀況，透過回饋、交流與教學調整，讓老師與學生一起成長",
    },
  ],
  closingTitle: "好的老師，不只經過選擇，也在每一堂課裡持續成長",
} as const;

export const teachersFit = {
  title: "在開始上課以前，我們想先了解孩子",
  paragraphs: [
    "每個孩子遇到的學習問題都不一樣",
    "有人需要重新打好基礎，有人已經理解觀念，卻在題型變化時不知道如何運用；也有人真正需要調整的，不只是某一個章節，而是學習的方法與節奏",
    "因此，在正式開始課程以前，我們會先了解學生目前的程度、學習狀況與目標，再一起確認現階段適合的課程安排與學習方向",
  ],
  highlight: "適合，比急著開始更重要",
  closing:
    "如果目前的課程或師資並不符合學生的需要，我們也會如實說明；因為比起多安排一堂課，我們更在意這堂課是否真的能為孩子帶來幫助",
  ctaLabel: "預約學習評估",
} as const;

export const teachersTeamBridge = {
  titleLine1: "一堂課有老師負責",
  titleLine2: "一段學習有團隊陪伴",
  paragraphs: [
    "授課老師負責課堂上的觀念理解與知識建構，但我們知道，真正的學習不只發生在上課的 50 分鐘",
    "課後遇到不會的題目、複習時重新卡住，或是在學習過程中需要有人持續關心與提醒，都是學習的一部分",
    "因此，品識透過不同角色共同參與，從正式授課、課後解題到學習陪伴，讓學生在離開課堂之後，遇到問題也知道可以找誰",
  ],
  rolesLine: "授課老師 × 解題老師 × 輔導老師",
  focusLine: "教懂 × 解惑 × 陪伴",
  primaryCta: "了解三師共學制度",
  primaryHref: "/team",
  secondaryCta: "看看學生成長故事",
  secondaryHref: "/student-success",
} as const;

export const teachersGrowth = {
  titleLine1: "我們還在尋找",
  titleLine2: "下一位一起把教學做好的老師",
  paragraphs: [
    "品識學苑的師資團隊仍在持續成長",
    "比起快速增加師資人數，我們更希望遇見認同相同教育理念、願意理解學生，也願意持續精進教學的老師",
    "因為我們相信，一位好的老師不只是加入一個團隊，更會參與一個孩子的學習歷程",
  ],
  highlight: "我們期待找到的，不只是更多老師，而是更多願意一起把教育做好的夥伴",
  ctaLabel: "成為品識老師",
  ctaHref: "/teacher-recruitment",
} as const;

export const teachersFinalCta = {
  titleLine1: "找到適合孩子的學習方式",
  titleLine2: "比急著開始上課更重要",
  paragraphs: [
    "不知道該選什麼課、或還不確定孩子卡在哪，都可以先從了解目前的學習狀況開始",
  ],
  secondaryLabel: "了解品識學苑",
  secondaryHref: "/about",
} as const;
