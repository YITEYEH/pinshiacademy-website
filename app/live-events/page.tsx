import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { teachifyEventUrl } from "@/content/teachify-events";
import { getLiveEvents, type LiveEventView } from "@/lib/get-live-events";
import { LiveEventsClient } from "./LiveEventsClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/live-events",
  title: "直播公開課｜免費講座與先修直播｜品識學苑",
  description:
    "品識學苑直播公開課與講座場次：會考、學測、高一先修等主題，由資深師資即時授課。於官網瀏覽場次，報名與進入直播請至 Teachify 平台。",
  titleAbsolute: true,
});

export const revalidate = 86400;

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
