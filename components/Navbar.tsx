"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { LineCtaLabel } from "@/components/LineCtaLabel";
import { ExternalLinkOnce } from "@/components/ExternalLinkOnce";
import { LINE_CTA_LABELS } from "@/lib/line-cta";
import { LINE_LINKS } from "@/lib/line-links";
import { scheduleScrollToTop } from "@/lib/scroll-to-top";
import { BRAND_LOGO_PATH } from "@/lib/site-assets";

const aboutSubLinks = [
  { name: "關於我們", path: "/about" },
  { name: "品牌故事", path: "/story" },
];

const dreamProjectPath = "/dream-project";

const courseSubLinks = [
  { name: "課程介紹", path: "/courses" },
  { name: "課程費用", path: "/pricing" },
  { name: "線上預錄課程", path: "/online-courses" },
  { name: "直播公開課", path: "/live-events" },
];

const teamSubLinks = [
  { name: "核心教師團隊", path: "/teachers" },
  { name: "學習支持團隊", path: "/team" },
  { name: "師資團隊招募", path: "/teacher-recruitment" },
  { name: "營運團隊招募", path: "/team-recruitment" },
];

const resourceLinks = [
  { name: "學生成果", path: "/student-success" },
  { name: "學習專欄", path: "/blog" },
  { name: "聯絡我們", path: "/contact" },
  { name: "常見問題", path: "/faq" },
];

function isAboutNavActive(pathname: string) {
  return aboutSubLinks.some(
    (link) =>
      pathname === link.path ||
      (link.path !== "/" && pathname.startsWith(`${link.path}/`)),
  );
}

function isCourseNavActive(pathname: string) {
  return (
    pathname === "/courses" ||
    pathname === "/pricing" ||
    pathname === "/online-courses" ||
    pathname === "/live-events" ||
    pathname.startsWith("/courses/")
  );
}

function isTeamNavActive(pathname: string) {
  return teamSubLinks.some(
    (link) =>
      pathname === link.path ||
      (link.path !== "/" && pathname.startsWith(`${link.path}/`)),
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

function dropdownLinkClass(active: boolean) {
  return `block px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
    active ? "text-primary font-medium" : "text-foreground"
  }`;
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileTeamOpen, setMobileTeamOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const pathname = usePathname();
  const aboutNavActive = isAboutNavActive(pathname);
  const courseNavActive = isCourseNavActive(pathname);
  const teamNavActive = isTeamNavActive(pathname);
  const resourceNavActive = isResourceNavActive(pathname);
  const dreamProjectNavActive =
    pathname === dreamProjectPath ||
    pathname.startsWith(`${dreamProjectPath}/`);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileAboutOpen(false);
    setMobileCoursesOpen(false);
    setMobileTeamOpen(false);
    setMobileResourcesOpen(false);
  };

  const handleMobileNavClick = () => {
    closeMobileMenu();
    // 選單收合動畫結束後再重試，避免手機端捲動被動畫與導頁時序打亂
    scheduleScrollToTop();
    window.setTimeout(scheduleScrollToTop, 350);
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
            <Image
              src={BRAND_LOGO_PATH}
              alt="品識學苑"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
            <span className="text-xl font-semibold text-foreground">
              品識學苑
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm transition-colors hover:text-primary ${
                pathname === "/"
                  ? "text-primary font-medium"
                  : "text-foreground"
              }`}
            >
              主頁
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm transition-colors hover:text-primary ${
                  aboutNavActive
                    ? "text-primary font-medium"
                    : "text-foreground"
                }`}
              >
                關於我們
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2"
                  >
                    {aboutSubLinks.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        className={dropdownLinkClass(pathname === link.path)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
                        className={dropdownLinkClass(pathname === link.path)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setTeamOpen(true)}
              onMouseLeave={() => setTeamOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm transition-colors hover:text-primary ${
                  teamNavActive
                    ? "text-primary font-medium"
                    : "text-foreground"
                }`}
              >
                團隊介紹
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {teamOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2"
                  >
                    {teamSubLinks.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        className={dropdownLinkClass(pathname === link.path)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm transition-colors hover:text-primary ${
                  resourceNavActive
                    ? "text-primary font-medium"
                    : "text-foreground"
                }`}
              >
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
                        className={dropdownLinkClass(pathname === link.path)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              className={`h-9 rounded-full border-primary/35 px-4 text-sm ${
                dreamProjectNavActive
                  ? "border-primary bg-primary/5 font-medium text-primary"
                  : "text-primary hover:bg-primary/5"
              }`}
              asChild
            >
              <Link href={dreamProjectPath}>築夢計畫</Link>
            </Button>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <ExternalLinkOnce
                href={LINE_LINKS.consult}
                analyticsLabel="navbar_line_consult"
              >
                <LineCtaLabel iconClassName="size-4" label={LINE_CTA_LABELS.navbar} />
              </ExternalLinkOnce>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button
              size="sm"
              className="h-10 shrink-0 rounded-full bg-primary px-4 text-sm font-semibold hover:bg-primary/90"
              asChild
            >
              <ExternalLinkOnce
                href={LINE_LINKS.consult}
                analyticsLabel="navbar_mobile_header_line"
              >
                <LineCtaLabel
                  iconClassName="size-4"
                  label={LINE_CTA_LABELS.navbarMobile}
                />
              </ExternalLinkOnce>
            </Button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-[#f7f9f7]"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "關閉選單" : "開啟選單"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
                  <Link
                    href="/"
                    onClick={handleMobileNavClick}
                    className={mobileNavLinkClass(pathname === "/")}
                  >
                    主頁
                  </Link>
                </div>

                <div className="mt-1 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setMobileAboutOpen((open) => !open)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                      aboutNavActive ? "text-primary" : "text-foreground"
                    }`}
                    aria-expanded={mobileAboutOpen}
                  >
                    關於我們
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        mobileAboutOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileAboutOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-0.5 px-2 pb-2 pl-6">
                          {aboutSubLinks.map((link) => (
                            <Link
                              key={link.path}
                              href={link.path}
                              onClick={handleMobileNavClick}
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
                              onClick={handleMobileNavClick}
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
                    onClick={() => setMobileTeamOpen((open) => !open)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                      teamNavActive ? "text-primary" : "text-foreground"
                    }`}
                    aria-expanded={mobileTeamOpen}
                  >
                    團隊介紹
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        mobileTeamOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileTeamOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-0.5 px-2 pb-2 pl-6">
                          {teamSubLinks.map((link) => (
                            <Link
                              key={link.path}
                              href={link.path}
                              onClick={handleMobileNavClick}
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
                              onClick={handleMobileNavClick}
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

                <div className="space-y-2 border-t border-border px-4 pt-3 pb-1">
                  <Button
                    variant="outline"
                    className={`w-full rounded-full border-primary/35 ${
                      dreamProjectNavActive
                        ? "border-primary bg-primary/5 font-medium text-primary"
                        : "text-primary hover:bg-primary/5"
                    }`}
                    asChild
                  >
                    <Link href={dreamProjectPath} onClick={handleMobileNavClick}>
                      築夢計畫
                    </Link>
                  </Button>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <ExternalLinkOnce
                      href={LINE_LINKS.consult}
                      analyticsLabel="navbar_line_consult"
                    >
                      <LineCtaLabel iconClassName="size-4" label={LINE_CTA_LABELS.navbar} />
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
