import { motion } from "motion/react";
import { ArrowRight, Heart, Target, Zap, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

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

const teamMembers = [
  {
    name: "李家慧",
    role: "營運總監",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    description: "統籌品識學苑的整體營運策略，確保教學品質與服務水準",
    expertise: ["策略規劃", "團隊管理", "品質控管"],
  },
  {
    name: "周宜靜",
    role: "課程顧問",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    description: "協助家長與學生規劃最適合的學習方案，提供專業諮詢服務",
    expertise: ["學習診斷", "課程規劃", "家長溝通"],
  },
  {
    name: "陳柏宇",
    role: "行政主任",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    description: "負責日常行政事務，確保教學環境與資源的完善運作",
    expertise: ["行政管理", "資源調度", "流程優化"],
  },
  {
    name: "林品妤",
    role: "學習顧問",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    description: "追蹤學生學習進度，協調師資與課程安排，提供即時支援",
    expertise: ["進度追蹤", "師生協調", "問題解決"],
  },
  {
    name: "張育銘",
    role: "數位行銷",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    description: "負責品牌形象與數位行銷，讓更多家庭認識品識學苑",
    expertise: ["品牌經營", "社群媒體", "內容行銷"],
  },
  {
    name: "吳佳穎",
    role: "客服專員",
    image: "https://images.unsplash.com/photo-1593698054469-2bb6fdf4b512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    description: "提供親切專業的客戶服務，解答家長與學生的各項疑問",
    expertise: ["客戶服務", "問題處理", "滿意度管理"],
  },
];

export function Team() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                  alt="營運團隊"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
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

      {/* Team Members */}
      <section className="py-20 bg-[#f7f9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              團隊成員介紹
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              認識支援品識學苑運作的專業團隊
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#e8f5ee]">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {member.name}
                      </h3>
                    </div>
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                      {member.role}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {member.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-[#e8f5ee] text-primary px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
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
              有任何問題都歡迎諮詢
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              我們的團隊隨時為您服務，解答關於課程、師資、學習規劃的各項疑問
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8"
            >
              聯繫我們
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
