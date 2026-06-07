"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    category: "課程相關",
    questions: [
      {
        q: "品識學苑提供哪些科目的課程？",
        a: "品識學苑提供國文、英文、數學、社會、自然五大學科課程，涵蓋國中及高中階段。我們依據學生的學習需求安排適合的課程內容，並透過專業師資與系統化教學，協助學生建立扎實基礎、提升學習成效與解題能力。",
      },
      {
        q: "品識學苑是一對一家教還是小班制課程？",
        a: "兩者皆有提供。品識學苑設有一對一教學與小班制課程，可依學生需求與學習目標進行選擇。一對一課程強調個別化輔導，小班課程則兼顧互動討論與學習氛圍，讓學生獲得更完整的學習體驗。",
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
        a: "品識學苑的教師皆經過嚴格篩選與評估，具備相關學科專業能力及教學經驗。我們除了重視教師的學歷背景與教學實力外，更重視其是否具備良好的溝通能力、教學熱忱與責任感。所有教師均需通過履歷審查、面試及試教評估後，方能正式授課。我們相信，優秀的老師不僅能幫助學生提升成績，更能引導學生建立正確的學習方法與自信心，陪伴學生穩定成長。",
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
        a: "品識學苑目前以線上教學為主，學生可透過網路在家上課，不受地區限制。無論您位於台灣各地，皆可參與課程與接受學習輔導。品識教育科技有限公司登記地址為台北市信義區信義路四段415號14樓之1，該地址為公司登記所在地，非實體上課地點。",
      },
      {
        q: "有提供線上課程嗎？",
        a: "有的。品識學苑目前以線上教學為主，學生只需準備電腦、平板或手機及穩定的網路環境，即可在家進行課程學習。線上課程採即時互動教學，老師可透過視訊、電子白板及數位教材進行授課，並即時解答學生問題、追蹤學習進度，提供與實體課程相近的學習體驗。",
      },
      {
        q: "只上一科可以嗎？",
        a: "當然可以！您可以依照孩子的需求，選擇單科或多科課程。我們會根據實際狀況，提供最適合的學習建議。",
      },
      {
        q: "線上課程的學習效果會不會比較差？",
        a: "不會。品識學苑採用即時互動式線上教學，老師可透過數位白板、教材共享及即時討論功能進行授課，並根據學生的學習狀況提供個別化指導。相較於傳統課程，線上學習不僅省去通勤時間，也讓學生能在熟悉的環境中學習，更有效率地安排課後複習與自主學習時間。",
      },
      {
        q: "品識學苑有實體教室嗎？",
        a: "目前品識學苑以線上教學為主，學生可透過電腦、平板或手機進行課程學習，不受地區限制。未來若有實體課程或教室據點規劃，將於官方網站及社群平台公告相關資訊。",
      },
    ],
  },
];

export function FaqClient() {
  return (
    <div className="w-full">
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
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

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
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
    </div>
  );
}

