/** 全站 Navbar 下方喜報列；設 enabled: false 即可關閉 */
export const SITE_ANNOUNCEMENT = {
  enabled: true,
  badge: "115 國中會考",
  highlights: [
    { value: "8 位", label: "總分 30 以上" },
    { value: "1 位", label: "數學滿分" },
    { value: "5 位", label: "數學 A++" },
  ],
} as const;
