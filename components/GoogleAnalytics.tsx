"use client";

import { useEffect } from "react";

/**
 * 延後載入 GA：互動後或逾時，避免 Lighthouse 主執行緒被 gtag 阻塞。
 */
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    let loaded = false;
    let timeoutId = 0;
    let idleId = 0;

    const load = () => {
      if (loaded) return;
      loaded = true;

      window.removeEventListener("pointerdown", load);
      window.removeEventListener("keydown", load);
      window.removeEventListener("scroll", load);
      window.clearTimeout(timeoutId);
      const cancelIdle = (
        window as Window & {
          cancelIdleCallback?: (id: number) => void;
        }
      ).cancelIdleCallback;
      if (idleId && cancelIdle) cancelIdle(idleId);

      const gtagScript = document.createElement("script");
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      gtagScript.async = true;
      document.head.appendChild(gtagScript);

      const init = document.createElement("script");
      init.id = "ga4-init";
      init.text = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}', { send_page_view: true });
`;
      document.head.appendChild(init);
    };

    window.addEventListener("pointerdown", load, { once: true, passive: true });
    window.addEventListener("keydown", load, { once: true });
    window.addEventListener("scroll", load, { once: true, passive: true });

    const requestIdle = (
      window as Window & {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout: number },
        ) => number;
      }
    ).requestIdleCallback;

    if (requestIdle) {
      idleId = requestIdle(load, { timeout: 8_000 });
    } else {
      timeoutId = window.setTimeout(load, 8_000);
    }

    return () => {
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("keydown", load);
      window.removeEventListener("scroll", load);
      window.clearTimeout(timeoutId);
      const cancelIdle = (
        window as Window & {
          cancelIdleCallback?: (id: number) => void;
        }
      ).cancelIdleCallback;
      if (idleId && cancelIdle) cancelIdle(idleId);
    };
  }, [measurementId]);

  return null;
}
