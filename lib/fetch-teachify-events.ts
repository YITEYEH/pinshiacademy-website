import "server-only";

import {
  TEACHIFY_EVENTS_URL,
  TEACHIFY_EVENT_OVERRIDES,
  type TeachifyEvent,
  type TeachifyEventOverride,
  type TeachifyEventStatus,
} from "@/content/teachify-events";
import { TEACHIFY_PLATFORM_URL } from "@/content/teachify-courses";
import {
  extractFlightLecturerName,
  extractFlightObjectBySlug,
  extractFlightObjectsByTypename,
  fetchTeachifyHtml,
  getSessionEventRefs,
  parseTeachifyNextData,
  resolveApolloRef,
  type TeachifyApolloState,
} from "@/lib/teachify-next-data";

type ApolloEvent = {
  __typename: "Event";
  id: string;
  name: string;
  slug: string;
  coverPhoto?: string;
  startedAt: string;
  endedAt: string;
  description?: string;
  lecturers?: ApolloRef[];
  tickets?: ApolloRef[] | FlightTicket[];
};

type ApolloLecturer = {
  __typename: "Lecturer";
  name: string;
  headline?: string;
};

type FlightTicket = {
  amount: number;
  currencySymbol?: string;
};

type FlightEvent = {
  __typename?: "Event";
  id?: string;
  name: string;
  slug: string;
  coverPhoto?: string;
  startedAt: string | number;
  endedAt: string | number;
  description?: string;
  lecturers?: ApolloLecturer[];
  tickets?: FlightTicket[];
};

type ApolloRef = { __ref: string };

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function displayHostName(name: string): string {
  return name.replace(/（[^）]*）/g, "").trim();
}

function unixToIso(unix: string | number): string {
  const seconds = typeof unix === "string" ? Number(unix) : unix;
  return new Date(seconds * 1000).toISOString();
}

function eventStatus(startsAt: string, endsAt: string): TeachifyEventStatus {
  const now = Date.now();
  const start = new Date(startsAt).getTime();
  const end = new Date(endsAt).getTime();

  if (end < now) return "ended";
  if (start <= now && now <= end) return "live";
  return "scheduled";
}

function formatPriceLabel(tickets: FlightTicket[]): string {
  if (tickets.length === 0) return "洽詢";
  const minAmount = Math.min(...tickets.map((ticket) => ticket.amount));
  if (minAmount <= 0) return "免費";
  return `NT$${minAmount.toLocaleString("zh-TW")}`;
}

function inferCategory(title: string): string | undefined {
  if (/高一|高二|高三|高中|學測|分科/.test(title)) return "高中系列講座";
  if (/國[一二三]|會考|國中/.test(title)) return "國中系列講座";
  if (/國小/.test(title)) return "國小系列講座";
  return undefined;
}

function inferTags(title: string): string[] {
  if (title.includes("高一先修")) return ["高一先修"];
  if (title.includes("會考")) return ["會考"];
  if (title.includes("學測")) return ["學測"];
  return [];
}

function inferSubtitle(title: string): string {
  const bookTopic = title.match(/〈([^〉]+)〉/)?.[1];
  const topic = title.match(/（([^）]+)）/)?.[1];

  if (bookTopic && /古文|讀懂|國文|文言|一堂課/.test(title)) {
    return `用結構化解讀帶你真正讀懂古文，掌握〈${bookTopic}〉重點與作者用意`;
  }
  if (title.includes("先修") && topic) {
    return `銜接高中數學的關鍵單元，掌握${topic}核心題型`;
  }
  if (title.includes("先修")) {
    return "銜接高中數學的關鍵單元，提前打好基礎";
  }
  if (title.includes("會考") || title.includes("總複習")) {
    return "聚焦會考重點題型與解題策略，掌握歷屆試題解題關鍵";
  }
  return "品識學苑直播公開課，歡迎報名參與";
}

