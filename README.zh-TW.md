[English](README.md) | [繁體中文](README.zh-TW.md)

# MERN Course Platform - 全端課程管理系統實踐

這是一個基於 MERN Stack (MongoDB, Express, React, Node.js) 開發的課程管理平台。本專案的核心在於實踐權限驅動的架構設計 (Permission-driven Architecture) 與前後端一致的驗證機制，確保複雜全端應用中的資料完整性與 UI 行為的一致性。

- **Live Demo**: [course.tinahu.dev](https://course.tinahu.dev/)
- **測試帳號**：
  - 學生身分：`demo.student@tinahu.dev` / `DemoCourse2026`
  - 教師身分：講師註冊需要邀請碼，面試時可提供以便現場測試。

---

## 為什麼做這個專案

本專案旨在解決全端開發中常見的權限管理與資料同步難題：

- **權限驅動 UI**：確保不同角色（教師與學生）在同一系統下具備完全不同的操作流程與視圖。
- **資料驗證一致性**：解決前後端驗證規則不一導致的維護成本。
- **全端錯誤處理**：建立一套標準化的 API 回應與錯誤攔截機制。

---

## 專案結構與設計原則

本專案採用前後端分離架構，並遵循模組化設計原則：

```text
client/               # React 前端應用
  src/components/     # UI 元件 (分為共用元件與頁面專屬元件)
  src/services/       # 封裝 API 呼叫邏輯 (Auth, Course, Permission)
  src/validation/     # 前端 Joi 驗證 Schema
models/               # Mongoose 資料模型定義 (User, Course)
routes/               # Express 路由控制，結合權限中間件
validation/           # 後端 Joi 驗證邏輯 (與前端規則同步)
server.js             # 伺服器入口點與中間件配置

```

---

## 核心技術挑戰與決策 (Engineering Challenges & Decisions)

### 1. 權限驅動的 UI 系統設計 (Permission-driven UI Architecture)

- **挑戰**：在複雜應用中，若權限判斷邏輯分散在元件內，會造成維護困難且容易產生權限漏洞。
- **對策**：實作集中化的 Auth 與 Role 狀態管理。UI 元件本身不持有權限邏輯，而是根據權限服務回傳的狀態來決定渲染行為。
- **成果**：實現了「初始化無閃爍」的角色導航，且當新增角色（如助教）時，僅需調整 Service 層，無需大規模修改元件。

### 2. 基於 Joi 的模組化驗證 (Single Source of Truth for Validation)

- **挑戰**：前端驗證能提升 UX，但後端驗證才是安全核心。手寫兩套規則會導致系統脆弱。
- **對策**：使用 Joi 實作模組化的驗證 Schema。從前端的欄位攔截到後端的資料庫寫入，皆遵循同一套邏輯規範。
- **成果**：大幅降低了偵錯難度，並確保了全站資料格式的高一致性。

### 3. JWT 與 Passport.js 的安全性實踐

- **對策**：採用 JWT 進行無狀態驗證，並結合 Passport.js 策略模式管理身份認證。透過自定義中間件保護受限路由，確保教師功能（如開設課程）不會被非授權角色存取。

### 4. 全域錯誤處理與系統韌性 (Global Error Handling & Resilience) ✨(新增)

- **挑戰**：API 錯誤處理若散落在各個 Controller 與前端 Component 中，將導致除錯困難與不一致的使用者體驗。
- **對策**：
  - **後端**：實作 Global Error Middleware，統一攔截所有與預期外的錯誤，並標準化 API Error Response 結構。
  - **前端**：實作 Error Boundary 與 Axios Interceptor，當偵測到特定錯誤碼（如 401/403）或 Render 崩潰時，自動觸發 Fallback UI 或引導流程。
- **成果**：確保系統在發生局部錯誤時仍能維持運作，避免發生「白屏 (White Screen of Death)」現象。

---

## 主要功能

- **角色切換系統**：具備教師與學生雙重身分，具備各自專屬的 Dashboard。
- **課程生命週期管理**：實作課程的建立、編輯、發佈與學生端選課功能。
- **RESTful API 設計**：設計語義化的 API 端點，處理跨實體（使用者與課程）的關聯操作。
- **前端攔截器**：封裝 Axios 實例與攔截器，自動處理 Token 夾帶與錯誤狀態分流。

---

## 技術棧

- **Frontend**: React, React Router, CSS 模組化設計
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JWT, Passport.js
- **Validation**: Joi
- **Deployment**: Render / Vercel

---

## 品質保證 (Quality Assurance)

- **代碼規範**：遵循嚴格的程式碼風格，確保命名語義化與結構一致性。
- **自動化部署**：串接 Render (後端) 與 Vercel (前端) 實作 CI/CD 流程，確保每次代碼推送皆經過構建檢驗。
- **安全性控管**：實作 JWT 無狀態驗證機制，並透過後端中間件 (Middleware) 進行嚴格的路由保護與角色權限篩選。

---

## 關於我

此專案展示了我如何將採購職涯中的嚴謹邏輯轉化為前端工程的系統化思考。

- **Email**: tinahuu321@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/tina-hu-frontend
