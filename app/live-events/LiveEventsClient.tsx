"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Radio,
  Users,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LineCtaButton } from "@/components/LineCtaButton";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
import { LINE_LINKS } from "@/lib/line-links";
import {
  teachifyEventUrl,
  teachifyEventsIndexUrl,
} from "@/content/teachify-events";
import type { LiveEventView } from "@/lib/get-live-events";
import {
  eventStatusLabel,
  formatEventSchedule,
} from "@/lib/format-event-schedule";

type Props = {
  events: LiveEventView[];
};

const faqItems = [
  {
    q: "報名要在官網還是課程平台？",
    a: "本頁提供活動資訊與介紹，點選「免費報名」後，將前往品識學苑官方課程平台完成報名活動開始前，可於課程平台進入直播教室",
  },
  {
    q: "直播公開課與線上預錄課程有什麼不同？",
    a: "直播公開課於固定時段由老師即時授課，可與老師互動、提問，適合體驗課程或針對特定主題學習；線上預錄課程則可依照自己的步調隨時觀看、反覆複習，適合自主學習與考前加強可依學習需求選擇，也能搭配使用",
  },
  {
    q: "錯過直播還能觀看嗎？",
    a: "是否提供直播回放將依各場活動安排而定，請參閱活動頁面說明若有提供回放，將依活動規則於課程平台觀看",
  },
];

function EventCard({ event }: { event: LiveEventView }) {
  const registerHref = teachifyEventUrl(event.eventUrl);
  const { dateLabel, timeLabel } = formatEventSchedule(
    event.startsAt,
    event.endsAt,
  );
  const statusLabel = eventStatusLabel(event.status);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md">
      <a
        href={registerHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group/cover relative block aspect-[1731/909] w-full overflow-hidden bg-[#e8f5ee]"
      >
        {event.coverImageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={event.coverImageUrl}
            alt={event.title}
            className="h-full w-full object-contain object-center transition-transform duration-500 group-hover/cover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-[#1a5535]">
            <Radio className="h-12 w-12 text-white/30" aria-hidden />
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
          aria-hidden
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {event.badge && (
            <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              {event.badge}
            </span>
          )}
          <span className="rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold text-foreground shadow-sm">
            {statusLabel}
          </span>
        </div>
      </a>

      <div className="flex flex-1 flex-col p-4">
        <p className="line-clamp-1 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{event.host.name}</span>
          {event.category ? ` · ${event.category}` : ""}
        </p>

        <h2 className="mt-1.5 line-clamp-2 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {event.title}
        </h2>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {event.subtitle}
        </p>

        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <li className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            {dateLabel}
          </li>
          <li className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            {timeLabel}
          </li>
        </ul>

        <div className="mt-auto border-t border-border pt-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-lg font-bold text-primary">{event.priceLabel}</span>
            {event.tags[0] && (
              <span className="rounded-md bg-[#f7f9f7] px-2 py-0.5 text-[10px] text-muted-foreground">
                #{event.tags[0]}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="mt-3 w-full bg-primary hover:bg-primary/90"
            asChild
          >
            <ExternalLinkOnce
              href={registerHref}
              newTab
              analyticsLabel={`live_event_${event.id}`}
            >
              {event.priceLabel === "免費" ? "免費報名" : "立即報名"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </ExternalLinkOnce>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function LiveEventsClient({ events }: Props) {
  const eventsIndexHref = teachifyEventsIndexUrl();
  const upcoming = events.filter((e) => e.status !== "ended");
  const past = events.filter((e) => e.status === "ended");

  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-[#e8f5ee] to-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-1.5 text-sm text-primary">
            <Radio className="h-4 w-4" aria-hidden />
            直播公開課
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            跟著老師即時學習，把每個關鍵觀念真正搞懂
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            品識學苑定期舉辦免費講座、公開課程與主題直播，透過即時互動與重點講解，陪伴你建立扎實觀念近期場次可於本頁查看，報名後即可前往課程平台參與直播
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <ExternalLinkOnce
                href={eventsIndexHref}
                newTab
                analyticsLabel="live_events_all_teachify"
              >
                查看全部活動
                <ArrowRight className="ml-2 h-5 w-5" />
              </ExternalLinkOnce>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/online-courses">線上預錄課程</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="upcoming-events" className="bg-[#f7f9f7] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
              近期場次
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              點選課程卡片即可前往課程平台查看詳情與報名
            </p>
          </div>

          {upcoming.length > 0 ? (
            <div
              className={
                upcoming.length === 1
                  ? "mx-auto max-w-xs sm:max-w-sm"
                  : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              }
            >
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              目前沒有即將舉行的場次，歡迎至{" "}
              <a
                href={eventsIndexHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Teachify 活動頁
              </a>{" "}
              查看最新公告
            </p>
          )}

          {past.length > 0 && (
            <div className="mt-16">
              <h3 className="mb-6 text-center text-lg font-semibold text-foreground">
                過往場次
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {past.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-border bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-foreground">
            三種學習方式，找到最適合你的學習模式
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:items-stretch">
            <div className="flex h-full flex-col rounded-xl border border-border bg-[#f7f9f7] p-5 text-left">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Radio className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">直播公開課</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                固定時段直播，由老師即時講解重點觀念，適合想體驗課程、掌握特定主題或考前快速衝刺的學生
              </p>
              <a
                href="#upcoming-events"
                className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
              >
                查看近期場次 →
              </a>
            </div>
            <div className="flex h-full flex-col rounded-xl border border-border bg-[#f7f9f7] p-5 text-left">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Video className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">線上預錄課程</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                依照自己的步調學習，隨時觀看、反覆複習，適合自主學習、課後複習與考前加強
              </p>
              <Link
                href="/online-courses"
                className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
              >
                瀏覽預錄課程 →
              </Link>
            </div>
            <div className="flex h-full flex-col rounded-xl border border-border bg-[#f7f9f7] p-5 text-left">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">直播一對一／小班輔導</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                老師即時互動、個別化教學，依學生程度安排學習進度，適合希望建立扎實觀念、長期穩定提升成績的學生
              </p>
              <Link
                href="/courses"
                className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
              >
                了解輔導課程 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-foreground">
            常見問題
          </h2>
          <Accordion type="single" collapsible className="mt-10 space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.q}
                value={`faq-${index}`}
                className="rounded-xl border border-border bg-[#f7f9f7] px-6 border-none"
              >
                <AccordionTrigger className="py-5 text-left hover:no-underline">
                  <span className="pr-4 font-semibold text-foreground">
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-[#1a4d2e] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            想長期規劃學習，而不只聽一場講座？
          </h2>
          <p className="mt-4 text-white/85">
            歡迎預約免費諮詢，我們依孩子程度協助規劃適合的課程組合
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LineCtaButton
              href={LINE_LINKS.consult}
              analyticsLabel="live_events_line_consult"
              label={LINE_CTA_LABELS.liveEvents}
              variant="inverse"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
