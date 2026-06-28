"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { LINE_LINKS } from "@/lib/line-links";
import { BRAND_LOGO_PATH } from "@/lib/site-assets";

const navLinks = [
  { name: "主頁", path: "/" },
  { name: "關於我們", path: "/about" },
  { name: "師資團隊", path: "/teachers" },
];

const courseSubLinks = [
  { name: "課程介紹", path: "/courses" },
  { name: "課程費用", path: "/pricing" },
  { name: "線上預錄課程", path: "/online-courses" },
  { name: "直播公開課", path: "/live-events" },
];

const resourceGroups = [
  {
    label: "認識我們",
    links: [
      { name: "品牌故事", path: "/story" },
      { name: "營運團隊", path: "/team" },
      { name: "學生成果", path: "/student-success" },
    ],
  },
  {
    label: "學習內容",
    links: [{ name: "學習專欄", path: "/blog" }],
  },
  {
    label: "加入我們",
    links: [
      { name: "師資招募", path: "/teacher-recruitment" },
      { name: "營運團隊招募", path: "/team-recruitment" },
    ],
  },
  {
    label: "需要協助",
    links: [
      { name: "聯絡我們", path: "/contact" },
      { name: "常見問題", path: "/faq" },
    ],
  },
];

const resourceLinks = resourceGroups.flatMap((group) => group.links);

function isCourseNavActive(pathname: string) {
  return (
    pathname === "/courses" ||
    pathname === "/pricing" ||
    pathname === "/online-courses" ||
    pathname === "/live-events" ||
    pathname.startsWith("/courses/")
  );
}

function isResourceNavActive(pathname: string) {
  return resourceLinks.some(
    (link) =>
      pathname === link.path ||
      (link.path !== "/" && pathname.startsWith(`${link.path}/`)),
  );
}

function mobileNavLinkClass(active: boolean) {
  return `block rounded-lg px-3 py-2.5 text-sm transition-colors ${
    active
      ? "bg-accent font-medium text-accent-foreground"
      : "text-foreground hover:bg-accent/60"
  }`;
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const pathname = usePathname();
  const courseNavActive = isCourseNavActive(pathname);
  const resourceNavActive = isResourceNavActive(pathname);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileCoursesOpen(false);
    setMobileResourcesOpen(false);
  };

  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
      return;
    }

    setMobileMenuOpen(true);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <img
              src={BRAND_LOGO_PATH}
              alt="品識學苑"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-semibold text-foreground">
              品識學苑
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
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
              onMouseEnter={() => setCoursesOpen(true)}
              onMouseLeave={() => setCoursesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm transition-colors hover:text-primary ${
                  courseNavActive
                    ? "text-primary font-medium"
                    : "text-foreground"
                }`}
              >
                課程介紹
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {coursesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2"
                  >
                    {courseSubLinks.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        className={`block px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                          pathname === link.path
                            ? "text-primary font-medium"
                            : "text-foreground"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(2).map((link) => (
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
              <ExternalLinkOnce
                href={LINE_LINKS.consult}
                analyticsLabel="navbar_line_consult"
              >
                聯繫學習顧問
              </ExternalLinkOnce>
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={toggleMobileMenu}
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
              <div className="border-t border-border py-2">
                <div className="px-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={closeMobileMenu}
                      className={mobileNavLinkClass(pathname === link.path)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-1 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setMobileCoursesOpen((open) => !open)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                      courseNavActive ? "text-primary" : "text-foreground"
                    }`}
                    aria-expanded={mobileCoursesOpen}
                  >
                    課程介紹
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        mobileCoursesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileCoursesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-0.5 px-2 pb-2 pl-6">
                          {courseSubLinks.map((link) => (
                            <Link
                              key={link.path}
                              href={link.path}
                              onClick={closeMobileMenu}
                              className={mobileNavLinkClass(pathname === link.path)}
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setMobileResourcesOpen((open) => !open)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                      resourceNavActive ? "text-primary" : "text-foreground"
                    }`}
                    aria-expanded={mobileResourcesOpen}
                  >
                    學習資源
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        mobileResourcesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileResourcesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-0.5 px-2 pb-2 pl-6">
                          {resourceLinks.map((link) => (
                            <Link
                              key={link.path}
                              href={link.path}
                              onClick={closeMobileMenu}
                              className={mobileNavLinkClass(pathname === link.path)}
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-t border-border px-4 pt-3 pb-1">
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <ExternalLinkOnce
                      href={LINE_LINKS.consult}
                      analyticsLabel="navbar_line_consult"
                    >
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
