"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";

const successStories = [
  {
    name: "小明",
    grade: "國三",
    subject: "數學",
    before: {
      score: "45分",
      description: "對數學感到害怕，看到題目就放棄",
      challenges: ["基礎概念不清楚", "缺乏解題信心", "考試容易緊張"],
    },
    journey: [
      {
        period: "第1-2個月",
        focus: "建立基礎",
        actions: ["重新理解基本概念", "從簡單題型開始練習", "建立解題筆記"],
      },
      {
        period: "第3-4個月",
        focus: "強化應用",
        actions: ["增加題型難度", "學習解題策略", "定期小測驗"],
      },
      {
        period: "第5-6個月",
        focus: "穩定進步",
        actions: ["模擬考試練習", "時間管理訓練", "錯題分析複習"],
      },
    ],
    after: {
      score: "82分",
      description: "能獨立解題，對數學產生興趣",
      achievements: ["成績進步37分", "建立自信心", "主動問問題"],
    },
    testimonial:
      "謝謝陳老師的耐心教導，讓我發現數學其實沒有想像中那麼難！",
  },
  {
    name: "小華",
    grade: "高一",
    subject: "英文",
    before: {
      score: "58分",
      description: "單字背了就忘，文法觀念混亂",
      challenges: ["單字量不足", "文法不熟練", "閱讀速度慢"],
    },
    journey: [
      {
        period: "第1-2個月",
        focus: "語感建立",
        actions: ["情境式單字學習", "基礎文法整理", "每日英文短文閱讀"],
      },
      {
        period: "第3-4個月",
        focus: "能力提升",
        actions: ["擴充單字量", "複雜文法練習", "文章結構分析"],
      },
      {
        period: "第5-6個月",
        focus: "綜合應用",
        actions: ["長篇閱讀訓練", "寫作練習", "聽力加強"],
      },
    ],
    after: {
      score: "85分",
      description: "能流暢閱讀英文文章，寫作有明顯進步",
      achievements: ["成績進步27分", "通過英檢中級", "敢開口說英文"],
    },
    testimonial:
      "林老師教的方法讓我終於找到學英文的訣竅，現在看英文文章不再害怕了！",
  },
  {
    name: "小芳",
    grade: "國二",
    subject: "國文",
    before: {
      score: "62分",
      description: "作文常常寫不出來，古文看不懂",
      challenges: ["閱讀理解困難", "作文缺乏結構", "國學常識薄弱"],
    },
    journey: [
      {
        period: "第1-2個月",
        focus: "理解力培養",
        actions: ["白話文精讀", "文意分析練習", "作文架構訓練"],
      },
      {
        period: "第3-4個月",
        focus: "深度學習",
        actions: ["古文翻譯技巧", "修辭手法運用", "寫作素材累積"],
      },
      {
        period: "第5-6個月",
        focus: "表達提升",
        actions: ["長篇作文練習", "文學賞析", "綜合題型演練"],
      },
    ],
    after: {
      score: "88分",
      description: "作文能寫出有深度的內容，古文理解力大幅提升",
      achievements: ["成績進步26分", "作文比賽佳作", "愛上閱讀"],
    },
    testimonial:
      "王老師讓我發現國文不只是考試科目，更是表達自我的工具！",
  },
];

export function StudentSuccessClient() {
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
              學生成功故事
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              每個孩子都有無限潛能，只需要找到適合的學習方式。看看他們如何在品識學苑找到學習的節奏，建立自信，穩定進步。
            </p>
            <div className="flex justify-center gap-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">學生進步率</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">+28分</div>
                <div className="text-sm text-muted-foreground">平均進步幅度</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">4.8</div>
                <div className="text-sm text-muted-foreground">學生滿意度</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {story.name} · {story.grade}
                    </h2>
                    <div className="text-lg text-primary">{story.subject}科</div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-400">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl font-bold text-red-600">
                        {story.before.score}
                      </div>
                      <div className="text-sm text-muted-foreground">加入前</div>
                    </div>
                    <p className="text-foreground mb-4">{story.before.description}</p>
                    <div className="space-y-2">
                      {story.before.challenges.map((challenge, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-red-400 mt-0.5">•</span>
                          <span>{challenge}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#e8f5ee] rounded-xl p-6 border-l-4 border-primary">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl font-bold text-primary">
                        {story.after.score}
                      </div>
                      <div className="text-sm text-muted-foreground">6個月後</div>
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-foreground mb-4">{story.after.description}</p>
                    <div className="space-y-2">
                      {story.after.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#f7f9f7] rounded-xl p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    學習歷程
                  </h3>
                  <div className="space-y-6">
                    {story.journey.map((phase, i) => (
                      <div key={i} className="relative pl-8">
                        <div className="absolute left-0 top-1 w-4 h-4 bg-primary rounded-full"></div>
                        {i < story.journey.length - 1 && (
                          <div className="absolute left-[7px] top-5 w-0.5 h-full bg-primary/20"></div>
                        )}
                        <div className="mb-2">
                          <span className="font-semibold text-foreground">
                            {phase.period}
                          </span>
                          <span className="text-primary ml-2">· {phase.focus}</span>
                        </div>
                        <ul className="space-y-1">
                          {phase.actions.map((action, j) => (
                            <li
                              key={j}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary/60 mt-0.5 flex-shrink-0" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-xl p-6 border border-primary/20 italic">
                  <p className="text-foreground">
                    &ldquo;{story.testimonial}&rdquo;
                  </p>
                  <div className="text-sm text-muted-foreground mt-2">
                    — {story.name}
                  </div>
                </div>

                {index < successStories.length - 1 && (
                  <div className="mt-20 border-t border-border"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-[#1a4d2e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              下一個成功故事就是您的孩子
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              立即預約免費諮詢，讓我們一起規劃專屬的學習成長計畫
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8"
              asChild
            >
              <ExternalLinkOnce href="https://lin.ee/8nQNuYl">
                預約免費諮詢
                <ArrowRight className="ml-2 w-5 h-5" />
              </ExternalLinkOnce>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

