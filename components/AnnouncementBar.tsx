import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_ANNOUNCEMENT } from "@/lib/site-announcement";

export function AnnouncementBar() {
  if (!SITE_ANNOUNCEMENT.enabled) return null;

  const { eyebrow, headline, description, ctaLabel, href } = SITE_ANNOUNCEMENT;

  return (
    <aside
      aria-label="最新公告"
      className="border-b border-primary/10 bg-[#e8f5ee]"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-3.5 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5">
          <div className="min-w-0">
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

          <Link
            href={href}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </aside>
  );
}
