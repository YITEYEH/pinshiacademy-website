"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";

const navLinks = [
  { name: "主頁", path: "/" },
  { name: "關於我們", path: "/about" },
  { name: "課程介紹", path: "/courses" },
  { name: "師資團隊", path: "/teachers" },
];

const resourceLinks = [
  { name: "營運團隊", path: "/team" },
  { name: "學生成果", path: "/student-success" },
  { name: "學習專欄", path: "/blog" },
  { name: "師資招募", path: "/teacher-recruitment" },
  { name: "營運團隊招募", path: "/team-recruitment" },
  { name: "常見問題", path: "/faq" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/brand/logo.png"
              alt="品識學苑"
              className="w-10 h-10"
            />
            <span className="text-xl font-semibold text-foreground">
              品識學苑
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm transition-colors hover:text-primary ${
                  pathname === link.path
                    ? "text-primary font-medium"
                    : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors">
                學習資源
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2"
                  >
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden md:block">
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <ExternalLinkOnce href="https://lin.ee/8nQNuYl">
                聯繫學習顧問
              </ExternalLinkOnce>
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "關閉選單" : "開啟選單"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                      pathname === link.path
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-accent"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="px-4 py-2">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    學習資源
                  </div>
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-foreground hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="px-4 pt-2">
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <ExternalLinkOnce href="https://lin.ee/8nQNuYl">
                      聯繫學習顧問
                    </ExternalLinkOnce>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

