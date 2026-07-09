import { TEACHIFY_PLATFORM_URL } from "@/content/teachify-courses";

export type TeachifyEventStatus = "scheduled" | "ended" | "live";

export type TeachifyEvent = {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  /** Teachify 活動報名頁 URL */
  eventUrl: string;
  /** 可手動指定；未填則由伺服器從 Teachify 抓取 */
  coverImageUrl?: string;
  /** ISO 8601（UTC） */
  startsAt: string;
  endsAt: string;
  status: TeachifyEventStatus;
  host: { name: string; role?: string };
  tags: string[];
  category?: string;
  priceLabel: string;
  badge?: string;
};

/** 依 Teachify slug 覆寫自動抓取的欄位（選用） */
export type TeachifyEventOverride = Partial<
  Pick<
    TeachifyEvent,
    | "subtitle"
    | "description"
    | "coverImageUrl"
    | "host"
    | "tags"
    | "category"
    | "badge"
  >
>;

export const TEACHIFY_EVENTS_URL = `${TEACHIFY_PLATFORM_URL}/events`;

/**
 * 選用：針對特定場次微調文案。未列出的活動會完全依 Teachify 自動同步。
 */
export const TEACHIFY_EVENT_OVERRIDES: Record<string, TeachifyEventOverride> = {
  "preparatory-lectures-for-grade-11-exponential-and-logarithmic": {
    subtitle: "銜接高中數學的關鍵觀念，提前掌握指數與對數核心題型",
    description:
      "適合即將升高的國三／高一學生，由葉以德老師直播講解指數律、對數律與常見題型，幫助開學後更快進入狀況。",
    host: { name: "葉以德", role: "品識學苑創辦人／資深數學授課師" },
  },
  "lecture-on-polynomial-functions": {
    subtitle: "銜接高中數學的關鍵單元，掌握多項式函數圖形與常見題型",
    description:
      "適合即將升高的國三／高一學生，由葉以德老師直播講解多項式函數概念、圖形變化與常見考題，幫助開學後更快進入狀況。",
    host: { name: "葉以德", role: "品識學苑創辦人／資深數學授課師" },
  },
  "lines-and-circles": {
    subtitle: "銜接高中數學的關鍵觀念，提前掌握直線與圓的核心題型",
    description:
      "適合即將升高的國三／高一學生，由葉以德老師直播講解直線與圓的方程式、圖形關係與常見題型，幫助開學後更快進入狀況。",
    host: { name: "葉以德", role: "品識學苑創辦人／資深數學授課師" },
  },
  "dfda9637-e0a1-458e-9d54-e24c5fc9fcb6": {
    subtitle:
      "聚焦115會考數學歷屆試題，掌握高分解題策略與常見題型",
    host: { name: "葉學貞", role: "教學設計師（數學組）" },
    tags: ["會考", "國三總複習"],
  },
  "high-school-chinese-open-class": {
    subtitle:
      "用結構化解讀帶你真正讀懂古文，掌握〈勸和論〉重點與說理脈絡",
    description:
      "適合想突破古文閱讀的國中、高中學生，由蔣季芹老師直播講解〈勸和論〉篇章結構、重點字詞與作者用意，建立有系統的文言文理解方法。",
    host: { name: "蔣季芹", role: "品識學苑國文教師" },
    tags: ["古文", "閱讀理解"],
    category: "高中系列講座",
  },
  "548707d1-5cb8-4c9f-9587-bb37ead06c2c": {
    subtitle:
      "從歷史背景到文章精華，一堂課讀懂〈鴻門宴〉的關鍵轉折",
    description:
      "適合想提升古文閱讀與典故理解的學生，由蔣季芹老師直播解析〈鴻門宴〉的歷史脈絡、人物關係與文章重點，培養深度閱讀能力。",
    host: { name: "蔣季芹", role: "品識學苑國文教師" },
    tags: ["古文", "典故"],
    category: "高中系列講座",
  },
};

export function teachifyEventUrl(
  eventUrl: string,
  campaign = "live_events",
): string {
  const url = new URL(eventUrl);
  url.searchParams.set("utm_source", "pinshiacademy");
  url.searchParams.set("utm_medium", campaign);
  return url.toString();
}

export function teachifyEventsIndexUrl(campaign = "live_events"): string {
  const url = new URL(TEACHIFY_EVENTS_URL);
  url.searchParams.set("utm_source", "pinshiacademy");
  url.searchParams.set("utm_medium", campaign);
  return url.toString();
}
