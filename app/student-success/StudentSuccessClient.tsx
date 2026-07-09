"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineCtaButton } from "@/components/LineCtaButton";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
import { LINE_LINKS } from "@/lib/line-links";
import { successStories } from "@/content/student-success-stories";

export function StudentSuccessClient() {
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
              學生成功故事
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              每個孩子都有無限潛能，只需要找到適合的學習方式。看看他們如何在品識學苑找到學習的節奏，建立自信，穩定進步。
            </p>
            <div className="flex justify-center gap-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">學生進步率</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">+28分</div>
                <div className="text-sm text-muted-foreground">平均進步幅度</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">4.8</div>
                <div className="text-sm text-muted-foreground">學生滿意度</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {story.name} · {story.grade}
                    </h2>
                    <div className="text-lg text-primary">{story.subject}科</div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-400">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl font-bold text-red-600">
                        {story.before.score}
                      </div>
                      <div className="text-sm text-muted-foreground">加入前</div>
                    </div>
                    <p className="text-foreground mb-4">{story.before.description}</p>
                    <div className="space-y-2">
                      {story.before.challenges.map((challenge, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-red-400 mt-0.5">•</span>
                          <span>{challenge}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#e8f5ee] rounded-xl p-6 border-l-4 border-primary">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl font-bold text-primary">
                        {story.after.score}
                      </div>
                      <div className="text-sm text-muted-foreground">6個月後</div>
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-foreground mb-4">{story.after.description}</p>
                    <div className="space-y-2">
                      {story.after.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#f7f9f7] rounded-xl p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    學習歷程
                  </h3>
                  <div className="space-y-6">
                    {story.journey.map((phase, i) => (
                      <div key={i} className="relative pl-8">
                        <div className="absolute left-0 top-1 w-4 h-4 bg-primary rounded-full"></div>
                        {i < story.journey.length - 1 && (
                          <div className="absolute left-[7px] top-5 w-0.5 h-full bg-primary/20"></div>
                        )}
                        <div className="mb-2">
                          <span className="font-semibold text-foreground">
                            {phase.period}
                          </span>
                          <span className="text-primary ml-2">· {phase.focus}</span>
                        </div>
                        <ul className="space-y-1">
                          {phase.actions.map((action, j) => (
                            <li
                              key={j}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary/60 mt-0.5 flex-shrink-0" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-xl p-6 border border-primary/20 italic">
                  <p className="text-foreground">
                    &ldquo;{story.testimonial}&rdquo;
                  </p>
                  <div className="text-sm text-muted-foreground mt-2">
                    — {story.name}
                  </div>
                </div>

                {index < successStories.length - 1 && (
                  <div className="mt-20 border-t border-border"></div>
                )}
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
              下一個成功故事就是您的孩子
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              立即預約免費諮詢，讓我們一起規劃專屬的學習成長計畫
            </p>
            <LineCtaButton
              href={LINE_LINKS.consult}
              analyticsLabel="student_success_line_consult"
              label={LINE_CTA_LABELS.studentSuccess}
              variant="inverse"
              className="text-lg px-8"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

