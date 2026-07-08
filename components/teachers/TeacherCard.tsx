import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { cn } from "@/components/ui/utils";
import type { Teacher } from "@/content/teachers-data";

type TeacherCardProps = {
  teacher: Teacher;
};

export function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <Link
      href={`/teachers/${teacher.slug}`}
      className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <article className="grid h-full grid-cols-[7.5rem_1fr] overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg sm:grid-cols-[9.5rem_1fr]">
        <div className="relative min-h-[220px] bg-[#e8f5ee] sm:min-h-[240px]">
          <ImageWithFallback
            src={teacher.image}
            alt={teacher.name}
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              teacher.imagePosition === "center" ? "object-center" : "object-top",
            )}
          />
        </div>

        <div className="flex flex-col p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-foreground sm:text-xl">
                {teacher.name}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {teacher.experience}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary sm:px-3 sm:py-1 sm:text-sm">
              {teacher.subject}
            </span>
          </div>

          <p className="mt-3 border-l-2 border-primary pl-3 text-sm italic leading-relaxed text-foreground/80">
            {teacher.philosophy}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {teacher.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-[#e8f5ee] px-2 py-0.5 text-xs text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary transition-colors group-hover:text-[#1a4d2e]">
            認識老師
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
