"use client";

import { TeachersFaculty } from "@/components/teachers/TeachersFaculty";
import { TeachersFinalCta } from "@/components/teachers/TeachersFinalCta";
import { TeachersFit } from "@/components/teachers/TeachersFit";
import { TeachersGrowth } from "@/components/teachers/TeachersGrowth";
import { TeachersHero } from "@/components/teachers/TeachersHero";
import { TeachersSelectionJourney } from "@/components/teachers/TeachersSelectionJourney";
import { TeachersStatement } from "@/components/teachers/TeachersStatement";
import { TeachersTeamBridge } from "@/components/teachers/TeachersTeamBridge";

export function TeachersClient() {
  return (
    <div className="w-full overflow-x-clip">
      <TeachersHero />
      <TeachersStatement />
      <TeachersFaculty />
      <TeachersSelectionJourney />
      <TeachersFit />
      <TeachersTeamBridge />
      <TeachersGrowth />
      <TeachersFinalCta />
    </div>
  );
}
