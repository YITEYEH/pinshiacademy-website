"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  Book,
  Globe,
  Calculator,
  Leaf,
  Beaker,
  CheckCircle2,
  GraduationCap,
  Video,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { useState } from "react";

const courses = [
  {
    icon: Book,
    name: "國文",
    englishName: "Chinese",
    color: "bg-[#e8f5ee]",
    iconBg: "bg-primary",
    iconColor: "text-white",
    features: [
      "理解勝過記憶：深入解析文意與寫作技巧",
      "培養閱讀素養：從古文到現代文的全方位訓練",
      "表達能力提升：作文結構與修辭手法實戰",
      "考試策略指導：掌握答題技巧與時間分配",
    ],
    highlights: "透過文本分析與討論，培養獨立思考與文學鑑賞能力",
    lineHref: "https://lin.ee/5itUHpZ",
  },
  {
    icon: Globe,
    name: "英文",
    englishName: "English",
    color: "bg-blue-50",
    iconBg: "bg-blue-500",
    iconColor: "text-white",
    features: [
      "建立語感：從聽說讀寫全方位提升英語能力",
      "活用單字：透過情境學習，不再死背單字",
      "文法理解：系統化建構文法觀念與應用",
      "閱讀策略：掌握長篇文章的理解與分析技巧",
    ],
    highlights: "重視實際應用，讓英文成為溝通工具而非考試科目",
    lineHref: "https://lin.ee/5itUHpZ",
  },
  {
    icon: Calculator,
    name: "數學",
    englishName: "Mathematics",
    color: "bg-purple-50",
    iconBg: "bg-purple-500",
    iconColor: "text-white",
    features: [
      "建立思路：理解數學概念，而非死記公式",
      "解題策略：培養邏輯推理與問題拆解能力",
      "錯誤分析：從錯誤中學習，找出盲點突破",
      "靈活應用：將數學概念應用於各類題型",
    ],
    highlights: "從基礎概念出發，循序漸進建立完整的數學思維",
    lineHref: "https://lin.ee/rl0Wyvh",
  },
  {
    icon: Leaf,
    name: "社會",
    englishName: "Social Studies",
    color: "bg-amber-50",
    iconBg: "bg-amber-500",
    iconColor: "text-white",
    features: [
      "理解脈絡：連結歷史、地理與公民的整合學習",
      "時事連結：將課本知識與現實世界結合",
      "圖表判讀：培養資料分析與批判思考能力",
      "記憶技巧：透過理解與聯想，有效記憶重點",
    ],
    highlights: "不只是背誦，更要理解社會現象背後的因果關係",
    lineHref: "https://lin.ee/rl0Wyvh",
  },
  {
    icon: Beaker,
    name: "自然",
    englishName: "Science",
    color: "bg-teal-50",
    iconBg: "bg-teal-500",
    iconColor: "text-white",
    features: [
      "探索原理：從實驗與觀察理解科學概念",
      "邏輯推理：培養科學思維與假設驗證能力",
      "生活應用：將科學知識連結日常生活經驗",
      "圖表分析：掌握實驗數據與圖表判讀技巧",
    ],
    highlights: "激發好奇心，培養探索自然世界的科學精神",
    lineHref: "https://lin.ee/rl0Wyvh",
  },
  {
    icon: GraduationCap,
    name: "升學策略",
    englishName: "Academic Planning",
    color: "bg-rose-50",
    iconBg: "bg-rose-500",
    iconColor: "text-white",
    features: [
      "目標設定：根據興趣與能力，規劃升學方向",
      "資源整合：有效運用學習資源，優化讀書計畫",
      "考試策略：掌握各類升學考試的準備方法",
      "時間管理：建立高效率的學習與複習節奏",
    ],
    highlights: "從目標設定到考試準備，完整的升學規劃與諮詢",
    lineHref: "https://lin.ee/rl0Wyvh",
  },
];

