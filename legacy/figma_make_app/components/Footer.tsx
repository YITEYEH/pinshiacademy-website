import { Link } from "react-router";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import logoImage from "../../imports/品識Logo.png";

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
];

const resourceLinks = [
  { name: "營運團隊", path: "/team" },
  { name: "學生成果", path: "/student-success" },
  { name: "學習專欄", path: "/blog" },
  { name: "常見問題", path: "/faq" },
];

export function Footer() {
  return (
    <footer className="bg-[#1a4d2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Core Values */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src={logoImage} alt="品識學苑" className="w-10 h-10" />
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
                    <span className="text-white text-sm font-bold">{value.icon}</span>
                  </div>
                  <div className="text-xs font-medium">{value.title}</div>
                  <div className="text-xs text-white/70">{value.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">快速連結</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">學習資源</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">聯絡我們</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/80">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>(02) 1234-5678</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/80">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>contact@pinshi.edu.tw</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>台北市信義區信義路五段7號</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © 2026 品識學苑 Pin Shi Academy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                隱私權政策
              </Link>
              <Link
                to="/terms"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                使用政策
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
