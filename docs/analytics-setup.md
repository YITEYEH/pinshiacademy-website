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

### `link_label` 命名參考

- `navbar_line_consult` — 導覽列 LINE
- `home_hero_line_consult` — 首頁 Hero
- `faq_line_consult` — FAQ 底部
- `landing_online_tutoring_line_consult` — 線上家教 landing
- `landing_senior_high_line_consult` — 高中升學 landing
- `landing_math_line_consult` — 數學課程 landing
- `blog_index_line_consult` — 學習專欄列表底
- `blog_article_line_consult` — 文章內諮詢 CTA
- `teacher_recruitment_apply` / `team_recruitment_apply` — 招募外連
- `footer_social_facebook` / `instagram` / `youtube` — Footer 社群

## 4. GA4 後台建議設定

### 標記 Key event（轉換）

1. **Admin** → **Events**
2. 找到 `outbound_click` → **Mark as key event**
3. （可選）建立自訂條件：僅計 `link_url` 包含 `lin.ee` 的 LINE 諮詢

### 每週探索報表

1. **Explore** → 空白報表
2. 維度：`Page path and screen class`、`Event name`、`link_label`（自訂參數）
3. 指標：`Event count`
4. 篩選：`Event name` = `outbound_click`
5. 每週檢視：哪一頁 LINE 點擊最多 / 最少，作為 CTA 優化依據

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

