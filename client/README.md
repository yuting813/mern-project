# Client (React) — 課程管理系統前端架構

[Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)

> 隸屬於 MERN Course Platform 的前端子專案。 本文件專注於說明 React 端如何透過 SOA 架構 與 權限驅動設計，解決前後端分離開發中的狀態同步與維護性問題。

---

## 專案定位

這是一個基於 React 開發的課程管理介面。負責處理複雜路由、身分驗證、權限動態渲染，以及課程 CRUD 的 UI 互動與 API 串接。 系統與後端（Express + MongoDB）透過環境變數 REACT_APP_API_BASE_URL 進行解耦通訊，確保開發與部署環境的靈活性。

## 工程亮點 (Engineering Highlights)

這裡不僅是實作功能，更著重於 可維護性 (Maintainability) 與 系統設計 (System Design)：

### 1. 系統架構設計 (Service-Oriented Architecture)

- **設計決策**：採用 SOA 概念，將 API 請求與業務邏輯（Business Logic）完全抽離至 `Service Layer`。
- **效益**：確保 UI 組件（View）與 API 資料結構（Model）解耦。若後端 API 欄位變更，僅需修改 Service 層，無需查找並修改所有 UI 組件，大幅降低維護成本。

### 2. 語意化權限控制 (Semantic Permission Logic)

- **設計決策**：實作 `PermissionService` 與 `useAuthUser` Hook。
- **效益**：UI 組件僅根據「語意旗標」（如 `canEdit`, `isInstructor`）進行渲染，而非直接在 JSX 中判斷 `user.role === 'teacher'` 等原始資料。這提升了代碼的可讀性，也讓權限邏輯集中管理，便於測試。

### 3. 狀態可預測性 (Predictable State)

- **設計決策**：針對 API 的生命週期——加載中（Loading）、權限不足（Forbidden）與錯誤情境（Error Handling）——實作一致的 UI 處理機制。
- **效益**：消除「介面閃爍」或「無回應」的體驗，確保用戶在各種邊際情況（Edge Cases）下都能獲得連貫的系統回饋。

### 4. 性能優化 (Performance & UX)

- **設計決策**：
- **Code Splitting**：導入 Route-based Code Splitting，利用 `React.lazy` + `Suspense` 減少首屏加載體積（Bundle Size）。
- **Art Direction**：針對響應式圖片採用 Art Direction 技術，精準控制 Mobile/Desktop 下載不同尺寸的資源，節省頻寬並提升 LCP (Largest Contentful Paint) 指標。

## 技術棧與重點速覽 (Tech Stack & TL;DR)

- **Core**: React 18, React Router v6
- **Network**: Axios (Encapsulated in Service Layer)
- **UI Framework**: Bootstrap 5 (Customized)
- **Optimization**: React.lazy + Suspense
- **Auth**: JWT (Bearer Token) + LocalStorage Persistence
- **Deployment**: Express Static Serving (Production) + Catch-all Route

## 專案結構 (Project Structure)

設計思維：UI 僅使用語意旗標，不直接讀取後端 Raw Data 結構，降低耦合度。

```
client/src/
├── components/           # 可復用 UI 組件（視覺與邏輯分離）
│   ├── CourseCard/       # 課程卡片（封裝權限判斷，內部消化 canEdit 邏輯）
│   ├── Navigation/       # 導航列（含 Responsive Menu）
│   └── common/           # 通用組件（Spinner, Alert, Modal - 確保全站 UI 一致性）
├── pages/                # 頁面級組件（配合 React.lazy 進行路由層級拆分）
├── services/             # API 服務層（Service Layer / API Clients）
│   ├── auth.service.js   # 封裝註冊、登入與 Token 管理
│   └── course.service.js # 封裝課程 CRUD，自動夾帶 Auth Header
├── hooks/                # 自定義 Hooks（業務邏輯抽離，如 useAuthUser）
├── utils/                # 工具函數（資料正規化 normalizeUser）
├── styles/               # 全局與組件樣式
└── validation/           # 前端表單驗證（Joi Schemas）

```

## 認證與權限架構 (Auth & Permissions)

### 1. 狀態管理與持久化

- **流程**：登入成功後，前端將 `{ token, user }` 存入 `localStorage`。
- **安全性**：Service Layer 在發出請求時，會自動從持久化存儲讀取 Token，並注入 Axios 的 `Authorization` Header，確保 Token 不會暴露在 URL 或不必要的組件 Props 中。

### 2. 語意化權限判斷 (Code Example)

透過自定義 Hook 封裝複雜邏輯，讓組件內代碼保持「宣告式（Declarative）」的簡潔風格：

```jsx
// 範例：在課程列表頁面
// UI 不需知道 "誰" 是老師，只需知道 "如何" 獲取數據
const { uid, isInstructor, getCoursesFetcher } = useAuthUser(currentUser);

useEffect(() => {
  // 透過 Service Layer 取得正確的 Fetcher（多型策略）
  // 學生 => 獲取已註冊課程; 講師 => 獲取已發布課程
  const fetcher = getCoursesFetcher();

  if (uid) {
    fetcher(uid).then(setCourseData).catch(handleError); // 統一錯誤處理
  }
}, [getCoursesFetcher, uid]);
```

## RESTful API 對接表

前端透過統一的介面與後端溝通，以下為核心功能對接：

| 方法  | 端點 (Endpoint)         | 功能描述      | 權限要求              |
| ----- | ----------------------- | ------------- | --------------------- |
| POST  | /api/user/login         | 用戶登入      | 公開                  |
| GET   | /api/courses            | 獲取課程列表  | 認證用戶              |
| POST  | /api/courses            | 建立新課程    | 講師限定 (Instructor) |
| PATCH | /api/courses/:id        | 更新課程內容  | 課程持有者 (Owner)    |
| POST  | /api/courses/enroll/:id | 註冊/選修課程 | 學生限定 (Student)    |

## 開發環境設定 (Development Setup)

```bash
# 1. 進入前端目錄
cd client

# 2. 安裝依賴
npm install

# 3. 配置環境變數
# 請確保 .env 中的 REACT_APP_API_BASE_URL 正確指向後端
cp .env.example .env

# 4. 啟動開發伺服器
npm start

```

## 建置與部署 (Build & Deploy)

本專案採用 Hybrid Deployment 策略，Production 環境下由後端伺服器託管前端資源。

```bash
# 產出物位於: client/build 目錄
npm run build

```

**Production 運作邏輯**：

1. 後端 Express 配置靜態資源服務指向 `client/build`。
2. **關鍵配置**：後端需配置「萬用路由（Catch-all Route）」，將所有非 API 請求重導向至 `index.html`，以支援 React Router 的 History Mode 運作（避免重新整理後 404）。

## 疑難排解 (Troubleshooting)

**SPA 404 錯誤**

- **現象**：在子路由（如 `/courses/edit`）重新整理頁面時出現 404。
- **解法**：確認後端是否已正確配置 `app.get('*', ...)` 轉向 `index.html`。

**API 連線失敗**

- **檢查**：打開瀏覽器 DevTools Network 面板，檢查 Request URL 是否正確。
- **解法**：確認 `.env` 中的 `REACT_APP_API_BASE_URL` 是否包含 `http://` 協議前綴及正確 Port 號。

**CORS 問題**

- **現象**：Console 出現 "Access-Control-Allow-Origin" 錯誤。
- **解法**：開發模式下，請確認後端 Express 的 `cors()` 中介軟體已放行前端開發網域（如 `localhost:3000`）。
