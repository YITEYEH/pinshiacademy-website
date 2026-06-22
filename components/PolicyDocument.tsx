"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { trackContactEmail } from "@/lib/analytics";
import type { PolicyBlock, PolicySection } from "@/content/policy-document-types";

type PolicyDocumentProps = {
  title: string;
  subtitle: string;
  intro: readonly string[];
  sections: readonly PolicySection[];
  contactEmail?: string;
  companyName?: string;
};

function PolicyBlockView({
  block,
  contactEmail,
  companyName,
}: {
  block: PolicyBlock;
  contactEmail?: string;
  companyName?: string;
}) {
  if (block.type === "p") {
    return <p>{block.text}</p>;
  }

  if (block.type === "h3") {
    return <h3 className="text-base font-semibold text-foreground">{block.text}</h3>;
  }

  if (block.type === "ul") {
    return (
      <ul className="list-disc list-outside pl-6 space-y-2">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "ol") {
    return (
      <ol className="list-decimal list-outside pl-6 space-y-2">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    );
  }

  if (block.type === "internalLink") {
    return (
      <p>
        {block.before}
        <Link href={block.href} className="text-primary hover:underline">
          {block.linkText}
        </Link>
        {block.after}
      </p>
    );
  }

  if (!contactEmail || !companyName) return null;

  return (
    <div className="space-y-1">
      <p>{companyName}</p>
      <p>
        客服信箱：
        <a
          href={`mailto:${contactEmail}`}
          className="text-primary hover:underline break-all"
          onClick={() => trackContactEmail("policy_document")}
        >
          {contactEmail}
        </a>
      </p>
    </div>
  );
}

function PolicySectionBlock({
  section,
  contactEmail,
  companyName,
}: {
  section: PolicySection;
  contactEmail?: string;
  companyName?: string;
}) {
  return (
    <section className="space-y-4">
      {section.title ? (
        <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
      ) : null}
      {section.blocks.map((block, index) => (
        <PolicyBlockView
          key={`${section.title}-${index}`}
          block={block}
          contactEmail={contactEmail}
          companyName={companyName}
        />
      ))}
    </section>
  );
}

export function PolicyDocument({
  title,
  subtitle,
  intro,
  sections,
  contactEmail,
  companyName,
}: PolicyDocumentProps) {
  return (
    <div className="w-full">
      <section className="py-16 bg-gradient-to-br from-[#e8f5ee] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10 text-muted-foreground leading-relaxed text-[0.9375rem] sm:text-base"
          >
            <div className="space-y-4">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {sections.map((section) => (
              <PolicySectionBlock
                key={section.title}
                section={section}
                contactEmail={contactEmail}
                companyName={companyName}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
