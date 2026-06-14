"use client";

import { motion } from "motion/react";
import { ArrowRight, Users, Heart, Zap, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";

const teamValues = [
  {
    icon: Heart,
    title: "服務精神",
    description: "以學生與家長需求為優先考量",
  },
  {
    icon: Users,
    title: "團隊協作",
    description: "支援教學團隊，創造最佳環境",
  },
  {
    icon: Zap,
    title: "效率執行",
    description: "迅速處理事務，優化工作流程",
  },
  {
    icon: Target,
    title: "目標導向",
    description: "聚焦成果，持續改善服務品質",
  },
];

const lookingFor = [
  "認同品識學苑的教育理念與價值觀",
  "具備良好的溝通與人際互動能力",
  "主動積極，願意學習與成長",
  "細心負責，注重服務品質",
  "具備團隊合作精神",
  "對教育產業有熱忱",
];

const benefits = [
  { title: "競爭力薪資", description: "根據經驗與職位提供優渥待遇" },
  { title: "成長機會", description: "提供培訓與職涯發展機會" },
  { title: "友善環境", description: "正向的團隊氛圍與工作環境" },
  { title: "彈性時間", description: "部分職位可彈性安排工作時間" },
  { title: "績效獎金", description: "表現優異者提供額外獎勵" },
  { title: "員工福利", description: "完善的休假與福利制度" },
];

export function TeamRecruitmentClient() {
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
              加入營運團隊
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              品識學苑的成功，不只來自優秀的教學團隊，更需要專業的營運後援。我們正在尋找熱愛教育、注重服務品質的夥伴，一起為學生與家長創造最好的體驗。
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              營運團隊核心價值
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              這些是我們期望營運團隊成員具備的特質
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
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
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              我們在尋找這樣的您
            </h2>
          </motion.div>

          <div className="bg-[#f7f9f7] rounded-2xl p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-6">
              {lookingFor.map((quality, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
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

      <section className="py-20 bg-[#f7f9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
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
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
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
              準備好加入我們了嗎？
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              點擊下方按鈕前往人才招募系統，提交您的履歷
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8"
              asChild
            >
              <ExternalLinkOnce
                href="https://www.pinshihire.com/"
                newTab
                analyticsLabel="team_recruitment_apply"
              >
                前往人才招募系統
                <ArrowRight className="ml-2 w-5 h-5" />
              </ExternalLinkOnce>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

