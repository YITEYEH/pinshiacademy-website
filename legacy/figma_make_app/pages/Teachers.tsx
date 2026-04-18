import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Star, Award, BookOpen, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const teacherCulture = [
  {
    icon: Award,
    title: "專業資格",
    description: "具備教學經驗與學科專業背景",
  },
  {
    icon: BookOpen,
    title: "持續成長",
    description: "定期研習與教學方法精進",
  },
  {
    icon: Users,
    title: "用心陪伴",
    description: "關注每位學生的學習狀況與心理需求",
  },
];

const teachers = [
  {
    name: "陳建華",
    subject: "數學",
    tags: ["國中數學", "高中數學", "邏輯思維"],
    image: "https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    philosophy: "數學不是背公式，而是建立邏輯思維。我相信每個孩子都能找到自己的解題方式。",
    studentReview: "陳老師讓我從害怕數學到喜歡數學，他總是很有耐心地解釋到我真的懂為止。",
    experience: "10年教學經驗",
  },
  {
    name: "林雅婷",
    subject: "英文",
    tags: ["英文閱讀", "寫作", "口說訓練"],
    image: "https://images.unsplash.com/photo-1758685848177-93817e9ad5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    philosophy: "語言學習需要的是理解和應用，而非死記硬背。讓英文成為生活的一部分。",
    studentReview: "林老師的課很有趣，她會用很多生活化的例子，讓我敢開口說英文了！",
    experience: "8年教學經驗",
  },
  {
    name: "王志明",
    subject: "國文",
    tags: ["古文閱讀", "作文指導", "文學賞析"],
    image: "https://images.unsplash.com/photo-1758685734565-fc8ff6e9ffcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    philosophy: "閱讀是理解世界的窗口，寫作是表達自我的途徑。文學不應該只是考試工具。",
    studentReview: "王老師教會我如何欣賞文學之美，現在我真的開始喜歡讀書了。",
    experience: "12年教學經驗",
  },
  {
    name: "張美玲",
    subject: "自然",
    tags: ["生物", "化學", "實驗探究"],
    image: "https://images.unsplash.com/photo-1758685848006-1bc450061624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    philosophy: "科學是探索未知的過程，透過實驗與觀察，培養孩子的好奇心與探究精神。",
    studentReview: "張老師會用很多實驗來解釋原理，讓原本很難的化學變得很有趣！",
    experience: "9年教學經驗",
  },
  {
    name: "劉俊傑",
    subject: "社會",
    tags: ["歷史", "地理", "公民"],
    image: "https://images.unsplash.com/photo-1758685734503-58a8accc24e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    philosophy: "社會科不只是背誦，更要理解事件脈絡與因果關係，連結過去與現在。",
    studentReview: "劉老師會用時事來解釋歷史，讓我發現社會科原來這麼有意思！",
    experience: "11年教學經驗",
  },
  {
    name: "黃詩涵",
    subject: "英文",
    tags: ["國中英文", "文法", "單字策略"],
    image: "https://images.unsplash.com/photo-1758685848001-0396a85ba84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
    philosophy: "建立語感比死背單字重要，透過情境學習讓英文變成直覺反應。",
    studentReview: "黃老師教的單字記憶法超有用，我現在背單字快多了！",
    experience: "7年教學經驗",
  },
];

export function Teachers() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              專業師資團隊
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              品識學苑的每位老師都具備豐富教學經驗與學科專業，更重要的是，他們真心關注每位學生的成長，用心陪伴每個學習旅程。
            </p>
          </motion.div>

          {/* Teacher Culture */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teacherCulture.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Photo */}
                <div className="aspect-[4/3] overflow-hidden bg-[#f7f9f7]">
                  <ImageWithFallback
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {teacher.name}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {teacher.experience}
                      </div>
                    </div>
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {teacher.subject}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {teacher.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-[#f7f9f7] text-muted-foreground px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Philosophy */}
                  <p className="text-sm text-foreground/80 mb-4 italic border-l-2 border-primary pl-3">
                    {teacher.philosophy}
                  </p>

                  {/* Student Review */}
                  <div className="bg-[#e8f5ee] rounded-lg p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/80">
                      {teacher.studentReview}
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">
                      — 學生評價
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-[#f7f9f7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              對教育充滿熱情？
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              品識學苑正在尋找志同道合的教育夥伴，一起為學生創造更好的學習體驗
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              asChild
            >
              <Link to="/teacher-recruitment">
                了解師資招募
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
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
              想認識適合孩子的老師？
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              預約免費諮詢，我們將根據學生的學習需求，為您推薦最適合的師資
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8"
            >
              預約免費諮詢
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
