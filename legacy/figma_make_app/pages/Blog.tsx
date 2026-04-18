import { motion } from "motion/react";
import { ExternalLink, BookOpen, Lightbulb, Target } from "lucide-react";

const blogPosts = [
  {
    category: "學習方法",
    icon: Lightbulb,
    title: "如何培養自主學習能力",
    excerpt: "探討如何引導孩子建立良好的學習習慣，從被動接受到主動探索",
    link: "#",
    date: "2026-04-10",
    readTime: "5分鐘閱讀",
  },
  {
    category: "教育觀點",
    icon: Target,
    title: "成績之外，更重要的事",
    excerpt: "分數不是唯一指標，培養學習動機與思考能力才是長遠之道",
    link: "#",
    date: "2026-04-05",
    readTime: "6分鐘閱讀",
  },
  {
    category: "學習方法",
    icon: BookOpen,
    title: "數學概念理解的三個層次",
    excerpt: "從記憶公式到理解原理，再到靈活應用的學習路徑",
    link: "#",
    date: "2026-03-28",
    readTime: "7分鐘閱讀",
  },
  {
    category: "親子溝通",
    icon: Lightbulb,
    title: "如何與孩子談論學習壓力",
    excerpt: "建立良好的親子溝通，理解孩子的學習困境與心理需求",
    link: "#",
    date: "2026-03-20",
    readTime: "5分鐘閱讀",
  },
  {
    category: "教育觀點",
    icon: Target,
    title: "小班制教學的優勢",
    excerpt: "為什麼個人化關注能帶來更好的學習成效",
    link: "#",
    date: "2026-03-15",
    readTime: "4分鐘閱讀",
  },
  {
    category: "學習方法",
    icon: BookOpen,
    title: "英文單字記憶的有效策略",
    excerpt: "從情境學習到字根字首，打造長期記憶的單字學習法",
    link: "#",
    date: "2026-03-08",
    readTime: "6分鐘閱讀",
  },
];

const categories = [
  { name: "全部", count: 6 },
  { name: "學習方法", count: 3 },
  { name: "教育觀點", count: 2 },
  { name: "親子溝通", count: 1 },
];

export function Blog() {
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
              學習專欄
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              分享教育理念、學習方法與親子溝通的文章，幫助家長與學生建立更好的學習體驗
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-[#f7f9f7] rounded-xl p-6 sticky top-24"
              >
                <h3 className="font-semibold text-foreground mb-4">分類</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-white transition-colors flex items-center justify-between group"
                    >
                      <span className="text-sm text-foreground group-hover:text-primary">
                        {category.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Blog Posts Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts.map((post, index) => (
                  <motion.a
                    key={index}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                  >
                    <div className="p-6">
                      {/* Category Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <post.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.date}</span>
                        <div className="flex items-center gap-2">
                          <span>{post.readTime}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f7f9f7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              想了解更多學習資訊？
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              關注我們的社群媒體，獲取最新的教育文章與學習資源
            </p>
            <div className="text-sm text-muted-foreground">
              這些文章連結將導向外部學習平台
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
