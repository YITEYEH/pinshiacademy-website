"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  Heart,
  Users,
  TrendingUp,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const coreValues = [
  {
    icon: Heart,
    title: "用心陪伴",
    description: "真心關注每位學生的成長",
  },
  {
    icon: Users,
    title: "團隊合作",
    description: "與夥伴共同創造教育價值",
  },
  {
    icon: TrendingUp,
    title: "持續成長",
    description: "不斷精進教學專業能力",
  },
  {
    icon: Sparkles,
    title: "創新思維",
    description: "勇於嘗試新的教學方法",
  },
];

const lookingFor = [
  "對教育充滿熱情，相信每個孩子都有潛能",
  "具備學科專業知識與教學經驗",
  "善於溝通，能理解學生的學習困境",
  "願意投入時間陪伴學生成長",
  "認同品識學苑的教育理念",
  "持續學習，不斷精進教學方法",
];

const developmentPath = [
  {
    stage: "新進培訓",
    duration: "1-2個月",
    description: "熟悉教學系統與理念",
    activities: ["教學觀摩", "教材研習", "試教輔導"],
  },
  {
    stage: "獨立授課",
    duration: "3-6個月",
    description: "開始獨立帶班教學",
    activities: ["備課支援", "定期檢討", "學生反饋"],
  },
  {
    stage: "資深教師",
    duration: "6個月以上",
    description: "成為教學團隊核心",
    activities: ["教材開發", "新師指導", "專題研究"],
  },
];

const benefits = [
  {
    title: "具競爭力的薪資",
    description: "根據經驗與表現提供優渥待遇",
  },
  {
    title: "完善的教學支援",
    description: "提供教材、教具與行政協助",
  },
  {
    title: "持續的專業成長",
    description: "定期研習與教學經驗交流",
  },
  {
    title: "良好的工作環境",
    description: "小班制教學，友善的團隊氛圍",
  },
  {
    title: "彈性的工作時間",
    description: "可依個人狀況安排授課時段",
  },
  {
    title: "績效獎勵制度",
    description: "表現優異者提供額外獎金",
  },
];

export function TeacherRecruitmentClient() {
  return (
    <div className="w-full">
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              加入品識學苑教學團隊
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              我們正在尋找志同道合的教育夥伴，一起為學生創造更好的學習體驗。如果您對教育充滿熱情，相信每個孩子都有無限潛能，歡迎加入我們！
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              我們的核心價值觀
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              這些是我們期望每位教師都能體現的特質
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              我們在尋找這樣的您
            </h2>
          </motion.div>

          <div className="bg-white rounded-2xl p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-6">
              {lookingFor.map((quality, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{quality}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              教師發展路徑
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              完整的培訓與成長機制，陪伴您成為優秀的教育工作者
            </p>
          </motion.div>

          <div className="space-y-8">
            {developmentPath.map((path, index) => (
              <motion.div
                key={path.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex flex-col lg:flex-row items-start gap-6 bg-[#f7f9f7] rounded-xl p-6 lg:p-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                      <h3 className="text-xl font-bold text-foreground">
                        {path.stage}
                      </h3>
                      <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mt-2 lg:mt-0">
                        {path.duration}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {path.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {path.activities.map((activity) => (
                        <span
                          key={activity}
                          className="text-sm bg-white text-foreground px-3 py-1 rounded border border-border"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {index < developmentPath.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-primary rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f7f9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              我們提供的福利
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-[#1a4d2e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              準備好加入我們了嗎？
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              點擊下方按鈕前往人才招募系統，提交您的履歷與教學理念
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8"
            >
              前往人才招募系統
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

