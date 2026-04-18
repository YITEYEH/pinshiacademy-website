# 品識學苑 Webflow 重建指南

## 設計規範 (Design Tokens)

### 色彩系統
```
主色調（Primary）: #2D7A4F (質感綠色)
深綠色背景: #1a4d2e
前景文字: #2d3748 (深灰)
次要文字: #718096 (中灰)
淺灰背景: #f7f9f7
白色: #ffffff
輔助色調:
  - 藍色: #3b82f6 (英文科)
  - 紫色: #9333ea (數學科)
  - 琥珀色: #f59e0b (社會科)
  - 青綠色: #14b8a6 (自然科)
  - 玫瑰色: #f43f5e (升學策略)
淺色背景變體:
  - 綠色淺: #e8f5ee
  - 藍色淺: bg-blue-50
  - 紫色淺: bg-purple-50
  - 琥珀淺: bg-amber-50
  - 青綠淺: bg-teal-50
  - 玫瑰淺: bg-rose-50
```

### 字型
```
主要字型: 系統預設（-apple-system, BlinkMacSystemFont, "Segoe UI"）
基礎大小: 16px
標題字重: 700 (Bold) / 600 (Semi-bold)
內文字重: 400 (Regular) / 500 (Medium)
```

### 間距系統
```
極小: 4px
小: 8px
中: 16px
大: 24px
極大: 32px
超大: 48px
區塊間距: 80px (py-20)
```

### 圓角
```
小圓角: 8px
中圓角: 12px
大圓角: 16px
```

---

## 全域組件

### 1. Navbar（導覽列）
**結構：**
```
Container (max-width: 1280px, sticky top-0)
├─ Flex Container (justify-between, items-center, h-64px)
   ├─ Logo Group (flex, gap-8px)
   │  ├─ Logo Image (w-40px, h-40px)
   │  └─ 品識學苑 (text-xl, font-semibold)
   ├─ Nav Links (flex, gap-32px) [Desktop only]
   │  ├─ 主頁
   │  ├─ 關於我們
   │  ├─ 課程介紹
   │  ├─ 師資團隊
   │  └─ 學習資源 (Dropdown)
   │     └─ Dropdown Menu (absolute)
   │        ├─ 營運團隊
   │        ├─ 學生成果
   │        ├─ 學習專欄
   │        ├─ 師資招募
   │        ├─ 營運團隊招募
   │        └─ 常見問題
   └─ CTA Button "聯繫學習顧問" (bg-primary, text-white)
```

**Webflow 實作：**
1. 新增 Navbar 元素
2. 設定 sticky position
3. 使用 Flex 佈局
4. Dropdown 使用 Webflow 的 Dropdown 組件
5. 手機版使用 Hamburger Menu

---

### 2. Footer（頁尾）
**背景：** #1a4d2e（深綠色）
**文字：** 白色

**結構：**
```
Container (max-width: 1280px, padding-y: 48px)
├─ Top Section (Grid: 4 columns on desktop)
│  ├─ Column 1: 品牌與核心理念
│  │  ├─ Logo + 品識學苑
│  │  ├─ 簡介文字
│  │  └─ 4大核心理念卡片 (2x2 Grid)
│  │     ├─ 品德（品）
│  │     ├─ 知識（知）
│  │     ├─ 見識（見）
│  │     └─ 膽識（膽）
│  ├─ Column 2: 快速連結
│  ├─ Column 3: 學習資源
│  └─ Column 4: 聯絡我們
│     ├─ 電話、Email、地址
│     └─ 社群圖示（Facebook, Instagram, Youtube）
└─ Bottom Section (flex, justify-between)
   ├─ 版權聲明
   └─ 隱私權政策 | 使用政策
```

---

## 頁面結構

### Page 1: 主頁 (Home)