const whyChoose = [
  {
    title: "彈性學習時間",
    description: "不是沒時間讀書，而是時間終於能被好好利用",
  },
  {
    title: "反覆觀看理解",
    description: "不再聽一次就過，真的搞懂才算學會",
  },
  {
    title: "系統化練習",
    description: "不是看影片，是一步一步會做題",
  },
  {
    title: "線上支援解答",
    description: "卡住的地方，不再自己撐",
  },
];

export function CoursesClient() {
  const [courseType, setCourseType] = useState<"recorded" | "tutoring">(
    "tutoring",
  );

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
              孩子努力了，成績卻還是上不來？
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              我們不只是教科目，而是幫孩子建立真正能進步的學習方法
            </p>

            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setCourseType("tutoring")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  courseType === "tutoring"
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-muted-foreground hover:bg-white/80"
                }`}
              >
                <Users className="w-5 h-5" />
                家教制課程
              </button>
              <button
                onClick={() => setCourseType("recorded")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  courseType === "recorded"
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-muted-foreground hover:bg-white/80"
                }`}
              >
                <Video className="w-5 h-5" />
                預錄課程
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 mb-8 text-left max-w-3xl mx-auto">
              {courseType === "tutoring" ? (
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    家教制課程
                  </h2>
                  <p className="text-muted-foreground mb-3">
                    小班互動學習，每個孩子都能被看見
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">即時互動問答</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">個人化教學調整</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">定期進度追蹤</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">課後即時輔導</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Video className="w-5 h-5 text-primary" />
                    預錄課程
                  </h2>
                  <p className="text-muted-foreground mb-3">
                    高品質系統化課程，讓孩子可以反覆理解、不再只是聽過
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">彈性學習時間</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">無限次重複觀看</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">配套練習題庫</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">線上問答支援</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {whyChoose.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-lg p-4 shadow-sm"
                >
                  <div className="text-sm font-semibold text-primary mb-1">
                    {item.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {courses.map((course, index) => (
              <motion.div
                key={course.name}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${course.color} rounded-2xl p-8 lg:p-10`}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <div
                      className={`w-20 h-20 ${course.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <course.icon className={`w-10 h-10 ${course.iconColor}`} />
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">
                      {course.name}
                    </h3>
                    <div className="text-lg text-muted-foreground mb-4">
                      {course.englishName}
                    </div>
                    <div className="flex gap-2 mb-6">
                      <span className="inline-flex items-center gap-1 bg-white text-primary px-3 py-1 rounded-full text-sm font-medium">
                        <Users className="w-3 h-3" />
                        家教制
                      </span>
                      <span className="inline-flex items-center gap-1 bg-white text-primary px-3 py-1 rounded-full text-sm font-medium">
                        <Video className="w-3 h-3" />
                        預錄
                      </span>
                    </div>
                    <p className="text-foreground/80 italic border-l-4 border-primary pl-4">
                      {course.highlights}
                    </p>
                  </div>

                  <div className="lg:col-span-2">
                    <h4 className="text-xl font-semibold text-foreground mb-6">
                      教學特色
                    </h4>
                    <ul className="space-y-4 mb-8">
                      {course.features.map((feature, i) => {
                        const [title, ...rest] = feature.split("：");
                        const description = rest.join("：");
                        return (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-foreground">
                                {title}
                              </span>
                              {description && (
                                <>
                                  <span className="text-foreground">：</span>
                                  <span className="text-foreground/80">
                                    {description}
                                  </span>
                                </>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                      asChild
                    >
                      <ExternalLinkOnce href={course.lineHref}>
                        了解更多
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </ExternalLinkOnce>
                    </Button>
                  </div>
                </div>
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
              孩子現在的學習方式，真的適合他嗎？
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              多數孩子不是不努力，而是沒有找到對的方法
              <br />
              我們用專業診斷，幫你找出最適合的學習路徑
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8"
                asChild
              >
                <ExternalLinkOnce href="https://lin.ee/9x27qTh">
                  免費學習診斷
                  <ArrowRight className="ml-2 w-5 h-5" />
                </ExternalLinkOnce>
              </Button>
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 transition-colors"
                asChild
              >
                <Link href="/teachers">認識師資團隊</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

