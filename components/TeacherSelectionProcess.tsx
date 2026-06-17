"use client";

import { ProcessTimeline } from "@/components/ProcessTimeline";
import { teacherSelectionProcess } from "@/content/teacher-selection";

type TeacherSelectionProcessProps = {
  className?: string;
  sectionClassName?: string;
};

export function TeacherSelectionProcess({
  className = "",
  sectionClassName = "bg-white",
}: TeacherSelectionProcessProps) {
  return (
    <ProcessTimeline
      title={teacherSelectionProcess.title}
      description={teacherSelectionProcess.description}
      steps={teacherSelectionProcess.steps}
      className={className}
      sectionClassName={sectionClassName}
    />
  );
}
