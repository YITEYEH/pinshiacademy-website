"use client";

import { Facebook, Instagram, Mail, Youtube } from "lucide-react";
import { CONTACT } from "@/lib/contact";
import { trackContactEmail, trackSocialClick } from "@/lib/analytics";
import { SOCIAL_LINKS } from "@/lib/social-links";

const socialItems = [
  { platform: "facebook", href: SOCIAL_LINKS.facebook, Icon: Facebook, label: "Facebook" },
  { platform: "instagram", href: SOCIAL_LINKS.instagram, Icon: Instagram, label: "Instagram" },
  { platform: "youtube", href: SOCIAL_LINKS.youtube, Icon: Youtube, label: "YouTube" },
] as const;

export function FooterContactEmail() {
  return (
    <li className="flex items-start gap-3 text-sm text-white/80">
      <Mail className="w-4 h-4 mt-0.5 shrink-0 text-white/60" />
      <a
        href={`mailto:${CONTACT.email}`}
        className="hover:text-white transition-colors break-all"
        onClick={() => trackContactEmail("footer_email")}
      >
        {CONTACT.email}
      </a>
    </li>
  );
}

export function FooterSocialLinks() {
  return (
    <div className="flex gap-3 mt-6">
      {socialItems.map(({ platform, href, Icon, label }) => (
        <a
          key={platform}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label={label}
          onClick={() => trackSocialClick(platform, href)}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}
