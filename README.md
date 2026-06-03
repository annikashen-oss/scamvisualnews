# 視覺化專題
# 危機伺服還四伏？網路詐騙帶來年輕人的信任危機

> 一個結合數據視覺化、滾動敘事（Scrollytelling）與深度訪談的融媒體專題，揭露台灣年輕世代遭受網路詐騙的真實面貌。

![專題封面](https://via.placeholder.com/1200x600?text=詐騙專題+截圖)  
*(建議放上你的網頁截圖或 demo gif)*

## 📖 專簡介

本專案以 **彥儒的真實受騙故事** 為切入點，透過問卷調查、學者訪談與官方統計數據，深入探討：

- 詐騙金額逐年攀升的現況  
- 詐騙手法的演化（面對面 → 電話 → 網路）  
- 年輕世代的網路使用習慣與人格特質  
- 被詐騙後的心理與行為影響  
- 防詐機制（可疑帳戶預警、打詐四法）  

全部內容以 **滾動觸發動畫、固定背景漸層、毛玻璃卡片、動態圖表** 等融媒體形式呈現，提供沉浸式閱讀體驗。

## ✨ 功能特點

- 🎬 **滾動敘事（Scrollytelling）**  
  使用 GSAP ScrollTrigger 控制對話氣泡、故事段落、文字雲等元素的淡入與上移動畫，劇情隨閱讀進度推進。

- 📊 **動態圖表**  
  - 自製長條圖、雷達圖、水平長條圖（Chart.js）  
  - 嵌入 Flourish 互動圖表（如受騙比例、時間軸）  
  - 數字跑馬燈、文字雲（滾動觸發）

- 🎨 **視覺設計**  
  - 固定漸層背景（#001881 → #62495f → #c0bd00）  
  - 動態深色遮罩（可隨滾動加深）  
  - 毛玻璃效果卡片（backdrop-filter）  
  - 支援多種字體家族（無襯線、襯線、等寬、手寫、裝飾）

- 📱 **響應式設計**  
  使用 Tailwind CSS 的網格系統與響應式工具，在手機、平板、桌機皆能舒適閱讀。

- 🚀 **輕鬆部署**  
  基於 Vite 建置，一鍵部署到 GitHub Pages。

## 🛠️ 技術棧

- **前端框架**：Vite + 原生 JavaScript (ES Module)
- **CSS 框架**：Tailwind CSS
- **動畫引擎**：GSAP (ScrollTrigger 插件)
- **圖表繪製**：Chart.js
- **互動圖表**：Flourish (iframe 嵌入)
- **字體**：Google Fonts (Noto Sans TC, Noto Serif TC, Fira Code, Gaegu, Rubik Glitch)
- **託管**：GitHub Pages

## 📁 專案結構
.
├── index.html # 主頁面（所有章節、圖表、對話框）
├── src/
│ ├── main.js # GSAP 動畫、Chart.js 初始化、文字雲生成
│ └── style.css # Tailwind 指令與自訂樣式（含背景強制覆蓋）
├── public/
│ └── images/ # 背景圖片（可選，目前使用純漸層）
├── package.json # 依賴與部署腳本
├── vite.config.js # Vite 設定（base 路徑）
├── tailwind.config.js # Tailwind 設定（字體擴展）
├── postcss.config.js # PostCSS 設定
└── README.md
## 📄 授權
本專案僅供教育與非商業用途使用。數據來源請參考頁面底部標註。

## 🙏 致謝
所有接受我們訪問的受訪者們。
資料來源：內政部警政署165打詐儀錶板
問卷參與者：所有填寫問卷的年輕朋友

製作團隊：記者 / 新聞與媒體實驗室
最後更新：2026 年 6 月
