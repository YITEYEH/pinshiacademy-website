"use client";

import dynamic from "next/dynamic";

const ExitIntentLinePopup = dynamic(
  () =>
    import("@/components/ExitIntentLinePopup").then((m) => m.ExitIntentLinePopup),
  { ssr: false },
);

const WebMcpTools = dynamic(
  () => import("@/components/WebMcpTools").then((m) => m.WebMcpTools),
  { ssr: false },
);

/** 非首屏互動／工具：客戶端延遲載入，不佔初始 JS */
export function DeferredClientWidgets() {
  return (
    <>
      <WebMcpTools />
      <ExitIntentLinePopup />
    </>
  );
}
