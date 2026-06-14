import Link from "next/link";
import { LandingPageShell } from "@/components/landing/LandingPageShell";

export function SeniorHighClient() {
  return (
    <LandingPageShell
      title="高中升學輔導"
      subtitle="針對學測與分科測驗，提供系統化觀念建立與解題訓練，協助高中生穩定提升。"
    >
      <h2>高中升學的關鍵挑戰</h2>
      <p>
        進入高中後，課程深度與廣度同步增加，許多學生第一次感受到「明明很努力，成績卻停滯不前」。這往往不只是題目變難，而是<strong>學習方法沒有跟上</strong>——仍用國中的背誦模式應對需要邏輯整合的高中內容。
      </p>
      <h2>學測 vs 分科測驗</h2>
      <p>
        <strong>學測</strong>著重各科基礎能力與素養，是多数大學申請的重要門檻。<strong>分科測驗</strong>則深入檢測特定科目的專業程度，對理工、醫學等科系尤其關鍵。品識學苑協助學生依目標校系，規劃學測與分科的準備節奏。
      </p>
      <h2>我們的教學方式</h2>
      <ul>
        <li>先建立完整觀念，再進入題型訓練</li>
        <li>整理錯題與弱點，避免重複犯錯</li>
        <li>依學生程度調整進度，不統一趕課</li>
        <li>線上即時互動，老師能立即解答疑問</li>
      </ul>
      <h2>五科支援</h2>
      <p>
        國文、英文、數學、自然、社會皆有專業師資。您可以依弱科加強，或多科搭配建立完整升學準備。詳見{" "}
        <Link href="/courses" className="text-primary hover:underline">
          完整課程介紹
        </Link>
        。
      </p>
      <h2>相關資源</h2>
      <p>
        歡迎瀏覽我們的{" "}
        <Link href="/blog" className="text-primary hover:underline">
          學習專欄
        </Link>
        ，閱讀學測、分科測驗與各科讀書策略文章；常見問題請見{" "}
        <Link href="/faq" className="text-primary hover:underline">
          FAQ
        </Link>
        。
      </p>
    </LandingPageShell>
  );
}
