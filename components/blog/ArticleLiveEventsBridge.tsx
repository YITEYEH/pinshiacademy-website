"use client";

import Link from "next/link";
import { Radio } from "lucide-react";
import { trackInternalNavClick } from "@/lib/analytics";

export type ArticleLiveEventItem = {
  id: string;
  title: string;
  href: string;
  dateLabel: string;
};

type Props = {
  events: ArticleLiveEventItem[];
};

export function ArticleLiveEventsBridge({ events }: Props) {
  if (events.length === 0) return null;

  return (
    <aside
      aria-label="近期直播公開課"
      className="mt-10 max-w-[42rem] mx-auto rounded-xl border border-border bg-[#f7f9f7] p-5"
    >
      <div className="mb-3 flex items-center gap-2">
        <Radio className="h-4 w-4 text-primary" aria-hidden />
        <h2 className="text-base font-bold text-foreground">
          想先體驗上課氛圍？近期免費直播
        </h2>
      </div>
      <ul className="space-y-2">
        {events.map((event) => (
          <li key={event.id}>
            <a
              href={event.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackInternalNavClick(
                  `blog_article_live_${event.id}`,
                  event.href,
                )
              }
              className="block rounded-lg border border-border bg-white px-3 py-2.5 transition-colors hover:border-primary/30"
            >
              <p className="text-sm font-medium text-foreground leading-snug">
                {event.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {event.dateLabel}
              </p>
            </a>
          </li>
        ))}
      </ul>
      <Link
        href="/live-events"
        onClick={() =>
          trackInternalNavClick("blog_article_nav_live_events", "/live-events")
        }
        className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
      >
        查看全部直播公開課 →
      </Link>
    </aside>
  );
}
