"use client";

import { PolicyDocument } from "@/components/PolicyDocument";
import {
  termsOfServiceIntro,
  termsOfServiceMeta,
  termsOfServiceSections,
} from "@/content/terms-of-service";

export function TermsClient() {
  return (
    <PolicyDocument
      title={termsOfServiceMeta.title}
      subtitle={termsOfServiceMeta.subtitle}
      intro={termsOfServiceIntro}
      sections={termsOfServiceSections}
    />
  );
}
