"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Users,
  Lightbulb,
  Award,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";

const coreArchitecture = [
  {
    icon: Target,
    title: "診斷定位",
    description: "精準分析學習現況，找出核心問題點",
    color: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    icon: Lightbulb,
    title: "策略規劃",
    description: "量身打造學習路徑，建立階段性目標",
    color: "bg-purple-50",
    textColor: "text-purple-600",
  },
  {
    icon: Users,
    title: "陪伴執行",
    description: "專業師資引導，持續追蹤調整進度",
    color: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    icon: Award,
    title: "成果驗證",
    description: "檢視學習成效，建立長期成長動能",
    color: "bg-[#e8f5ee]",
    textColor: "text-[#2D7A4F]",
  },
];

const dagSteps = [
  {
    step: 1,
    title: "Diagnosis",
    subtitle: "診斷",
    description: "全面了解學生的學習狀況、學習風格、強項與弱項",
    points: [
      "找出為什麼讀了還是不會",
      "找出孩子真正卡住的地方",
      "了解學習習慣問題",
    ],
  },
  {
    step: 2,
    title: "Alignment",
    subtitle: "對齊",
    description: "建立適合孩子的學習方式，讓努力開始有效",
    points: [
      "建立適合孩子的學習方法",
      "設定可達成的學習節奏",
      "讓努力開始有方向",
    ],
  },
  {
    step: 3,
    title: "Growth",
    subtitle: "成長",
    description: "透過持續陪伴與調整，讓學生穩定進步並建立自信",
    points: [
      "持續追蹤進步狀況",
      "即時調整學習策略",
      "讓孩子慢慢建立自信",
    ],
  },
];

const comparisonData = [
  {
    category: "教學方式",
    traditional: "一對多統一進度，跟不上就放棄",
    pinshi: "小班制個人化教學，每個學生都有被看見",
  },
  {
    category: "學習目標",
    traditional: "只追求分數，考完就忘",
    pinshi: "建立學習能力，成績自然提升",
  },
  {
    category: "師生互動",
    traditional: "老師講、學生聽，被動學習",
    pinshi: "雙向引導與提問，真正理解內容",
  },
  {
    category: "進度追蹤",
    traditional: "考試才知道不會，已經來不及",
    pinshi: "即時回饋與調整，當下修正問題",
  },
  {
    category: "學習氛圍",
    traditional: "高壓競爭，越學越沒信心",
    pinshi: "支持型環境，讓孩子敢問敢錯敢成長",
  },
];

export function AboutClient() {
  return (
    <div className="w-full">
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                品識學苑的使命
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                我們相信每個孩子都有獨特的學習節奏與潛能。品識學苑不只是傳授知識，更重視培養「品德、知識、見識、膽識」的全人發展。
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                透過專業診斷、個人化教學與持續陪伴，我們幫助學生找到最適合自己的學習方式，建立自信，培養終身學習的能力。
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground">個人化教學</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground">全人發展</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground">專業師資</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="/about-hero.jpg?v=4"
                  alt="品識學苑教學"
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
              四大核心架構
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              從診斷到成果，我們不只是讓成績進步，更讓孩子建立真正的能力
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreArchitecture.map((item, index) => (
              <motion.div
                key={item.title}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${item.color} rounded-xl p-6 relative`}
              >
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                </div>
                <div
                  className={`w-12 h-12 ${item.textColor} bg-white rounded-lg flex items-center justify-center mb-4`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-bold ${item.textColor} mb-2`}>
                  {item.title}
                </h3>
                <p className="text-foreground/80">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-[#1a4d2e] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              DAG 成長模型
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              不是讓孩子更努力，而是讓他用對方法學習
            </p>
          </motion.div>

          <div className="space-y-8">
            {dagSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex flex-col lg:flex-row items-start gap-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 lg:p-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                      <div className="text-lg text-white/80">
                        {item.subtitle}
                      </div>
                    </div>
                    <p className="text-white/90 mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <span className="text-white/80">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {index < dagSteps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-white/30"></div>
                  </div>
                )}
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
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              為什麼選擇品識學苑
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              不是孩子不夠努力，而是學習方式出了問題
            </p>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-xl border border-border shadow-lg"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-[#f7f9f7]">
                  <th className="py-4 px-6 text-left font-semibold text-foreground">
                    比較項目
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-muted-foreground">
                    傳統補習班
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-primary bg-[#e8f5ee]">
                    品識學苑
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={row.category}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#f7f9f7]/50"}
                  >
                    <td className="py-4 px-6 font-medium text-foreground">
                      {row.category}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          {row.traditional}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 bg-[#e8f5ee]/30">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground font-medium">
                          {row.pinshi}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
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
              還在找適合孩子的學習方式嗎？
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              與其一直嘗試錯的方法，不如一次找到真正適合他的學習節奏
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8"
                asChild
              >
                <ExternalLinkOnce href="https://lin.ee/5cE2MLo">
                  免費找出學習盲點
                  <ArrowRight className="ml-2 w-5 h-5" />
                </ExternalLinkOnce>
              </Button>
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 transition-colors"
                asChild
              >
                <Link href="/courses">探索課程內容</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

