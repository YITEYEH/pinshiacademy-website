import { learningProcess } from "@/content/learning-process";
import { SITE } from "@/lib/site";
import { organizationRef } from "@/lib/organization-schema";

export function buildLearningProcessHowToJsonLd() {
  return {
    "@type": "HowTo",
    "@id": `${SITE.url}/#learning-process`,
    name: learningProcess.title,
    description: learningProcess.description,
    step: learningProcess.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
    provider: organizationRef(),
  };
}

export function buildLearningProcessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [buildLearningProcessHowToJsonLd()],
  };
}
