# GA4 設定與驗證

品識學苑官網使用 Google Analytics 4（測量 ID：`G-CKT21WVCLP`）。gtag 已在根 layout 集中載入，**不需**在各 `page.tsx` 重複貼 snippet。

## 1. 環境變數

### Vercel（Production / Preview）

1. Project → **Settings** → **Environment Variables**
2. 新增：`NEXT_PUBLIC_GA4_ID` = `G-CKT21WVCLP`
3. 重新部署

### 本機開發

在專案根目錄建立 `.env.local`（勿 commit）：

```
NEXT_PUBLIC_GA4_ID=G-CKT21WVCLP
```

重開 `npm run dev` 後生效。

## 2. 驗證追蹤是否正常

1. **GA4 即時報表**：Admin → Data streams → 選擇網站串流 → **即時**
2. 開啟 [https://www.pinshiacademy.com](https://www.pinshiacademy.com)（或本機 `http://localhost:3000`）
3. 即時報表應出現 1 位 active user
4. 瀏覽器 DevTools → **Network**，篩選 `G-CKT21WVCLP` 或 `collect`，應有請求

### DebugView（可選）

1. 安裝 [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephafjglhkml) Chrome 擴充
2. GA4 → **Admin** → **DebugView**
3. 點擊 Navbar「LINE 諮詢」→ 應出現 `outbound_click`，參數 `link_label: navbar_line_consult`

## 3. 已實作事件

| 事件名稱 | 觸發時機 | 主要參數 |
|----------|----------|----------|
| `page_view` | 自動（gtag config） | — |
| `outbound_click` | LINE 諮詢、招募外連、Footer 社群 | `link_label`, `link_url` |
| `contact_email_click` | 聯絡頁 / Footer Email | `link_label`（`contact_page` / `footer_email`） |
| `share_click` | 文章分享（複製 / Facebook / LINE） | `share_method`, `content_url` |
| `internal_nav_click` | 文章 CTA／師資捷徑／相關文章等站內導流 | `link_label`, `link_url` |

### `link_label` 命名參考

- `navbar_line_consult` — 導覽列 LINE
- `home_hero_line_consult` — 首頁 Hero
- `home_blog_section_line_consult` — 首頁最新專欄區 LINE
- `faq_line_consult` — FAQ 底部
- `landing_online_tutoring_line_consult` — 線上家教 landing
- `landing_senior_high_line_consult` — 高中升學 landing
- `landing_math_line_consult` — 數學課程 landing
- `story_line_consult` — 品牌故事頁 CTA
- `blog_article_line_consult`（及 `_elementary` / `_junior_high` / `_senior_high` / `_study_skills`）— 文章文末 CTA
- `blog_article_line_consult_*_mid` — 文章中段 compact CTA
- `blog_article_sticky_line_consult` — 文章頁手機 sticky LINE
- `blog_article_nav_*` / `blog_article_trust_*` — 文章次要／師資捷徑
- `blog_related_{slug}` — 相關文章點擊
- `teacher_recruitment_apply` / `team_recruitment_apply` — 招募外連
- `footer_social_facebook` / `instagram` / `youtube` — Footer 社群

## 4. GA4 後台建議設定

### 標記 Key event（轉換）

1. **Admin** → **Events**
2. 找到 `outbound_click` → **Mark as key event**
3. （可選）建立自訂條件：僅計 `link_url` 包含 `lin.ee` 的 LINE 諮詢
4. （建議）將 `internal_nav_click` 也標記為 key event，用來量測「文章 → 課程／師資」漏斗

### 註冊自訂維度

在 **Admin → Custom definitions** 註冊：

- `link_label`（Event-scoped）
- `link_url`（Event-scoped）

否則探索報表可能看不到參數值。

### 每週探索報表（轉換漏斗）

1. **Explore** → 空白報表
2. 維度：`Page path and screen class`、`Event name`、`link_label`
3. 指標：`Event count`、`Sessions`
4. 篩選或對比：
   - `outbound_click`：哪一頁 LINE 點擊最多
   - `internal_nav_click`：文章導向課程／師資／費用的成效
5. 建議漏斗判讀：`/blog/*` 瀏覽 → `internal_nav_click` 或文章 LINE → `/courses`、`/teachers`、`/pricing` 造訪（這些頁跳出通常較低）

### 假流量過濾（解讀時必做）

報表若出現異常高瀏覽、極低參與，或來源 IP／城市集中在資料中心：

- **Singapore、Ashburn（Virginia）** 等常見雲端節點，多半是爬蟲／預抓，**勿當成真實家長流量**
- GA4 → **Admin → Data filters**（或探索報表排除）：可依國家／地區、主機名稱、或已知 bot 模式過濾
- 解讀 organic 時優先看：課程、師資、費用、LINE 點擊，不要只看專欄列表瀏覽量

### Teachify／直播跨網域

- 直播報名落在 Teachify 網域，官網 GA4 **看不到報名完成**
- 目前可量測：官網 `outbound_click`／直播卡片點擊、以及 Teachify 後台報名人數（分開看）
- 若要串漏斗，後續可評估：跨網域測量或 Teachify UTM + 手動對帳

## 5. 相關程式檔

| 檔案 | 用途 |
|------|------|
| `app/layout.tsx` | 條件渲染 GA 元件 |
| `components/GoogleAnalytics.tsx` | 載入 gtag.js |
| `lib/analytics-env.ts` | 讀取 `NEXT_PUBLIC_GA4_ID` |
| `lib/analytics.ts` | 自訂事件 helper |
| `components/ExternalLinkOnce.tsx` | LINE / 外連點擊追蹤 |
| `lib/line-links.ts` | LINE 短網址 + UTM 參數 |

## 6. WordPress fallback 告警

當 WP GraphQL 連線失敗、Blog 退回本機 MDX 時：

- Vercel **Logs** 會出現 `[wp-fallback]` JSON（每操作每 5 分鐘最多一則，避免洗版）
- 可選：設定 `WP_FALLBACK_WEBHOOK_URL`（Slack / Discord incoming webhook）接收告警 JSON

