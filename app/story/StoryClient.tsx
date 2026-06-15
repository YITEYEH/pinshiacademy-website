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
  coreValues,
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
            創辦人故事與品識學苑故事
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

            <p className="mb-8 sm:mb-10 text-lg sm:text-xl text-foreground leading-relaxed font-medium">
              分數是過程，理解才是底氣。
            </p>

            <StoryParagraphs paragraphs={founderStory.paragraphs} />

            <div className="my-8 sm:my-10 space-y-5 border-l-2 border-primary/25 pl-5 sm:pl-6">
              {founderStory.beliefs.map((belief) => (
                <p
                  key={belief}
                  className="text-base sm:text-[1.0625rem] text-foreground leading-[1.85]"
                >
                  {belief}
                </p>
              ))}
            </div>

            <StoryParagraphs paragraphs={founderStory.closing} />

            <footer className="mt-10 sm:mt-12 pt-6 text-right">
              <p className="text-base font-semibold text-foreground">
                — {founderStory.signature.name}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {founderStory.signature.title}
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
          </motion.article>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              我們的教育理念
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              品德 × 知識 × 見識 × 膽識
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border/60 bg-[#f7f9f7] p-4 sm:p-6 text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-white text-sm sm:text-base font-bold">
                    {value.icon}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
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
