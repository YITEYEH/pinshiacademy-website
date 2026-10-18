"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { LineCtaLabel } from "@/components/LineCtaLabel";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { trackEvent, trackLineConsultClick } from "@/lib/analytics";
import {
  EXIT_INTENT_DESKTOP,
  EXIT_INTENT_LINE_HREF,
  EXIT_INTENT_MOBILE,
  getDocumentScrollRatio,
  isExitIntentExcludedPath,
  isExitIntentSuppressed,
  isMobileViewport,
  markExitIntentShownThisSession,
  suppressExitIntentForOneDay,
} from "@/lib/exit-intent";

export function ExitIntentLinePopup() {
  const pathname = usePathname() ?? "/";
  const titleId = useId();
  const descId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const dwellOkRef = useRef(false);
  const scrollOkRef = useRef(false);
  const shownRef = useRef(false);
  const mobileShownRef = useRef(false);

  const dismiss = useCallback(() => {
    suppressExitIntentForOneDay();
    setOpen(false);
  }, []);

  const openPopup = useCallback(
    (trigger: "desktop_exit" | "mobile_engage") => {
      if (shownRef.current || isExitIntentSuppressed()) return;
      if (isExitIntentExcludedPath(pathname)) return;
      if (!dwellOkRef.current || !scrollOkRef.current) return;

      shownRef.current = true;
      markExitIntentShownThisSession();
      setOpen(true);
      trackEvent("exit_intent_popup_open", {
        page_path: pathname,
        trigger,
      });
    },
    [pathname],
  );

  useEffect(() => {
    if (isExitIntentSuppressed() || isExitIntentExcludedPath(pathname)) {
      return;
    }

    const mobile = isMobileViewport();
    const rules = mobile ? EXIT_INTENT_MOBILE : EXIT_INTENT_DESKTOP;

    const armTimer = window.setTimeout(() => {
      dwellOkRef.current = true;
      if (mobile && scrollOkRef.current && !mobileShownRef.current) {
        mobileShownRef.current = true;
        openPopup("mobile_engage");
      }
    }, rules.minDwellMs);

    const syncScroll = () => {
      if (getDocumentScrollRatio() >= rules.minScrollRatio) {
        scrollOkRef.current = true;
        if (mobile && dwellOkRef.current && !mobileShownRef.current) {
          mobileShownRef.current = true;
          openPopup("mobile_engage");
        }
      }
    };

    const onMouseOut = (event: MouseEvent) => {
      if (isMobileViewport()) return;
      if (event.relatedTarget) return;
      if (typeof event.clientY !== "number" || event.clientY > 0) return;
      openPopup("desktop_exit");
    };

    syncScroll();
    window.addEventListener("scroll", syncScroll, { passive: true });
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.clearTimeout(armTimer);
      window.removeEventListener("scroll", syncScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [openPopup, pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
        aria-label="關閉彈窗"
        onClick={dismiss}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative z-[61] w-full max-w-md overflow-hidden rounded-2xl border border-border bg-white shadow-xl"
      >
        <div className="bg-gradient-to-br from-[#e8f5ee] to-white px-5 pb-2 pt-5 sm:px-6 sm:pt-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-5 w-5" aria-hidden />
            </span>
            <button
              ref={closeRef}
              type="button"
              aria-label="關閉"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-white/80 hover:text-foreground"
              onClick={dismiss}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <h2
            id={titleId}
            className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            還不確定孩子適合怎麼學嗎？
          </h2>
          <p
            id={descId}
            className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]"
          >
            從了解孩子目前的學習狀況開始，找出需要加強的地方，再決定是否安排免費試聽
          </p>
        </div>

        <div className="flex flex-col gap-2 px-5 py-5 sm:px-6">
          <Button
            size="lg"
            className="h-12 w-full bg-primary text-base hover:bg-primary/90"
            asChild
          >
            <ExternalLinkOnce
              href={EXIT_INTENT_LINE_HREF}
              analyticsLabel="exit_intent_line_consult"
              onClick={() => {
                trackLineConsultClick("exit_intent");
                dismiss();
              }}
            >
              <LineCtaLabel iconClassName="size-5" label="預約免費試聽" />
            </ExternalLinkOnce>
          </Button>
          <button
            type="button"
            className="h-11 w-full rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-[#f7f9f7] hover:text-foreground"
            onClick={dismiss}
          >
            繼續瀏覽
          </button>
        </div>
      </div>
    </div>
  );
}
