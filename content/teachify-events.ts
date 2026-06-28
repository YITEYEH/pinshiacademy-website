import { TEACHIFY_PLATFORM_URL } from "@/content/teachify-courses";

export type TeachifyEventStatus = "scheduled" | "ended" | "live";

export type TeachifyEvent = {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  /** Teachify 活動報名頁 URL */
  eventUrl: string;
  /** 可手動指定；未填則由伺服器從活動頁 og:image 抓取 */
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

export const TEACHIFY_EVENTS_URL = `${TEACHIFY_PLATFORM_URL}/events`;

export const TEACHIFY_EVENTS: TeachifyEvent[] = [
  {
    id: "preparatory-lectures-for-grade-11-exponential-and-logarithmic",
    title: "高一先修講座（指數與對數）",
    subtitle: "銜接高中數學的關鍵觀念，提前掌握指數與對數核心題型",
    description:
      "適合即將升高的國三／高一學生，由葉以德老師直播講解指數律、對數律與常見題型，幫助開學後更快進入狀況。",
    eventUrl:
      "https://pinshiacademy.tw/events/preparatory-lectures-for-grade-11-exponential-and-logarithmic",
    startsAt: "2026-07-12T07:00:00.000Z",
    endsAt: "2026-07-12T09:00:00.000Z",
    status: "scheduled",
    host: { name: "葉以德", role: "品識學苑創辦人／資深數學授課師" },
    tags: ["高一先修"],
    category: "高中系列講座",
    priceLabel: "免費",
    badge: "直播",
  },
];

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