function buildSubtitle(title: string, plainDescription: string): string {
  if (plainDescription) {
    const firstSentence = plainDescription.split(/[！？\n]/)[0]?.trim();
    if (firstSentence && firstSentence.length >= 12) {
      return firstSentence.length > 80
        ? `${firstSentence.slice(0, 77)}…`
        : firstSentence;
    }
  }
  return inferSubtitle(title);
}

function resolveTickets(
  state: TeachifyApolloState,
  refs: ApolloRef[] | FlightTicket[] | undefined,
): FlightTicket[] {
  if (!refs || refs.length === 0) return [];
  if (!("__ref" in refs[0])) return refs as FlightTicket[];
  return (refs as ApolloRef[])
    .map((ref) => resolveApolloRef<FlightTicket>(state, ref))
    .filter((ticket): ticket is FlightTicket => ticket !== null);
}

function resolveLecturers(
  state: TeachifyApolloState,
  refs: ApolloRef[] | undefined,
): ApolloLecturer[] {
  if (!refs) return [];
  return refs
    .map((ref) => resolveApolloRef<ApolloLecturer>(state, ref))
    .filter((lecturer): lecturer is ApolloLecturer => lecturer !== null);
}

function applyOverride(
  event: TeachifyEvent,
  override?: TeachifyEventOverride,
): TeachifyEvent {
  if (!override) return event;
  return {
    ...event,
    ...override,
    host: override.host ? { ...event.host, ...override.host } : event.host,
    tags: override.tags ?? event.tags,
  };
}

function mapEvent(
  event: FlightEvent,
  lecturers: ApolloLecturer[],
  tickets: FlightTicket[],
): TeachifyEvent {
  const startsAt = unixToIso(event.startedAt);
  const endsAt = unixToIso(event.endedAt);
  const title = event.name;
  const rawDescription = event.description;
  const plainDescription =
    rawDescription && !rawDescription.startsWith("$")
      ? stripHtml(rawDescription)
      : "";
  const primaryLecturer = lecturers[0];

  const base: TeachifyEvent = {
    id: event.slug,
    title,
    subtitle: buildSubtitle(title, plainDescription),
    description: plainDescription || undefined,
    eventUrl: `${TEACHIFY_PLATFORM_URL}/events/${event.slug}`,
    coverImageUrl: event.coverPhoto,
    startsAt,
    endsAt,
    status: eventStatus(startsAt, endsAt),
    host: {
      name: displayHostName(primaryLecturer?.name ?? "品識學苑"),
      role: primaryLecturer?.headline,
    },
    tags: inferTags(title),
    category: inferCategory(title),
    priceLabel: formatPriceLabel(tickets),
    badge: "直播",
  };

  return applyOverride(base, TEACHIFY_EVENT_OVERRIDES[event.slug]);
}

function mapApolloEvent(
  summary: ApolloEvent,
  detail: ApolloEvent | null,
  state: TeachifyApolloState,
): TeachifyEvent {
  const event = detail ?? summary;
  return mapEvent(
    {
      name: event.name,
      slug: event.slug,
      coverPhoto: event.coverPhoto,
      startedAt: event.startedAt,
      endedAt: event.endedAt,
      description: event.description,
    },
    resolveLecturers(state, Array.isArray(event.lecturers) && event.lecturers[0] && "__ref" in event.lecturers[0]
      ? (event.lecturers as ApolloRef[])
      : undefined),
    resolveTickets(state, event.tickets),
  );
}

async function fetchEventDetail(slug: string): Promise<{
  event: ApolloEvent | null;
  state: TeachifyApolloState | null;
}> {
  const html = await fetchTeachifyHtml(`${TEACHIFY_PLATFORM_URL}/events/${slug}`);
  if (!html) return { event: null, state: null };

  const state = parseTeachifyNextData(html);
  if (!state) return { event: null, state: null };

  const eventEntry = Object.entries(state).find(([key, value]) => {
    return key.startsWith("Event:") && value.slug === slug;
  });

  return {
    event: (eventEntry?.[1] as ApolloEvent | undefined) ?? null,
    state,
  };
}

