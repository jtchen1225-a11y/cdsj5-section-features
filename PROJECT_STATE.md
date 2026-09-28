# 聖若瑟五校 ‧ 五大學部特色重點課程填報系統
# PROJECT_STATE.md 專案狀態與跨裝置交接紀錄

## 📌 專案核心目標 (Project Goals)
為聖若瑟教區中學第五校（CDSJ5）課程發展及教研處（泰主任），打造「新版校網五大學部特色專區」之線上填報與呈報展示系統。
- **前端網頁**：純靜態高顏值前端，支援 15 門課程文案審閱微調、每門課 2 張照片上傳（Canvas 前端壓縮至 80KB）、本地永久快取（localStorage 防手滑丟失）、大圖燈箱（Lightbox）投影匯報、即時填報狀態徽章。
- **後端引擎**：Google Apps Script (Web App) + Google Drive + Google Sheets。自動建立「五大學部特色課程照片庫 / [學部] 主任姓名 (時間)」子資料夾，並在試算表記錄直連超連結。
- **線上網址**：`https://jtchen1225-a11y.github.io/cdsj5-section-features/`

---

## 🚦 當前進度階段 (Current Stage)
- [x] **階段一：基礎填報介面與分支選單**（完成）
- [x] **階段二：中學中文部 (SCS) 1+4 應用、小學中文部 (PCS) 常識探究文案更新**（完成）
- [x] **階段三：中學英文部 (SES) 英語思辨 (Course 1) 與卓越生涯升學 (Course 3) 課綱置換**（完成）
- [x] **階段四：每門課程 2 張照片上傳、前端壓縮、本機常駐、燈箱放大**（完成）
- [x] **階段五：Google Apps Script 後端 Drive 分類存檔、防呆預設值加固、全域共享容錯**（完成）
- [x] **階段六：提取萬用收集系統模組，封裝為專屬 SKILL `admin-form-collector`**（完成）
- [x] **階段七：官網雙層架構分離（首頁轉化為教育故事公開展示頁，填報系統獨立為 admin-form.html）**（完成）
- [ ] **階段八：各學部主任填報審核收尾與行政會匯報**（進行中）

---

## 📝 跨電腦交接日誌 (Session Handover Logs)

### 🌅 2026-09-28 16:42 中學英文部 (SES) 課綱完整置換與照片永久常駐強化
- **中學英文部 (SES) 課綱置換完成**：
  1. **課程 1**：《英語思辨・研究與表達成長計劃》（含跨學科研究、English Club 模聯辯論、學以致用表達）。
  2. **課程 2**：《立足母語底蘊，厚植中華傳統文化，對接升學及實務語言教學》（含傳統文化與古詩文薰陶、四校聯考 JAE 對接、雙軌思維與演說辯論）。
  3. **課程 3**：《卓越生涯 ‧ 多元升學輔導與生涯規劃矩陣》（含 Pearson IGCSE/IAL 直考、內地保送與四校聯考、QS 前百升學亮點）。
- **前端照片永久常駐與主動切換強化**：
  - 增設 active section 記憶機制（優先讀取 URL query `?sec=SES`，次讀 localStorage，預設鎖定 SES）。重新整理或重開瀏覽器自動停留於 SES，照片與自訂文字立即可見、絕不消失。
  - 修復 `restoreCurrentSectionState`：預設採用模式下始終動態渲染最新課綱，微調編輯區同步聯動。
- **公開展示頁 (`index.html`) 協同更新**：
  - 頂部導覽列加入「📝 填報系統」按鈕直達 `admin-form.html`。
  - 更新 SES 教育故事卡片，納入母語底蘊厚植與四校聯考要素。
- **檔案同步與版本控制**：
  - 雲端硬碟 `五大學部特色重點課程填報系統.html` 已同步覆蓋。
  - GitHub Pages 倉庫即時推送。

---

## 🗂️ 核心檔案索引
- **公開教育故事首頁**：`cdsj5-section-features/index.html`
- **內部填報系統頁面**：`cdsj5-section-features/admin-form.html`
- **後端腳本原始碼**：`cdsj5-section-features/GoogleAppsScript_Web端接收與照片雲端儲存.gs`
- **雲端同步檔案**：`G:\我的雲端硬碟\04_行政組\26-27學校行政委員會Agenda\五大學部特色重點課程填報系統.html`
- **萬用模組庫**：`G:\我的雲端硬碟\04_行政組\【萬用模板】行政資料與照片快速收集系統\`
- **專屬 SKILL**：`C:\Users\CDSJ5\.gemini\config\skills\admin-form-collector\SKILL.md`

