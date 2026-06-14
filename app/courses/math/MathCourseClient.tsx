import Link from "next/link";
import { LandingPageShell } from "@/components/landing/LandingPageShell";
import { LINE_LINKS } from "@/lib/line-links";

export function MathCourseClient() {
  return (
    <LandingPageShell
      title="數學課程"
      subtitle="從國中基礎到高中進階，建立邏輯思維，讓數學不再是壓力來源。"
      lineHref={LINE_LINKS.stem}
      ctaLabel="預約數學學習諮詢"
      analyticsLabel="landing_math_line_consult"
    >
      <h2>為什麼高中數學特別容易卡住？</h2>
      <p>
        高中數學與國中最大的差異，在於不再只是計算，而是需要<strong>邏輯推理、觀念整合與跨章節應用</strong>。許多學生國中成績不錯，到了高中卻開始跟不上，往往是基礎觀念與解題思路沒有真正建立。
      </p>
      <h2>品識學苑數學課程特色</h2>
      <ul>
        <li>理解公式背後的邏輯，而非死記步驟</li>
        <li>從錯題找出觀念漏洞，對症加強</li>
        <li>依程度調整進度，小班制確保被照顧到</li>
        <li>線上即時互動，隨時發問、立即澄清</li>
      </ul>
      <h2>適用對象</h2>
      <p>
        國中會考數學衝刺、高一基礎建立、高二觀念整合、高三學測與分科數學準備，皆可依需求規劃。若您正在搜尋「高中數學補習」或「線上數學家教」，歡迎先預約免費諮詢，了解目前程度與適合的學習方向。
      </p>
      <h2>師資介紹</h2>
      <p>
        葉以德老師專精國中與高中數學，強調邏輯思維與解題策略。詳見{" "}
        <Link href="/teachers" className="text-primary hover:underline">
          師資團隊
        </Link>
        。
      </p>
      <h2>延伸閱讀</h2>
      <p>
        學習專欄有多篇高中數學讀書方法與升學攻略，歡迎至{" "}
        <Link href="/blog" className="text-primary hover:underline">
          學習專欄
        </Link>
        瀏覽。
      </p>
    </LandingPageShell>
  );
}
