import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { teachifyEventUrl } from "@/content/teachify-events";
import { getLiveEvents, type LiveEventView } from "@/lib/get-live-events";
import { LiveEventsClient } from "./LiveEventsClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/live-events",
  title: "免費直播公開課｜會考學測・高一先修｜品識學苑",
  description:
    "想先體驗上課氛圍？查看近期免費／公開直播，含會考複習、學測主題與高一先修線上報名，當天跟著老師一起練",
  titleAbsolute: true,
});

export const revalidate = 3_600;

function buildLiveEventsJsonLd(events: LiveEventView[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "品識學苑直播公開課",
    url: `${SITE.url}/live-events`,
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Event",
        name: event.title,
        description: event.subtitle,
        startDate: event.startsAt,
        endDate: event.endsAt,
        eventStatus:
          event.status === "scheduled"
            ? "https://schema.org/EventScheduled"
            : event.status === "live"
              ? "https://schema.org/EventScheduled"
              : "https://schema.org/EventCancelled",
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        location: {
          "@type": "VirtualLocation",
          url: teachifyEventUrl(event.eventUrl),
        },
        organizer: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
        },
        offers: {
          "@type": "Offer",
          price: event.priceLabel === "免費" ? 0 : undefined,
          priceCurrency: "TWD",
          url: teachifyEventUrl(event.eventUrl),
        },
      },
    })),
  };
}

export default async function LiveEventsPage() {
  const events = await getLiveEvents();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildLiveEventsJsonLd(events)),
        }}
      />
      <LiveEventsClient events={events} />
    </>
  );
}
