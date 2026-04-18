import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqCategories = [
  {
    category: "課程相關",
    questions: [
      {
        q: "品識學苑提供哪些科目的課程？",
        a: "我們提供國文、英文、數學、社會、自然五大科目的完整課程，涵蓋國中與高中階段。每個科目都由專業師資授課，採小班制教學。",
      },
      {
        q: "一班有多少學生？",
        a: "我們採小班制教學，每班不超過8人。這樣的班級規模確保每位學生都能獲得充分的關注與指導，老師也能更精準地掌握每位學生的學習狀況。",
      },
      {
        q: "課程如何安排？可以彈性調整嗎？",
        a: "我們會根據學生的程度與需求，規劃個人化的學習計畫。課程時間可以依照學生與家長的需求彈性安排，並會定期檢討進度，適時調整教學內容與方式。",
      },
      {
        q: "如果孩子進度跟不上怎麼辦？",
        a: "這正是我們採小班制的原因之一。老師會密切關注每位學生的學習狀況，如果發現跟不上，會立即調整教學節奏，必要時安排額外輔導，確保每位學生都能穩定進步。",
      },
    ],
  },
  {
    category: "費用與報名",
    questions: [
      {
        q: "如何計費？有哪些付款方式？",
        a: "費用依據科目、課程時數與班級規模而定。我們提供月繳與季繳方案，可使用現金、匯款或信用卡付款。詳細費用資訊請聯繫我們的課程顧問。",
      },
      {
        q: "報名流程是什麼？",
        a: "首先預約免費諮詢，我們會安排課程顧問了解孩子的學習需求。接著進行學習診斷，評估目前的學習狀況。確認課程規劃後，即可完成報名手續並安排上課時間。",
      },
      {
        q: "可以先試上一堂課嗎？",
        a: "可以的！我們提供試聽課程，讓學生實際體驗我們的教學方式。試聽後若覺得適合，再決定是否正式報名。",
      },
      {
        q: "如果需要請假或補課怎麼辦？",
        a: "請假需提前通知，我們會安排補課時段。補課時間會與家長協調，確保不影響學習進度。特殊狀況也可以彈性處理。",
      },
    ],
  },
  {
    category: "師資與教學",
    questions: [
      {
        q: "老師的資歷如何？",
        a: "我們的老師都具備豐富的教學經驗與學科專業背景，平均教學經驗超過8年。除了專業能力，我們更重視老師是否真心關注學生、善於溝通，並認同品識學苑的教育理念。",
      },
      {
        q: "可以指定老師嗎？",
        a: "可以的。在免費諮詢時，我們會了解學生的學習特質與需求，推薦最適合的老師。如果有特別偏好，也歡迎提出，我們會盡力安排。",
      },
      {
        q: "教學方式跟一般補習班有什麼不同？",
        a: "我們強調理解勝過記憶，重視培養思考能力而非填鴨式教學。採用對話式引導，讓學生主動思考與提問。同時會根據每位學生的學習節奏調整進度，而非統一趕進度。",
      },
      {
        q: "家長如何了解孩子的學習狀況？",
        a: "我們會定期提供學習報告，說明孩子的進步情形與需要加強的部分。此外，家長隨時可以與老師或課程顧問聯繫，了解孩子的學習狀況。",
      },
    ],
  },
  {
    category: "其他問題",
    questions: [
      {
        q: "品識學苑的地點在哪裡？",
        a: "我們位於台北市信義區信義路五段7號，鄰近捷運象山站，交通便利。教室環境明亮舒適，提供良好的學習空間。",
      },
      {
        q: "有提供線上課程嗎？",
        a: "目前主要以實體課程為主，因為我們相信面對面的互動與觀察，更能掌握學生的學習狀況。但特殊情況下（例如疫情、學生無法到場），我們也可以彈性安排線上授課。",
      },
      {
        q: "只上一科可以嗎？",
        a: "當然可以！您可以依照孩子的需求，選擇單科或多科課程。我們會根據實際狀況，提供最適合的學習建議。",
      },
      {
        q: "如何聯繫品識學苑？",
        a: "您可以透過電話 (02) 1234-5678、電子郵件 contact@pinshi.edu.tw，或直接到我們的教室詢問。我們的服務時間是週一至週五 10:00-20:00，週六 09:00-18:00。",
      },
    ],
  },
];

export function FAQ() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              常見問題
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              整理家長與學生最常詢問的問題，幫助您快速了解品識學苑
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary">
                  {category.category}
                </h2>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${categoryIndex}-${index}`}
                      className="bg-[#f7f9f7] rounded-lg px-6 border-none"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="font-semibold text-foreground pr-4">
                          {item.q}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-[#f7f9f7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              還有其他問題？
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              歡迎直接聯繫我們，我們的團隊隨時為您解答
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white rounded-lg p-4 text-left">
                <div className="text-sm text-muted-foreground mb-1">電話諮詢</div>
                <div className="font-semibold text-foreground">(02) 1234-5678</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-left">
                <div className="text-sm text-muted-foreground mb-1">電子郵件</div>
                <div className="font-semibold text-foreground">contact@pinshi.edu.tw</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-left">
                <div className="text-sm text-muted-foreground mb-1">服務時間</div>
                <div className="font-semibold text-foreground">週一至週六 09:00-20:00</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
