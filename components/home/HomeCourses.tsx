import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LineCtaButton } from "@/components/LineCtaButton";
import { homeCourses } from "@/content/home/page-copy";
import { LINE_LINKS } from "@/lib/line-links";

export function HomeCourses() {
  const {
    titleLine1,
    titleLine2,
    formats,
    closing,
    lineCta,
  } = homeCourses;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl lg:text-4xl">
            <span className="block">{titleLine1}</span>
            <span className="block">{titleLine2}</span>
          </h2>
        </div>

        <div className="mx-auto mb-12 grid max-w-5xl gap-4 md:grid-cols-3 md:gap-5">
          {formats.map((format) => (
            <article
              key={format.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-[#f7f9f7] p-6"
            >
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {format.name}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {format.description}
              </p>
              <Link
                href={format.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                {format.linkLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center">
          <p className="mb-5 text-base text-muted-foreground sm:text-lg">
            {closing}
          </p>
          <LineCtaButton
            href={LINE_LINKS.consult}
            analyticsLabel="home_course_line_consult"
            ctaLocation="course"
            label={lineCta}
            className="px-8"
          />
        </div>
      </div>
    </section>
  );
}
