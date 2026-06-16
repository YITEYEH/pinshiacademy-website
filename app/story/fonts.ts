import { LXGW_WenKai_TC } from "next/font/google";

/**
 * 創辦人署名用行楷字體（霞鶩文楷 TC），支援繁體「葉以德」。
 * 志芒行等簡體行書字體不含「葉」，會退回系統字而顯得怪異。
 */
export const founderSignatureFont = LXGW_WenKai_TC({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
