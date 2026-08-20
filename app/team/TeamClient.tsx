"use client";

import { motion } from "motion/react";
import { ArrowRight, Heart, Target, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const teamValues = [
  {
    icon: Heart,
    title: "用心服務",
    description: "以學生與家長的需求為優先",
  },
  {
    icon: Target,
    title: "專業效率",
    description: "提供精準有效的行政支援",
  },
  {
    icon: Zap,
    title: "積極創新",
    description: "持續優化服務流程與體驗",
  },
  {
    icon: Shield,
    title: "可靠信賴",
    description: "建立長期穩定的信任關係",
  },
];

export function TeamClient() {
  return (
    <div className="w-full">
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                營運團隊
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                在品識學苑，老師專注於教學，而我們的營運團隊則在背後提供完善的支援，確保每個環節都能順暢運作。
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                從課程諮詢、行政管理到家長溝通，我們用心服務每個細節，讓老師能全心投入教學，讓學生與家長能獲得最好的體驗。
              </p>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="/team-hero.jpg"
                  alt="營運團隊"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
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
              團隊核心價值
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              我們的營運團隊秉持以下理念，為教學團隊與學生家長提供最佳支援
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
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
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
              有任何問題都歡迎諮詢
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              我們的團隊隨時為您服務，解答關於課程、師資、學習規劃的各項疑問
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8"
              asChild
            >
              <a href="/contact">
                聯繫我們
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

