"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { LineCtaLabel } from "@/components/LineCtaLabel";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { trackLineConsultClick } from "@/lib/analytics";
import { LINE_CTA_LABEL } from "@/lib/line-cta";
import { LINE_LINKS } from "@/lib/line-links";

type StickyLineCtaProps = {
  analyticsLabel: string;
  dismissKey: string;
  message?: string;
  label?: string;
  href?: string;
  /** 若提供，額外發送 line_consult_click（cta_location） */
  ctaLocation?: string;
};

export function StickyLineCta({
  analyticsLabel,
  dismissKey,
  message = "不確定適不適合？先預約免費學習評估",
  label = LINE_CTA_LABEL,
  href = LINE_LINKS.consult,
  ctaLocation,
}: StickyLineCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(dismissKey) === "1") return;
    } catch {
      // ignore
    }
    setVisible(true);
  }, [dismissKey]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-3xl items-center gap-3">
        <p className="min-w-0 flex-1 text-sm font-medium leading-snug text-foreground">
          {message}
        </p>
        <Button
          size="sm"
          className="h-11 min-h-11 shrink-0 bg-primary px-4 hover:bg-primary/90"
          asChild
        >
          <ExternalLinkOnce
            href={href}
            analyticsLabel={analyticsLabel}
            onClick={() => {
              if (ctaLocation) trackLineConsultClick(ctaLocation);
            }}
          >
            <LineCtaLabel iconClassName="size-4" label={label} />
          </ExternalLinkOnce>
        </Button>
        <button
          type="button"
          aria-label="關閉"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-[#f7f9f7] hover:text-foreground"
          onClick={() => {
            try {
              sessionStorage.setItem(dismissKey, "1");
            } catch {
              // ignore
            }
            setVisible(false);
          }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
