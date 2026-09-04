"use client";

import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { trackLineConsultClick } from "@/lib/analytics";
import { SITE_ANNOUNCEMENT } from "@/lib/site-announcement";

const DISMISS_KEY = "psa_announcement_dismissed";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!SITE_ANNOUNCEMENT.enabled) return;
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      // ignore
    }
    setVisible(true);
  }, []);

  if (!SITE_ANNOUNCEMENT.enabled || !visible) return null;

  const { eyebrow, headline, description, ctaLabel, href } = SITE_ANNOUNCEMENT;

  return (
    <aside
      aria-label="最新公告"
      className="relative border-b border-primary/10 bg-[#e8f5ee]"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-3.5 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5">
          <div className="min-w-0 pr-8 sm:pr-0">
            <p className="text-xs font-medium tracking-wide text-primary">
              {eyebrow}
            </p>
            <p className="mt-0.5 text-base font-bold tracking-tight text-foreground sm:text-lg">
              {headline}
            </p>
            <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
              {description}
            </p>
          </div>

          <ExternalLinkOnce
            href={href}
            analyticsLabel="announcement_bar_line_trial"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            onClick={() => trackLineConsultClick("announcement_bar")}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </ExternalLinkOnce>
        </div>
      </div>

      <button
        type="button"
        aria-label="關閉公告"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-white/60 hover:text-foreground sm:right-4"
        onClick={() => {
          try {
            sessionStorage.setItem(DISMISS_KEY, "1");
          } catch {
            // ignore
          }
          setVisible(false);
        }}
      >
        <X className="h-4 w-4" />
      </button>
    </aside>
  );
}
