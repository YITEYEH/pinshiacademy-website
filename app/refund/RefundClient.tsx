"use client";

import { PolicyDocument } from "@/components/PolicyDocument";
import {
  refundPolicyIntro,
  refundPolicyMeta,
  refundPolicySections,
} from "@/content/refund-policy";

export function RefundClient() {
  return (
    <PolicyDocument
      title={refundPolicyMeta.title}
      subtitle={refundPolicyMeta.subtitle}
      intro={refundPolicyIntro}
      sections={refundPolicySections}
    />
  );
}