async function fetchFlightEventDetail(slug: string): Promise<FlightEvent | null> {
  const html = await fetchTeachifyHtml(`${TEACHIFY_PLATFORM_URL}/events/${slug}`);
  if (!html) return null;

  const parsed = extractFlightObjectBySlug<FlightEvent>(
    html,
    slug,
    (value) =>
      value.slug === slug &&
      (Array.isArray(value.lecturers) || Boolean(value.coverPhoto)),
  );
  const lecturerName = extractFlightLecturerName(html);
  const lecturers =
    parsed?.lecturers?.length
      ? parsed.lecturers
      : lecturerName
        ? [{ __typename: "Lecturer" as const, name: lecturerName }]
        : undefined;

  if (!parsed && !lecturers) return null;

  return {
    name: parsed?.name ?? "",
    slug,
    coverPhoto: parsed?.coverPhoto,
    startedAt: parsed?.startedAt ?? 0,
    endedAt: parsed?.endedAt ?? 0,
    description: parsed?.description,
    tickets: parsed?.tickets,
    lecturers,
  };
}

async function fetchTeachifyEventsFromApollo(
  html: string,
): Promise<TeachifyEvent[]> {
  const listState = parseTeachifyNextData(html);
  if (!listState) return [];

  const upcomingRefs = getSessionEventRefs(listState, "upcoming");
  const pastRefs = getSessionEventRefs(listState, "past");
  const allRefs = [...upcomingRefs, ...pastRefs];
  if (allRefs.length === 0) return [];

  const events = await Promise.all(
    allRefs.map(async (ref) => {
      const summary = resolveApolloRef<ApolloEvent>(listState, ref);
      if (!summary) return null;

      const { event: detail, state: detailState } = await fetchEventDetail(
        summary.slug,
      );
      const state = detailState ?? listState;

      return mapApolloEvent(summary, detail, state);
    }),
  );

  return events.filter((event): event is TeachifyEvent => event !== null);
}

async function fetchTeachifyEventsFromFlight(
  html: string,
): Promise<TeachifyEvent[]> {
  const summaries = extractFlightObjectsByTypename<FlightEvent>(html, "Event");
  if (summaries.length === 0) return [];

  const events = await Promise.all(
    summaries.map(async (summary) => {
      const detail = await fetchFlightEventDetail(summary.slug);
      const event = {
        ...summary,
        ...detail,
        name: summary.name,
        slug: summary.slug,
        startedAt: summary.startedAt,
        endedAt: summary.endedAt,
        coverPhoto: detail?.coverPhoto ?? summary.coverPhoto,
        tickets: summary.tickets ?? detail?.tickets,
        lecturers: detail?.lecturers ?? summary.lecturers,
      };
      return mapEvent(event, event.lecturers ?? [], event.tickets ?? []);
    }),
  );

  return events;
}

/** 從 Teachify 活動列表頁自動抓取公開課場次 */
export async function fetchTeachifyEvents(): Promise<TeachifyEvent[]> {
  const html = await fetchTeachifyHtml(TEACHIFY_EVENTS_URL);
  if (!html) return [];

  const apolloEvents = await fetchTeachifyEventsFromApollo(html);
  const events =
    apolloEvents.length > 0
      ? apolloEvents
      : await fetchTeachifyEventsFromFlight(html);

  // 目前沒有場次是正常狀態；僅在開發時提示，避免文章頁被誤報成錯誤
  if (events.length === 0 && process.env.NODE_ENV === "development") {
    console.info(
      "[teachify] no upcoming/past events parsed from list page (empty is OK)",
    );
  }

  return events.sort(
    (a, b) =>
      new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );
}
