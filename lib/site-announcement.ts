import { LINE_LINKS } from "@/lib/line-links";

/** 全站 Navbar 下方公告列；設 enabled: false 即可關閉 */
export const SITE_ANNOUNCEMENT = {
  enabled: true,
  eyebrow: "英文・數學一對一課程",
  headline: "免費試聽開放預約",
  description: "預約免費試聽，先了解孩子卡點，再決定適不適合",
  ctaLabel: "預約免費試聽",
  href: LINE_LINKS.consult,
} as const;
