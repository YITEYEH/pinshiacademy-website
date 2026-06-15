"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { LINE_LINKS } from "@/lib/line-links";
import {
  academyOrigin,
  founderStory,
} from "@/content/story-content";

function StoryParagraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="space-y-5 text-base sm:text-[1.0625rem] text-muted-foreground leading-[1.85]">
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

export function StoryClient() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="py-12 sm:py-14 lg:py-20 bg-gradient-to-br from-[#e8f5ee] to-white border-b border-border/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-primary mb-3">品牌故事</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            創辦人初心與品識學苑理念
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            從一位學生的困惑，到一座願意陪伴理解的教育品牌。
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-foreground"
          >
            <header className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-border/70">
              <p className="text-sm font-medium text-primary mb-3">創辦人故事</p>
              <h2 className="text-2xl sm:text-[1.75rem] font-bold leading-snug mb-6 sm:mb-8">
                {founderStory.subtitle}
              </h2>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 ring-1 ring-border/80">
                  <ImageWithFallback
                    src={founderStory.signature.image}
                    alt={founderStory.signature.name}
                    className="w-full h-full object-cover object-[50%_18%] scale-[1.15]"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {founderStory.signature.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {founderStory.signature.title}
                  </p>
                </div>
              </div>
            </header>

            <StoryParagraphs paragraphs={founderStory.paragraphs} />

            <div className="my-8 sm:my-10">
              <p className="text-base sm:text-[1.0625rem] text-muted-foreground leading-[1.85] mb-4">
                {founderStory.beliefsIntro}
              </p>
              <div className="space-y-5 border-l-2 border-primary/25 pl-5 sm:pl-6">
                {founderStory.beliefs.map((belief) => (
                  <p
                    key={belief}
                    className="text-base sm:text-[1.0625rem] text-foreground leading-[1.85]"
                  >
                    {belief}
                  </p>
                ))}
              </div>
            </div>

            <StoryParagraphs paragraphs={founderStory.closing} />

            <footer className="mt-10 sm:mt-12 pt-6 text-right">
              <p className="text-base font-semibold text-foreground">
                — {founderStory.signature.title} {founderStory.signature.name}
              </p>
            </footer>
          </motion.article>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-[#f7f9f7] border-y border-border/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <header className="mb-8 sm:mb-10">
              <p className="text-sm font-medium text-primary mb-3">品識學苑故事</p>
              <h2 className="text-2xl sm:text-[1.75rem] font-bold text-foreground leading-snug">
                {academyOrigin.title}
              </h2>
            </header>
            <StoryParagraphs paragraphs={academyOrigin.paragraphs} />

            <div className="my-8 sm:my-10">
              <p className="text-base sm:text-[1.0625rem] text-muted-foreground leading-[1.85] mb-4">
                {academyOrigin.reflectionIntro}
              </p>
              <div className="space-y-3 border-l-2 border-primary/25 pl-5 sm:pl-6 mb-8 sm:mb-10">
                {academyOrigin.questions.map((question) => (
                  <p
                    key={question}
                    className="text-base sm:text-[1.0625rem] text-foreground leading-[1.85]"
                  >
                    {question}
                  </p>
                ))}
              </div>
            </div>

            <StoryParagraphs paragraphs={academyOrigin.afterQuestions} />

            <div className="my-8 sm:my-10 space-y-6">
              {academyOrigin.pillars.map((pillar) => (
                <div key={pillar.title} className="flex gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-primary rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{pillar.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-base sm:text-[1.0625rem] font-semibold text-foreground leading-relaxed mb-1.5">
                      {pillar.title}，{pillar.tagline}
                    </p>
                    <p className="text-base sm:text-[1.0625rem] text-muted-foreground leading-[1.85]">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <StoryParagraphs paragraphs={academyOrigin.closing} />

            <div className="mt-8 sm:mt-10">
              <p className="text-base sm:text-[1.0625rem] text-muted-foreground leading-[1.85] mb-4">
                {academyOrigin.beliefsIntro}
              </p>
              <div className="space-y-5 border-l-2 border-primary/25 pl-5 sm:pl-6">
                {academyOrigin.beliefs.map((belief) => (
                  <p
                    key={belief}
                    className="text-base sm:text-[1.0625rem] text-foreground leading-[1.85]"
                  >
                    {belief}
                  </p>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary to-[#1a4d2e]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
            想為孩子找到適合的學習方式？
          </h2>
          <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
            歡迎預約免費諮詢，我們會依學生程度與目標，協助規劃學習方向。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
              asChild
            >
              <ExternalLinkOnce
                href={LINE_LINKS.consult}
                analyticsLabel="story_line_consult"
              >
                預約免費諮詢
                <ArrowRight className="ml-2 w-5 h-5" />
              </ExternalLinkOnce>
            </Button>
            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
              asChild
            >
              <Link href="/teachers">認識師資團隊</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
