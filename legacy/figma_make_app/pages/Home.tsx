import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, CheckCircle2, XCircle, Book, Globe, Calculator, Leaf, Beaker, TrendingUp, Star, ChevronLeft, ChevronRight, GraduationCap, Video, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

const coreValues = [
  {
    icon: "品",
    title: "品德",
    subtitle: "Character",
    description: "培養良好品格與做人處事的態度",
  },
  {
    icon: "知",
    title: "知識",
    subtitle: "Knowledge",
    description: "建立紮實學科基礎與學習方法",
  },
  {
    icon: "見",
    title: "見識",
    subtitle: "Vision",
    description: "拓展視野與獨立思考的能力",
  },
  {
    icon: "膽",
    title: "膽識",
    subtitle: "Courage",
    description: "勇於面對挑戰與克服困難",
  },
];

const painPoints = [
  {
    problem: "很努力讀書卻總是卡關",
    solution: "建立清晰思路，理解勝過死記",
  },
  {
    problem: "越讀越沒有自信心",
    solution: "小步前進，累積成就感",
  },
  {
    problem: "不知道自己哪裡不會",
    solution: "精準診斷學習盲點",
  },
  {
    problem: "學習方法不適合自己",
    solution: "客製化學習節奏與策略",
  },
];

const subjects = [
  {
    icon: Book,
    name: "國文",
    color: "bg-[#e8f5ee]",
    textColor: "text-[#2D7A4F]",
    description: "理解文意，培養閱讀與表達能力",
  },
  {
    icon: Globe,
    name: "英文",
    color: "bg-blue-50",
    textColor: "text-blue-600",
    description: "建立語感，活用而非死背單字",
  },
  {
    icon: Calculator,
    name: "數學",
    color: "bg-purple-50",
    textColor: "text-purple-600",
    description: "理解概念，建立解題思維",
  },
  {
    icon: Leaf,
    name: "社會",
    color: "bg-amber-50",
    textColor: "text-amber-600",
    description: "連結時事，理解脈絡而非背誦",
  },
  {
    icon: Beaker,
    name: "自然",
    color: "bg-teal-50",
    textColor: "text-teal-600",
    description: "實驗思維，探索科學原理",
  },
  {
    icon: GraduationCap,
    name: "升學策略",
    color: "bg-rose-50",
    textColor: "text-rose-600",
    description: "規劃升學方向，掌握考試策略",
  },
];

const stats = [
  { value: "95%", label: "學生進步率" },
  { value: "4.8", label: "平均滿意度" },
  { value: "1000+", label: "輔導學生數" },
  { value: "15+", label: "專業師資" },
];

const testimonials = [
  {
    name: "陳老師",
    subject: "數學",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    quote: "我相信每個孩子都能找到適合自己的學習方式",
    studentReview: "陳老師讓我從害怕數學到喜歡數學！",
  },
  {
    name: "林老師",
    subject: "英文",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    quote: "語言學習需要的是理解和應用，而非死記硬背",
    studentReview: "林老師的課很有趣，讓我敢開口說英文",
  },
  {
    name: "王老師",
    subject: "國文",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    quote: "閱讀是理解世界的窗口",
    studentReview: "王老師教會我如何欣賞文學之美",
  },
];

export function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#e8f5ee] to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
                陪伴每位學生
                <br />
                找到學習節奏
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                品識學苑不只是補習班，我們重視每個孩子的獨特性，透過專業師資與個人化教學，讓學習成為充滿成就感的旅程。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  聯繫學習顧問
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-primary text-primary hover:bg-primary/5"
                  asChild
                >
                  <Link to="/courses">探索課程</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                  alt="學生學習"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <div className="text-sm text-muted-foreground">學生進步率</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
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
              四大核心理念
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              品識學苑致力於培養全人發展，不只是成績，更重視品格、視野與勇氣
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-3xl font-bold">{value.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                <div className="text-sm text-primary mb-3">{value.subtitle}</div>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-20 bg-[#f7f9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                傳統學習的困境
              </h2>
              <div className="space-y-4">
                {painPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white rounded-lg"
                  >
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{point.problem}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-8">
                品識學苑的解方
              </h2>
              <div className="space-y-4">
                {painPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-[#e8f5ee] rounded-lg border border-primary/20"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{point.solution}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
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
              完整科目課程
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              提供預錄課程與家教制課程，從學科到升學規劃，全方位陪伴學習成長
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${subject.color} rounded-xl p-8 hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${subject.textColor} bg-white rounded-lg flex items-center justify-center`}>
                    <subject.icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-2xl font-bold ${subject.textColor}`}>
                    {subject.name}
                  </h3>
                </div>
                <p className="text-foreground/80">{subject.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">
              兩種學習方式，滿足不同需求
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl p-6 border-2 border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">家教制課程</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  小班制即時互動教學，老師充分關注每位學生，即時解答疑問
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>每班不超過8人</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>即時互動問答</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>個人化進度調整</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl p-6 border-2 border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">預錄課程</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  高品質錄製課程，隨時隨地學習，依照自己的步調反覆觀看
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>彈性學習時間</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>無限次重複觀看</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>配套練習題庫</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5"
              asChild
            >
              <Link to="/courses">
                查看完整課程內容
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers & Testimonials */}
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
              專業師資與學生好評
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              經驗豐富的教學團隊，用心陪伴每一位學生
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <div className="bg-gradient-to-br from-[#e8f5ee] to-white rounded-2xl p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 shadow-xl">
                  <ImageWithFallback
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xl text-foreground mb-4 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                  <div className="text-lg font-semibold text-primary mb-1">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-muted-foreground mb-6">
                    {testimonials[currentTestimonial].subject}科老師
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-primary">
                    <div className="text-sm text-muted-foreground mb-1">學生評價</div>
                    <div className="text-foreground">
                      {testimonials[currentTestimonial].studentReview}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5"
              asChild
            >
              <Link to="/teachers">
                認識完整師資團隊
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
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
              準備好開始學習之旅了嗎？
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              立即預約免費諮詢，讓我們了解您的需求，為您量身打造最適合的學習計畫
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8"
              asChild
            >
              <a href="https://lin.ee/8nQNuYl" target="_blank" rel="noopener noreferrer">
                預約免費諮詢
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
