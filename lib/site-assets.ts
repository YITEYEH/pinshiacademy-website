import { SITE } from "@/lib/site";

/** 預設社群分享圖（1200×630 等比例裁切來源） */
export const DEFAULT_OG_IMAGE_PATH = "/hero-section.jpg";

/** 全站品牌 logo（public/brand/logo.png） */
export const BRAND_LOGO_PATH = "/brand/logo.png";

export const defaultOgImageUrl = () => `${SITE.url}${DEFAULT_OG_IMAGE_PATH}`;

export const brandLogoUrl = () => `${SITE.url}${BRAND_LOGO_PATH}`;
