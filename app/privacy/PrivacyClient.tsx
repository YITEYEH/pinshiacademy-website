"use client";

import { PolicyDocument } from "@/components/PolicyDocument";
import {
  privacyPolicyCompanyName,
  privacyPolicyContactEmail,
  privacyPolicyIntro,
  privacyPolicyMeta,
  privacyPolicySections,
} from "@/content/privacy-policy";

export function PrivacyClient() {
  return (
    <PolicyDocument
      title={privacyPolicyMeta.title}
      subtitle={privacyPolicyMeta.subtitle}
      intro={privacyPolicyIntro}
      sections={privacyPolicySections}
      contactEmail={privacyPolicyContactEmail}
      companyName={privacyPolicyCompanyName}
    />
  );
}
