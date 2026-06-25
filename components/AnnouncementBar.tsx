import { Sparkles } from "lucide-react";
import { SITE_ANNOUNCEMENT } from "@/lib/site-announcement";

export function AnnouncementBar() {
  if (!SITE_ANNOUNCEMENT.enabled) return null;

  const { badge, highlights } = SITE_ANNOUNCEMENT;

  return (
    <aside
      aria-label="最新喜報"
      className="bg-gradient-to-r from-[#dff3e8] via-[#ecf8f1] to-[#dff3e8] border-b border-primary/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5 text-sm">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-sm shrink-0">
            <Sparkles className="w-3.5 h-3.5" aria-hidden />
            <span>恭喜 · {badge}</span>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-2">
            {highlights.map((item) => (
              <li
                key={item.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-white/90 px-3 py-1 shadow-sm"
              >
                <span className="text-base font-bold leading-none text-primary">
                  {item.value}
                </span>
                <span className="text-foreground/75">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
