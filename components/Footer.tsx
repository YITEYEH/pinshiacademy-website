import Link from "next/link";
import { MapPin, Building2 } from "lucide-react";
import { CONTACT } from "@/lib/contact";
import {
  FooterContactEmail,
  FooterSocialLinks,
} from "@/components/FooterContactLinks";
import { BRAND_LOGO_PATH } from "@/lib/site-assets";

const coreValues = [
  { icon: "品", title: "品德", description: "培養良好品格" },
  { icon: "知", title: "知識", description: "建立紮實學識" },
  { icon: "見", title: "見識", description: "拓展視野格局" },
  { icon: "膽", title: "膽識", description: "勇於面對挑戰" },
];

const quickLinks = [
  { name: "主頁", path: "/" },
  { name: "關於我們", path: "/about" },
  { name: "課程介紹", path: "/courses" },
  { name: "師資團隊", path: "/teachers" },
  { name: "聯絡我們", path: "/contact" },
];

const resourceLinks = [
  { name: "品牌故事", path: "/story" },
  { name: "營運團隊", path: "/team" },
  { name: "學生成果", path: "/student-success" },
  { name: "學習專欄", path: "/blog" },
  { name: "常見問題", path: "/faq" },
  { name: "課程費用", path: "/pricing" },
  { name: "師資招募", path: "/teacher-recruitment" },
  { name: "營運團隊招募", path: "/team-recruitment" },
];

export function Footer() {
  return (
    <footer className="bg-[#1a4d2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img
                src={BRAND_LOGO_PATH}
                alt="品識學苑"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-semibold">品識學苑</span>
            </Link>
            <p className="text-sm text-white/80 mb-6">
              陪伴每位學生找到學習節奏，建立自信與成就感
            </p>
            <div className="grid grid-cols-2 gap-3">
              {coreValues.map((value) => (
                <div
                  key={value.title}
                  className="bg-white/10 rounded-lg p-3 backdrop-blur-sm"
                >
                  <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center mb-2">
                    <span className="text-white text-sm font-bold">
                      {value.icon}
                    </span>
                  </div>
                  <div className="text-xs font-medium">{value.title}</div>
                  <div className="text-xs text-white/70">
                    {value.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">快速連結</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">學習資源</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">聯絡我們</h3>
            <ul className="space-y-3.5">
              <FooterContactEmail />
              <li className="flex items-start gap-3 text-sm text-white/80">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/60" />
                <span className="leading-relaxed">
                  {CONTACT.registeredAddress}
                </span>
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3 text-sm">
                <Building2 className="w-4 h-4 mt-0.5 shrink-0 text-white/60" />
                <div className="space-y-1 leading-relaxed">
                  <p className="text-white/90 font-medium">
                    {CONTACT.companyName}
                  </p>
                  <p className="text-white/70">
                    統一編號{" "}
                    <span className="tabular-nums tracking-wide">
                      {CONTACT.taxId}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <FooterSocialLinks />
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © 2026 品識學苑 PinShi Academy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                隱私權政策
              </Link>
              <Link
                href="/terms"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                使用政策
              </Link>
              <Link
                href="/refund"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                退款條款
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

