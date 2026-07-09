export function scrollToTop() {
  if (typeof window === "undefined") return;

  const scroll = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  scroll();
  requestAnimationFrame(() => {
    scroll();
    requestAnimationFrame(scroll);
  });
}

/** 路由或分頁切換後，延遲重試以覆蓋 iOS 與動態內容載入造成的捲動偏移 */
export function scheduleScrollToTop() {
  scrollToTop();
  window.setTimeout(scrollToTop, 0);
  window.setTimeout(scrollToTop, 100);
  window.setTimeout(scrollToTop, 300);
}
