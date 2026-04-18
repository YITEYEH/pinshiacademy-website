import { motion } from "motion/react";

const sections = [
  {
    id: "intro",
    title: "前言",
    content: `品識學苑（以下簡稱「本學苑」）重視每位使用者的隱私權保護。本隱私權政策說明本學苑如何蒐集、處理及利用您的個人資料，以及您所擁有的相關權利。當您使用本學苑的服務時，即表示您同意本政策所述的資料處理方式。`,
  },
  {
    id: "collection",
    title: "資料蒐集",
    content: `我們可能蒐集以下類型的個人資料：

1. 基本資料：姓名、聯絡電話、電子郵件地址、通訊地址
2. 學習相關資料：就讀學校、年級、學習需求、課程紀錄、學習成果
3. 家長資料：家長姓名、聯絡方式、緊急聯絡人資訊
4. 付款資料：繳費紀錄、發票資訊（但不包含完整信用卡號碼）
5. 網站使用紀錄：瀏覽記錄、Cookie資訊

這些資料的蒐集是基於提供教學服務、改善服務品質、以及維護雙方權益之必要。`,
  },
  {
    id: "usage",
    title: "資料使用",
    content: `本學苑蒐集您的個人資料，僅用於以下目的：

1. 提供教學服務與課程安排
2. 學生學習進度追蹤與成效評估
3. 家長聯繫與溝通
4. 課程通知與行政作業
5. 服務品質改善與滿意度調查
6. 法律要求之配合（如稅務申報）

未經您的同意，本學苑不會將您的個人資料用於其他目的或提供給第三方。`,
  },
  {
    id: "protection",
    title: "資料保護",
    content: `本學苑採取以下措施保護您的個人資料：

1. 建立完善的資料存取權限管理制度
2. 使用加密技術保護敏感資料
3. 定期備份重要資料
4. 限制員工僅能於工作必要範圍內接觸個人資料
5. 與員工簽訂保密協議
6. 定期進行資訊安全檢查與更新`,
  },
  {
    id: "rights",
    title: "您的權利",
    content: `依照個人資料保護法，您享有以下權利：

1. 查詢或請求閱覽您的個人資料
2. 請求製給個人資料複製本
3. 請求補充或更正個人資料
4. 請求停止蒐集、處理或利用個人資料
5. 請求刪除個人資料

如需行使上述權利，請聯繫本學苑行政部門。我們將在合理期限內處理您的請求。`,
  },
  {
    id: "cookies",
    title: "Cookies 使用",
    content: `本學苑網站使用 Cookies 技術，以提供更好的瀏覽體驗。Cookies 是網站傳送至您瀏覽器的小型文字檔案，用於記錄您的偏好設定與瀏覽習慣。

您可以透過瀏覽器設定選擇拒絕 Cookies，但這可能影響某些網站功能的使用。`,
  },
  {
    id: "changes",
    title: "政策修訂",
    content: `本學苑保留隨時修訂本隱私權政策的權利。如有重大變更，我們會透過網站公告或電子郵件通知您。修訂後的政策將於公告時生效，請您定期查閱。`,
  },
  {
    id: "contact",
    title: "聯絡我們",
    content: `如果您對本隱私權政策有任何疑問或建議，歡迎透過以下方式聯繫我們：

電話：(02) 1234-5678
電子郵件：privacy@pinshi.edu.tw
地址：台北市信義區信義路五段7號

最後更新日期：2026年4月13日`,
  },
];

export function Privacy() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              隱私權政策
            </h1>
            <p className="text-lg text-muted-foreground">
              Privacy Policy
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">目錄</h3>
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

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-lg max-w-none">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="mb-12 scroll-mt-24"
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {section.title}
                    </h2>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
