"use client";

import { BrandBelief } from "@/components/team/BrandBelief";
import { CollaborationMap } from "@/components/team/CollaborationMap";
import { OperationFlow } from "@/components/team/OperationFlow";
import { RoleSection } from "@/components/team/RoleSection";
import { TeamFinalCta } from "@/components/team/TeamFinalCta";
import { ThreeTeachersHero } from "@/components/team/ThreeTeachersHero";
import { WhyThreeTeachers } from "@/components/team/WhyThreeTeachers";
import { threeTeacherRoles } from "@/content/team/page-copy";

export function TeamClient() {
  return (
    <div className="w-full">
      <ThreeTeachersHero />
      <WhyThreeTeachers />
      {threeTeacherRoles.map((role, index) => (
        <RoleSection key={role.id} role={role} index={index} />
      ))}
      <CollaborationMap />
      <OperationFlow />
      <BrandBelief />
      <TeamFinalCta />
    </div>
  );
}
