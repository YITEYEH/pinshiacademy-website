import { motion } from "motion/react";
import { ArrowRight, Users, Heart, Zap, Target, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";

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

const positions = [
  {
    title: "課程顧問",
    department: "學生服務",
    responsibilities: [
      "為家長提供專業的課程諮詢服務",
      "協助學生規劃適合的學習方案",
      "追蹤學生學習進度與滿意度",
      "維護良好的家長溝通關係",
    ],
    requirements: [
      "具備良好的溝通與說服能力",
      "熟悉教育產業或相關經驗佳",
      "細心負責，關注細節",
    ],
  },
  {
    title: "行政專員",
    department: "行政管理",
    responsibilities: [
      "處理日常行政事務與文書作業",
      "協調師資與教室資源安排",
      "維護學生資料與課程系統",
      "支援各項活動與專案執行",
    ],
    requirements: [
      "熟悉行政流程與文書處理",
      "具備良好的組織與時間管理能力",
      "細心謹慎，能多工處理",
    ],
  },
  {
    title: "數位行銷專員",
    department: "行銷企劃",
    responsibilities: [
      "經營社群媒體與品牌形象",
      "規劃與執行數位行銷活動",
      "撰寫教育相關內容與文案",
      "分析行銷數據，優化策略",
    ],
    requirements: [
      "熟悉社群媒體經營與數位行銷",
      "具備文案撰寫與內容企劃能力",
      "對教育產業有興趣與熱忱",
    ],
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
  {
    title: "競爭力薪資",
    description: "根據經驗與職位提供優渥待遇",
  },
  {
    title: "成長機會",
    description: "提供培訓與職涯發展機會",
  },
  {
    title: "友善環境",
    description: "正向的團隊氛圍與工作環境",
  },
  {
    title: "彈性時間",
    description: "部分職位可彈性安排工作時間",
  },
  {
    title: "績效獎金",
    description: "表現優異者提供額外獎勵",
  },
  {
    title: "員工福利",
    description: "完善的休假與福利制度",
  },
];

export function TeamRecruitment() {
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
              加入營運團隊
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              品識學苑的成功，不只來自優秀的教學團隊，更需要專業的營運後援。我們正在尋找熱愛教育、注重服務品質的夥伴，一起為學生與家長創造最好的體驗。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Values */}
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

      {/* Open Positions */}
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
              招募職位
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              以下是目前開放的營運團隊職缺
            </p>
          </motion.div>

          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 lg:p-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {position.title}
                    </h3>
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {position.department}
                    </span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">工作內容</h4>
                    <ul className="space-y-2">
                      {position.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">應徵條件</h4>
                    <ul className="space-y-2">
                      {position.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Looking For */}
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
              我們在尋找這樣的您
            </h2>
          </motion.div>

          <div className="bg-[#f7f9f7] rounded-2xl p-8 lg:p-12">
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

      {/* Benefits */}
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

      {/* CTA */}
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
              點擊下方按鈕前往人才招募系統，提交您的履歷
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
