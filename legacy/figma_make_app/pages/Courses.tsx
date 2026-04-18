import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Book, Globe, Calculator, Leaf, Beaker, CheckCircle2, GraduationCap, Video, Users } from "lucide-react";
import { Button } from "../components/ui/button";
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
  },
];

const whyChoose = [
  {
    title: "小班制教學",
    description: "每班不超過 8 人，確保每位學生都能獲得充分關注",
  },
  {
    title: "個人化進度",
    description: "根據學生程度調整教學內容，不強迫跟從統一進度",
  },
  {
    title: "即時反饋",
    description: "課堂中立即解答疑問，課後持續追蹤學習狀況",
  },
  {
    title: "定期檢討",
    description: "每月學習報告，與家長保持密切溝通",
  },
];

export function Courses() {
  const [courseType, setCourseType] = useState<"recorded" | "tutoring">("tutoring");

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
              完整科目課程
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              從國英數社自五大科目到升學策略規劃，全方位陪伴學習成長。我們提供預錄課程與家教制課程兩種選擇，滿足不同學習需求。
            </p>

            {/* Course Type Selector */}
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

            {/* Course Type Description */}
            <div className="bg-white rounded-xl p-6 mb-8 text-left max-w-3xl mx-auto">
              {courseType === "tutoring" ? (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    家教制課程
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    小班制即時互動教學，每班不超過8人，老師能充分關注每位學生的學習狀況。
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
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Video className="w-5 h-5 text-primary" />
                    預錄課程
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    高品質錄製課程，隨時隨地學習，可以依照自己的步調反覆觀看，靈活安排學習時間。
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
                  initial={{ opacity: 0, scale: 0.9 }}
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

      {/* Course Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {courses.map((course, index) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${course.color} rounded-2xl p-8 lg:p-10`}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left: Icon & Name */}
                  <div className="lg:col-span-1">
                    <div className={`w-20 h-20 ${course.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <course.icon className={`w-10 h-10 ${course.iconColor}`} />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      {course.name}
                    </h2>
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

                  {/* Right: Features */}
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-semibold text-foreground mb-6">
                      教學特色
                    </h3>
                    <ul className="space-y-4 mb-8">
                      {course.features.map((feature, i) => {
                        const [title, ...rest] = feature.split("：");
                        const description = rest.join("：");
                        return (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-foreground">{title}</span>
                              {description && (
                                <>
                                  <span className="text-foreground">：</span>
                                  <span className="text-foreground/80">{description}</span>
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
                    >
                      了解更多
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Approach */}
      <section className="py-20 bg-[#f7f9f7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              我們的教學理念
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              不只是教會答案，更要培養學習能力
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-6"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                理解為先
              </h3>
              <p className="text-muted-foreground">
                先理解概念與原理，再進行練習與應用，建立穩固的知識基礎
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                引導思考
              </h3>
              <p className="text-muted-foreground">
                透過提問與討論，培養學生獨立思考與解決問題的能力
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl p-6"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                持續回饋
              </h3>
              <p className="text-muted-foreground">
                即時掌握學習狀況，適時調整教學策略，確保穩定進步
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-[#1a4d2e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              想了解適合孩子的課程規劃？
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              立即預約免費諮詢，我們將根據學生的學習狀況，為您量身規劃最適合的課程
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8"
              >
                預約免費諮詢
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 transition-colors"
                asChild
              >
                <Link to="/teachers">認識師資團隊</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
