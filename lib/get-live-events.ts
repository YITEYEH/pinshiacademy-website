import {
  TEACHIFY_EVENTS,
  type TeachifyEvent,
} from "@/content/teachify-events";
import { fetchTeachifyOgImage } from "@/lib/teachify-og-image";

export type LiveEventView = TeachifyEvent & {
  coverImageUrl?: string;
};

export async function getLiveEvents(): Promise<LiveEventView[]> {
  const events = await Promise.all(
    TEACHIFY_EVENTS.map(async (event) => {
      const coverImageUrl =
        event.coverImageUrl ?? (await fetchTeachifyOgImage(event.eventUrl));
      return { ...event, coverImageUrl };
    }),
  );

  return events.sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );
}
