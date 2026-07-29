"use client";

import { DreamHero } from "@/components/dream-project/DreamHero";
import { MissionSection } from "@/components/dream-project/MissionSection";
import { SupportServices } from "@/components/dream-project/SupportServices";
import { EligibilitySection } from "@/components/dream-project/EligibilitySection";
import { VisionTimeline } from "@/components/dream-project/VisionTimeline";
import { CommitmentSection } from "@/components/dream-project/CommitmentSection";
import { JoinCards } from "@/components/dream-project/JoinCards";
import { DreamFAQ } from "@/components/dream-project/DreamFAQ";
import { FinalCTA } from "@/components/dream-project/FinalCTA";

export function DreamProjectClient() {
  return (
    <div className="w-full">
      <DreamHero />
      <MissionSection />
      <SupportServices />
      <EligibilitySection />
      <VisionTimeline />
      <CommitmentSection />
      <JoinCards />
      <DreamFAQ />
      <FinalCTA />
    </div>
  );
}
