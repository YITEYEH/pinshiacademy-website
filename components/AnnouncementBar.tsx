import { Trophy } from "lucide-react";
import { SITE_ANNOUNCEMENT } from "@/lib/site-announcement";

export function AnnouncementBar() {
  if (!SITE_ANNOUNCEMENT.enabled) return null;

  const { badge, highlights } = SITE_ANNOUNCEMENT;

  return (
    <aside
      aria-label="最新喜報"
      className="relative overflow-hidden border-b border-primary/10 bg-[#e8f5ee]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/[0.06] via-transparent to-primary/[0.06]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-10 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-primary/10 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-primary/10 blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/25">
              <Trophy className="h-5 w-5 text-white" aria-hidden />
            </div>
            <div className="text-left leading-tight">
              <p className="text-sm font-bold text-foreground sm:text-base">
                恭喜學員 · {badge}
              </p>
            </div>
          </div>

          <div className="w-full max-w-2xl rounded-2xl border border-white/90 bg-white/95 p-1 shadow-sm backdrop-blur-sm sm:w-auto sm:max-w-none">
            <ul className="grid grid-cols-3 divide-x divide-primary/10">
              {highlights.map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col items-center justify-center px-3 py-2 text-center sm:px-5 sm:py-2.5"
                >
                  <span className="text-xl font-bold tabular-nums leading-none text-primary sm:text-2xl">
                    {item.value}
                  </span>
                  <span className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
