"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StickyLineCta } from "@/components/StickyLineCta";
import { LearningProcess } from "@/components/LearningProcess";
import { TeachersTeamBridge } from "@/components/teachers/TeachersTeamBridge";
import { HomePainPoints } from "@/components/home/HomePainPoints";
import { HomeLineValue } from "@/components/home/HomeLineValue";
import { HomeHowWeHelp } from "@/components/home/HomeHowWeHelp";
import { HomeProof } from "@/components/home/HomeProof";
import { HomeCourses } from "@/components/home/HomeCourses";
import { HomeTeachersTrust } from "@/components/home/HomeTeachersTrust";
import { HomeBrandValues } from "@/components/home/HomeBrandValues";
import { HomeFinalCta } from "@/components/home/HomeFinalCta";
import { homeSticky } from "@/content/home/page-copy";
import { dreamProjectHomePromo } from "@/content/dream-project/page-copy";
import type { BlogPostSummary } from "@/content/content-api/types";

type HomeClientProps = {
  latestPosts: BlogPostSummary[];
};

export function HomeClient({ latestPosts }: HomeClientProps) {
  return (
    <div className="w-full pb-24 md:pb-0">
      <HomePainPoints />
      <HomeLineValue />
      <HomeHowWeHelp />
      <HomeProof />
      <TeachersTeamBridge />
      <HomeCourses />
      <LearningProcess analyticsLabel="home_learning_process_line_consult" />
      <HomeTeachersTrust />
      <HomeBrandValues />

      <section className="bg-[#f7f9f7] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-medium text-primary">
              {dreamProjectHomePromo.tagline}
            </p>
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              {dreamProjectHomePromo.title}
            </h2>
            <div className="mb-8 space-y-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {dreamProjectHomePromo.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Button
              size="lg"
              className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="/dream-project">
                {dreamProjectHomePromo.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              最新學習專欄
            </h2>
            <ul className="space-y-4">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block rounded-lg border border-border bg-white p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                  >
                    <div className="mb-1 text-xs text-muted-foreground">
                      {post.frontmatter.date}
                    </div>
                    <div className="font-medium leading-snug text-foreground">
                      {post.frontmatter.title}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              瀏覽全部文章
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      <HomeFinalCta />

      <StickyLineCta
        analyticsLabel="home_sticky_line_consult"
        ctaLocation="mobile_sticky"
        dismissKey="psa_home_sticky_line_dismissed"
        message={homeSticky.message}
        label={homeSticky.label}
      />
    </div>
  );
}
