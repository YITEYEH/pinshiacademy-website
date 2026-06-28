import type { TeachifyEventStatus } from "@/content/teachify-events";

const TZ = "Asia/Taipei";

export function formatEventSchedule(startsAt: string, endsAt: string) {
  const start = new Date(startsAt);
  const end = new Date(endsAt);

  const dateLabel = new Intl.DateTimeFormat("zh-TW", {
    timeZone: TZ,
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(start);

  const timeFmt = new Intl.DateTimeFormat("zh-TW", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return {
    dateLabel,
    timeLabel: `${timeFmt.format(start)} – ${timeFmt.format(end)}`,
  };
}

export function eventStatusLabel(status: TeachifyEventStatus): string {
  switch (status) {
    case "scheduled":
      return "即將舉行";
    case "live":
      return "直播中";
    case "ended":
      return "已結束";
  }
}
