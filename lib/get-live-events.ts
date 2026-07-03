import type { TeachifyEvent } from "@/content/teachify-events";
import { fetchTeachifyEvents } from "@/lib/fetch-teachify-events";
import { fetchTeachifyOgImage } from "@/lib/teachify-og-image";

export type LiveEventView = TeachifyEvent & {
  coverImageUrl?: string;
};

export async function getLiveEvents(): Promise<LiveEventView[]> {
  const events = await fetchTeachifyEvents();

  return Promise.all(
    events.map(async (event) => {
      const coverImageUrl =
        event.coverImageUrl ?? (await fetchTeachifyOgImage(event.eventUrl));
      return { ...event, coverImageUrl };
    }),
  );
}
