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
- [ ] **階段七：各學部主任填報審核收尾與行政會匯報**（進行中）

---

## 📝 跨電腦交接日誌 (Session Handover Logs)

### 🌙 2026-09-25 21:55 收工交接存檔 (Session Wrapped Up)
- **本次完成重點**：
  1. **Google Apps Script 後端防呆修復**：解答了 `Exception: Invalid argument: name` 報錯原因（內部輔助函式 `getOrCreateFolder` 未帶參數引發），在底層加入預設值防呆保護，並指引使用專用函式 `授權與開通雲端硬碟權限`。
  2. **中學英文部 (SES) 文案更新**：課程 1 置換為《英語思辨・研究與表達成長計劃》，課程 3 置換為《卓越生涯 ‧ 多元升學輔導與生涯規劃矩陣》，融入 Pearson IGCSE/IAL 認證與 QS 前百升學亮點。
  3. **照片常駐與燈箱投影**：各學部主任上傳的照片實現 localStorage 永久保存，點擊支援 HD Lightbox 滿版全螢幕檢視，便於在大螢幕向校長匯報。
  4. **萬用模組沉澱**：在 `G:\我的雲端硬碟\04_行政組\【萬用模板】行政資料與照片快速收集系統\` 建立了通用後端腳本、通用 HTML 模板與 3 步快速建立 SOP 指南。
  5. **封裝為專屬 SKILL**：在 `C:\Users\CDSJ5\.gemini\config\skills\admin-form-collector\` 建立了學校行政專屬的 `admin-form-collector` 技能，日後一句話即可 30 秒自動生成收集系統。
- **保留進度與當前狀態**：
  - 前端與 GitHub Pages 運作正常：`https://jtchen1225-a11y.github.io/cdsj5-section-features/`。
  - 後端腳本已更新防呆加固，待泰主任在 Google Apps Script「管理部署作業」選擇「新版本」部署生效。
  - 雲端硬碟照片主資料夾已建立：`https://drive.google.com/drive/folders/1V1KqB_Z52j9qO-y9s3z86YtZgUqLwN-m`。
- **下次開工建議入口**：
  1. 確認五位學部主任線上填報與上傳照片狀況（可點擊網頁頂部「☁️ 雲端同步最新進度」拉取）。
  2. 若中學英文部 (SES) 課程 2 或其他學部有新的文案調校需求，直接更新對應卡片。

---

## 🗂️ 核心檔案索引
- **線上前端首頁**：`cdsj5-section-features/index.html`
- **後端腳本原始碼**：`cdsj5-section-features/GoogleAppsScript_Web端接收與照片雲端儲存.gs`
- **雲端同步檔案**：`G:\我的雲端硬碟\04_行政組\26-27學校行政委員會Agenda\五大學部特色重點課程填報系統.html`
- **萬用模組庫**：`G:\我的雲端硬碟\04_行政組\【萬用模板】行政資料與照片快速收集系統\`
- **專屬 SKILL**：`C:\Users\CDSJ5\.gemini\config\skills\admin-form-collector\SKILL.md`
