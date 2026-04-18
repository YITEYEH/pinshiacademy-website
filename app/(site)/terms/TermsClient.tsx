"use client";

import { motion } from "motion/react";

const sections = [
  {
    id: "acceptance",
    title: "服務條款接受",
    content:
      "歡迎使用品識學苑（以下簡稱「本學苑」）的服務。當您註冊成為本學苑的學生或使用本學苑提供的任何服務時，即表示您已閱讀、了解並同意遵守本使用政策的所有條款。如果您不同意本政策的任何內容，請勿使用本學苑的服務。",
  },
  {
    id: "registration",
    title: "註冊與報名",
    content: `1. 報名資格
學生須提供真實、完整的個人資料，包括姓名、就讀學校、年級、聯絡方式等。未成年學生需由法定代理人（家長或監護人）代為報名。

2. 報名流程
完成免費諮詢 → 學習診斷評估 → 確認課程規劃 → 繳費完成報名

3. 資料正確性
您有責任確保提供的資料正確無誤。如因資料錯誤導致的任何問題，本學苑不負相關責任。`,
  },
  {
    id: "fees",
    title: "費用與付款",
    content: `1. 學費計算
學費依據科目、課程時數、班級規模等因素計算。詳細費用資訊請洽詢課程顧問。

2. 付款方式
接受現金、匯款、信用卡付款。可選擇月繳或季繳方案。

3. 退費規定
- 開課前：可全額退費（需扣除行政手續費）
- 開課後未滿1/3期間：退還2/3學費
- 開課後超過1/3但未滿2/3期間：退還1/3學費
- 開課後超過2/3期間：不予退費

4. 遲繳處理
逾期未繳費者，本學苑保留暫停上課權利，直至費用繳清為止。`,
  },
  {
    id: "attendance",
    title: "出席與請假",
    content: `1. 出席規定
學生應準時出席課程。遲到或早退可能影響學習成效。

2. 請假規定
請假需提前至少24小時通知，本學苑將安排補課。臨時請假或缺席恕不補課。

3. 補課安排
補課時間將與家長協調安排，需於課程期間內完成。課程結束後原則上不再安排補課。

4. 長期缺席
連續缺席超過兩週未請假者，本學苑有權取消其上課資格，學費不予退還。`,
  },
  {
    id: "conduct",
    title: "行為規範",
    content: `學生在使用本學苑服務期間，應遵守以下行為規範：

1. 尊重師長與同學，維持良好的學習環境
2. 愛護教室設備與教材，如有損壞需照價賠償
3. 不得從事任何違法或不當行為
4. 遵守教室秩序，不得影響他人學習
5. 不得攜帶危險物品進入教室

違反上述規範者，本學苑有權視情節輕重給予警告或終止服務。`,
  },
  {
    id: "intellectual",
    title: "智慧財產權",
    content: `1. 教材版權
本學苑提供的所有教材、講義、試題等，皆受著作權法保護。未經授權，不得擅自複製、散布或作為商業用途。

2. 課程錄影錄音
未經本學苑及授課教師同意，不得錄影、錄音或以任何方式記錄課程內容。

3. 侵權處理
如有侵害智慧財產權之行為，本學苑將依法追究責任。`,
  },
  {
    id: "liability",
    title: "責任限制",
    content: `1. 服務提供
本學苑盡力提供優質的教學服務，但不保證學生的學習成效或考試成績。學習成果受多種因素影響，需要學生、家長與教師共同努力。

2. 安全責任
學生在教室內的安全由本學苑負責。但上下課途中的交通安全，則由學生及家長自行負責。

3. 不可抗力
因天災、疫情、政府命令等不可抗力因素導致無法提供服務時，本學苑不負賠償責任，但會協調補課或退費事宜。`,
  },
  {
    id: "termination",
    title: "服務終止",
    content: `1. 學生主動終止
學生可隨時終止服務，退費依照本政策規定辦理。

2. 本學苑終止服務
如學生有以下情形，本學苑有權終止服務：
- 嚴重違反行為規範
- 提供不實資料
- 惡意拖欠費用
- 其他嚴重影響教學或學苑運作之行為

終止服務時，已繳費用將依情況部分或全部不予退還。`,
  },
  {
    id: "changes",
    title: "政策修訂",
    content:
      "本學苑保留隨時修訂本使用政策的權利。修訂後的政策將於網站公告，並於公告後生效。繼續使用服務即表示您同意修訂後的政策。重大變更將透過電子郵件或其他方式通知學生及家長。",
  },
  {
    id: "dispute",
    title: "爭議處理",
    content: `1. 協商解決
如有任何爭議，雙方應本於誠信原則協商解決。

2. 管轄法院
如協商不成，雙方同意以台灣台北地方法院為第一審管轄法院。

3. 準據法
本政策之解釋與適用，以中華民國法律為準據法。`,
  },
  {
    id: "contact",
    title: "聯絡資訊",
    content: `如對本使用政策有任何疑問，請聯繫我們：

電話：(02) 1234-5678
電子郵件：contact@pinshi.edu.tw
地址：台北市信義區信義路五段7號

最後更新日期：2026年4月13日`,
  },
];

export function TermsClient() {
  return (
    <div className="w-full">
      <section className="py-16 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              使用政策
            </h1>
            <p className="text-lg text-muted-foreground">Terms of Service</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="font-semibold text-foreground mb-4">目錄</h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="space-y-10">
                {sections.map((section, index) => (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="scroll-mt-24"
                  >
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {section.title}
                    </h3>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </motion.section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