#### Section 1: Hero
- **背景：** 漸層 from-[#e8f5ee] to-white
- **佈局：** 2欄 Grid（Desktop），左右分佈
- **左側：**
  - H1: "陪伴每位學生找到學習節奏"
  - 副標題文字
  - 2個按鈕（主要CTA + 次要CTA）
- **右側：**
  - 學生學習圖片
  - 浮動數據卡片（95% 學生進步率）

#### Section 2: 四大核心理念
- **背景：** 白色
- **佈局：** 4欄 Grid
- **卡片內容：**
  - 綠色圓角方塊圖示（品/知/見/膽）
  - 標題
  - 英文副標題
  - 描述文字

#### Section 3: 痛點共鳴區
- **背景：** #f7f9f7
- **佈局：** 2欄 Grid
- **左側：** 傳統學習困境（紅色 X 圖示）
- **右側：** 品識學苑解方（綠色勾勾圖示）

#### Section 4: 課程導覽
- **背景：** 白色
- **佈局：** 3欄 Grid
- **科目卡片：** 6個（國英數社自+升學策略）
  - 淡色背景（依科目不同）
  - 科目圖示
  - 科目名稱
  - 描述文字

#### Section 5: 兩種學習方式
- **佈局：** 2欄 Grid
- **左卡片：** 家教制課程
  - Users 圖示
  - 標題、描述
  - 3個特色列點
- **右卡片：** 預錄課程
  - Video 圖示
  - 標題、描述
  - 3個特色列點

#### Section 6: 成效數據
- **背景：** #2D7A4F（主色）
- **佈局：** 4欄 Grid
- **內容：** 4組數據
  - 95% 學生進步率
  - 4.8 平均滿意度
  - 1000+ 輔導學生數
  - 15+ 專業師資

#### Section 7: 師資與評價輪播
- **背景：** 白色
- **佈局：** 居中的輪播卡片
- **內容：**
  - 老師圓形照片
  - 5星評價
  - 教學理念引言
  - 姓名與科目
  - 學生評價框
  - 左右切換按鈕

#### Section 8: Bottom CTA
- **背景：** 漸層 from-primary to-[#1a4d2e]
- **文字顏色：** 白色
- **內容：**
  - H2 標題
  - 副標題
  - 白色 CTA 按鈕（綠色文字）

---

### Page 2: 關於我們 (About)

#### Section 1: Hero
- 2欄佈局
- 左側文字 + 右側圖片

#### Section 2: 四大核心架構
- 4欄卡片 Grid
- 每張卡片有編號圓點（1-4）
- 圖示、標題、描述

#### Section 3: DAG 成長模型
- **背景：** 漸層綠色
- **文字：** 白色
- 3個步驟卡片（垂直排列）
  - Step 1: Diagnosis（診斷）
  - Step 2: Alignment（對齊）
  - Step 3: Growth（成長）

#### Section 4: 對照表
- Table 元素
- 3欄：比較項目 | 傳統補習班 | 品識學苑
- 品識學苑欄位使用淺綠背景

#### Section 5: Bottom CTA

---

### Page 3: 課程介紹 (Courses)

#### Section 1: Hero
- **課程類型切換按鈕：** 2個按鈕（家教制 / 預錄課程）
- **切換後顯示不同說明卡片**

#### Section 2: 課程卡片
- 6個科目卡片（垂直排列）
- 每張卡片 3欄 Grid：
  - 左 1/3：圖示、科目名稱、課程類型標籤
  - 右 2/3：教學特色（4個列點）+ 了解更多按鈕

---

### Page 4: 師資團隊 (Teachers)

#### Section 1: Hero
- 文字 + 3個特質卡片（Grid）

#### Section 2: 名師卡片
- 3欄 Grid（Desktop）
- 每張卡片：
  - 專業照片（4:3比例）
  - 姓名、經驗
  - 科目標籤
  - Tag 標籤（專長）
  - 教學理念（斜體引言）
  - 學生評價卡片（淺綠背景）

---

### Page 5: 營運團隊 (Team)

- 類似師資團隊
- 6位成員卡片
- 角色標籤取代科目標籤

---

### Page 6: 學生成果 (Student Success)

#### Timeline 結構（垂直）
每個故事包含：
- **Header：** 學生姓名 + 年級 + 科目
- **Before/After 對比：** 2欄 Grid
  - 左：紅色框（加入前分數）
  - 右：綠色框（6個月後分數）
- **學習歷程：** 3個階段卡片（時間軸點）
- **評語：** 引言框

---

### Page 7: 學習專欄 (Blog)

#### 佈局
- 左側：分類側邊欄（Sticky）
- 右側：文章卡片 Grid（2欄）

#### 文章卡片
- 分類 Icon + Badge
- 標題
- 摘要
- 日期 + 閱讀時間
- External Link 圖示

---

### Page 8-9: 師資/團隊招募

#### 結構
- Hero
- 核心價值（4個圖示卡片）
- 尋找特質（勾選清單，2欄）
- 發展路徑（3個階段卡片，帶箭頭）
- 福利（6個卡片 Grid）
- CTA

---

### Page 10: 常見問題 (FAQ)

#### 使用 Accordion 元素
- 4個分類
- 每個分類下多個問答
- 淺灰背景，展開時顯示答案

---

### Page 11-12: 隱私權/使用政策

#### 佈局
- 左側：章節導覽（Sticky，1/4 寬）
- 右側：內文（3/4 寬）
- 使用 anchor links 連結各章節

---

## 圖片資源

### Logo
- 檔案：`/src/imports/品識Logo.png`
- 使用位置：Navbar, Footer

### 學生/教學照片
來自 Unsplash，您需要替換為實際照片：
- Hero 區塊
- 師資照片
- 營運團隊照片

---

## 互動元素

### 動畫效果（Motion）
在 Webflow 中使用 Interactions：
1. **Scroll into view** - 淡入 + 上移
2. **Hover** - 卡片陰影加深
3. **輪播** - 師資評價切換
4. **Accordion** - FAQ 展開/收合
5. **Dropdown** - 導覽列下拉選單

### 狀態
- 導覽列 active 狀態（綠色）
- 按鈕 hover 狀態
- 課程類型切換（需要使用 Webflow Tabs 或自訂 JS）

---

## Webflow 實作步驟

### Step 1: 建立專案與設定
1. 在 Webflow 新增專案
2. 設定 Typography（字型大小、粗細）
3. 設定 Colors（加入所有色彩變數）
4. 建立 Symbol（Navbar, Footer）

### Step 2: 建立全域組件
1. 設計 Navbar（成為 Symbol）
2. 設計 Footer（成為 Symbol）

### Step 3: 逐頁建立
1. 建立各頁面
2. 使用 Container + Grid/Flex 佈局
3. 複製貼上卡片元素
4. 加入圖片與文字內容

### Step 4: 響應式設計
- 在 Tablet/Mobile breakpoint 調整 Grid columns
- 2欄變1欄
- 調整字型大小
- 隱藏/顯示特定元素

### Step 5: 加入互動
- 設定 Scroll Animations
- Hover 效果
- Dropdown/Accordion

### Step 6: 測試與發布
- 檢查所有連結
- 測試各裝置尺寸
- 發布到 Webflow hosting 或匯出程式碼

---

## 技術限制與替代方案

### Webflow 無法直接實作的功能：

1. **課程類型切換（Tab 功能）**
   - 解決方案：使用 Webflow Tabs 組件

2. **師資輪播**
   - 解決方案：使用 Webflow Slider 組件

3. **複雜的狀態管理**
   - 解決方案：使用 Webflow 內建互動或加入自訂 JS

---

## 匯出的程式碼參考

如果您需要參考實際的 HTML/CSS 結構，可以查看：
- `/src/app/pages/*.tsx` - 各頁面結構
- `/src/app/components/*.tsx` - 組件結構
- `/src/styles/theme.css` - 色彩定義

---

## 聯絡資訊
如有任何問題，隨時詢問！
