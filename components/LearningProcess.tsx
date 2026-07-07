"use client";

import { ProcessTimeline } from "@/components/ProcessTimeline";
import { learningProcess } from "@/content/learning-process";

import { LINE_CTA_LABELS } from "@/lib/line-cta";

type LearningProcessProps = {
  showCta?: boolean;
  analyticsLabel?: string;
  ctaLabel?: string;
  className?: string;
};

export function LearningProcess({
  showCta = false,
  analyticsLabel = "learning_process_line_consult",
  ctaLabel = LINE_CTA_LABELS.homeProcess,
  className = "",
}: LearningProcessProps) {
  return (
    <ProcessTimeline
      title={learningProcess.title}
      description={learningProcess.description}
      steps={learningProcess.steps}
      showCta={showCta}
      analyticsLabel={analyticsLabel}
      ctaLabel={ctaLabel}
      className={className}
    />
  );
}
