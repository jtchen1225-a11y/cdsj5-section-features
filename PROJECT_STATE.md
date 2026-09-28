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

### 🌅 2026-09-28 16:33 開工同步與盤點 (Session Resumed)
- **遠端更新同步**：
  - 成功執行 `git pull --rebase`，拉取遠端最新 commits (`93e8c41`, `c4a063c`, `f6688fe`)。
  - **架構升級**：
    1. **公開展示首頁 (`index.html`)**：已升級為面向家長與學生的《聖若瑟五校五大學部教育故事》（圍繞「孩子怎樣學？得到甚麼成長？下一步走向哪裏？」三層架構）。
    2. **內部行政填報系統 (`admin-form.html`)**：完整保留教研處收集系統（含 15 門課程審閱、照片上傳、前端壓縮、燈箱與 GAS 後端連通）。
- **當前線上對應網址**：
  - 公開教育故事展示頁：`https://jtchen1225-a11y.github.io/cdsj5-section-features/`
  - 內部行政填報表單：`https://jtchen1225-a11y.github.io/cdsj5-section-features/admin-form.html`

---

## 🗂️ 核心檔案索引
- **公開教育故事首頁**：`cdsj5-section-features/index.html`
- **內部填報系統頁面**：`cdsj5-section-features/admin-form.html`
- **後端腳本原始碼**：`cdsj5-section-features/GoogleAppsScript_Web端接收與照片雲端儲存.gs`
- **雲端同步檔案**：`G:\我的雲端硬碟\04_行政組\26-27學校行政委員會Agenda\五大學部特色重點課程填報系統.html`
- **萬用模組庫**：`G:\我的雲端硬碟\04_行政組\【萬用模板】行政資料與照片快速收集系統\`
- **專屬 SKILL**：`C:\Users\CDSJ5\.gemini\config\skills\admin-form-collector\SKILL.md`

