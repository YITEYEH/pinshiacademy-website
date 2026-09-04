import { SITE } from "@/lib/site";
import { buildNotFoundMarkdown } from "@/lib/agent-recovery";
import {
  homeCourses,
  homeFinalCta,
  homeHero,
  homeHowWeHelp,
  homeLineValue,
  homePainPoints,
  homeTeachers,
} from "@/content/home/page-copy";
import { learningProcess } from "@/content/learning-process";
import { teachers } from "@/content/teachers-data";
import { faqCategories } from "@/content/faq-data";

export type MarkdownPageResult =
  | { status: 200; body: string }
  | { status: 404; body: string };

function normalizePath(slug: string[] | undefined): string {
  if (!slug || slug.length === 0) return "/";
  return `/${slug.join("/")}`.replace(/\/+/g, "/");
}

function homeMarkdown(): string {
  const painList = homePainPoints.cards
    .map((c) => `- ${c.number} ${c.line1}${c.line2}`)
    .join("\n");
  const howSteps = homeHowWeHelp.steps
    .map((s) => `### ${s.number} ${s.title}\n\n${s.description}`)
    .join("\n\n");
  const formats = homeCourses.formats
    .map((f) => `- **${f.name}**: ${f.description}`)
    .join("\n");
  const teachersList = teachers
    .map((t) => `- **${t.name}**（${t.subject}）：${t.grades}；${t.experience}`)
    .join("\n");

  return [
    `# ${SITE.name}（${SITE.englishName}）`,
    "",
    `Canonical: ${SITE.url}`,
    "",
    `## ${homeHero.h1Line1}`,
    "",
    `${homeHero.h1Line2}`,
    `${homeHero.h1Line3}`,
    "",
    homeHero.subtitle,
    "",
    `## ${homePainPoints.title}`,
    "",
    painList,
    "",
    homePainPoints.closing,
    "",
    `## ${homeLineValue.titleLine1}`,
    "",
    homeLineValue.titleLine2,
    "",
    homeLineValue.body,
    "",
    homeLineValue.conversationHint,
    "",
    `## ${homeHowWeHelp.titleLine1}`,
    "",
    homeHowWeHelp.titleLine2,
    "",
    howSteps,
    "",
    `> ${homeHowWeHelp.highlight}`,
    "",
    `## ${homeCourses.titleLine1}`,
    "",
    homeCourses.titleLine2,
    "",
    formats,
    "",
    homeCourses.closing,
    "",
    `## ${homeTeachers.title}`,
    "",
    homeTeachers.subtitle,
    "",
    teachersList,
    "",
    `## ${learningProcess.title}`,
    "",
    learningProcess.description,
    "",
    ...learningProcess.steps.map(
      (s, i) => `${i + 1}. **${s.title}** — ${s.description}`,
    ),
    "",
    `## ${homeFinalCta.titleLine1}`,
    "",
    homeFinalCta.titleLine2,
    "",
    homeFinalCta.subtitle,
    "",
    `- Contact / LINE consult: ${SITE.url}/contact`,
    `- Courses: ${SITE.url}/courses`,
    `- Teachers: ${SITE.url}/teachers`,
    `- FAQ: ${SITE.url}/faq`,
    `- AI index: ${SITE.url}/llms.txt`,
    "",
  ].join("\n");
}

function stubPage(title: string, summary: string, path: string): string {
  return [
    `# ${title}`,
    "",
    summary,
    "",
    `Full HTML page: ${SITE.url}${path}`,
    "",
    "See also:",
    "",
    `- [llms.txt](${SITE.url}/llms.txt)`,
    `- [Sitemap](${SITE.url}/sitemap.xml)`,
    `- [Home](${SITE.url}/)`,
    "",
  ].join("\n");
}

function faqMarkdown(): string {
  const sections = faqCategories.map((cat) => {
    const qs = cat.questions
      .map((q) => `### ${q.q}\n\n${q.a}`)
      .join("\n\n");
    return `## ${cat.category}\n\n${qs}`;
  });
  return [
    `# 常見問題｜${SITE.name}`,
    "",
    `Canonical: ${SITE.url}/faq`,
    "",
    ...sections,
    "",
  ].join("\n");
}

function teachersMarkdown(): string {
  const blocks = teachers.map((t) =>
    [
      `## ${t.name}`,
      "",
      `- Subject: ${t.subject}`,
      `- Grades: ${t.grades}`,
      `- ${t.jobTitle} · ${t.experience}`,
      `- Profile: ${SITE.url}/teachers/${t.slug}`,
      "",
      t.philosophy,
      "",
      t.bio,
      "",
    ].join("\n"),
  );
  return [
    `# 核心教師團隊｜${SITE.name}`,
    "",
    `Canonical: ${SITE.url}/teachers`,
    "",
    ...blocks,
  ].join("\n");
}

const PAGE_BUILDERS: Record<string, () => string> = {
  "/": homeMarkdown,
  "/faq": faqMarkdown,
  "/teachers": teachersMarkdown,
  "/about": () =>
    stubPage(
      `關於我們｜${SITE.name}`,
      SITE.defaultDescription,
      "/about",
    ),
  "/courses": () =>
    stubPage(
      `課程介紹｜${SITE.name}`,
      "品識學苑提供國文、英文、數學、社會、自然的一對一與小班制線上輔導，以及預錄課程與直播公開課",
      "/courses",
    ),
  "/pricing": () =>
    stubPage(
      `課程費用｜${SITE.name}`,
      "國小至高中參考價格與計費方式，實際費用依科目、班型與方案調整",
      "/pricing",
    ),
  "/contact": () =>
    stubPage(
      `聯絡我們｜${SITE.name}`,
      "透過 LINE 官方帳號或聯絡表單預約學習評估，不需先選課",
      "/contact",
    ),
  "/blog": () =>
    stubPage(
      `學習專欄｜${SITE.name}`,
      "會考、學測讀書方法與升學攻略文章列表",
      "/blog",
    ),
  "/student-success": () =>
    stubPage(
      `學生成果｜${SITE.name}`,
      "學生成長故事、學習改變與家長回饋",
      "/student-success",
    ),
  "/team": () =>
    stubPage(
      `三師共學｜${SITE.name}`,
      "授課老師、解題老師與輔導老師共同陪伴學習",
      "/team",
    ),
  "/online-courses": () =>
    stubPage(
      `線上預錄課程｜${SITE.name}`,
      "可反覆觀看的預錄課程；購買與上課於 Teachify（pinshiacademy.tw）",
      "/online-courses",
    ),
  "/live-events": () =>
    stubPage(
      `直播公開課｜${SITE.name}`,
      "近期免費／公開直播場次；報名於 Teachify 平台",
      "/live-events",
    ),
  "/story": () =>
    stubPage(
      `品牌故事｜${SITE.name}`,
      "創辦人初心與教育理念介紹",
      "/story",
    ),
  "/dream-project": () =>
    stubPage(
      `築夢計畫｜${SITE.name}`,
      "教育影響力計畫：課程支持與學習陪伴申請",
      "/dream-project",
    ),
};

/** Map URL path segments to markdown body */
export function getMarkdownForPath(slug?: string[]): MarkdownPageResult {
  const path = normalizePath(slug);
  const builder = PAGE_BUILDERS[path];
  if (!builder) {
    return { status: 404, body: buildNotFoundMarkdown(path) };
  }
  return { status: 200, body: builder() };
}

export function listMarkdownPaths(): string[] {
  return Object.keys(PAGE_BUILDERS);
}
