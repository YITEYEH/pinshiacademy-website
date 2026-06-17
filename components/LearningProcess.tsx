"use client";

import { ProcessTimeline } from "@/components/ProcessTimeline";
import { learningProcess } from "@/content/learning-process";

type LearningProcessProps = {
  showCta?: boolean;
  analyticsLabel?: string;
  className?: string;
};

export function LearningProcess({
  showCta = false,
  analyticsLabel = "learning_process_line_consult",
  className = "",
}: LearningProcessProps) {
  return (
    <ProcessTimeline
      title={learningProcess.title}
      description={learningProcess.description}
      steps={learningProcess.steps}
      showCta={showCta}
      analyticsLabel={analyticsLabel}
      className={className}
    />
  );
}
