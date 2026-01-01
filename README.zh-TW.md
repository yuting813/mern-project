# 線上課程平台 - MERN 全棧專案

[English](README.md) | [繁體中文](README.zh-TW.md)

這是一個使用 **MERN**（MongoDB, Express, React, Node.js）技術棧開發的線上課程平台。  
此專案為**面試導向的全棧作品**，重點展示權限系統設計、資料驗證一致性與可維護的前端架構，而非單純堆疊功能。

---

## 亮點

- 角色權限（Student / Instructor）
- 權限邏輯集中管理，UI 元件保持簡潔
- 完整課程流程：建立、註冊、退選、編輯
- Joi 驗證規則前後端一致（API 邊界與表單提交）
- UX 優化：Skeleton、Lazy Routes、行動裝置操作優化

---

## 關鍵設計決策

### 權限集中設計

避免在各元件中散落角色判斷，改以集中式邏輯管理：

- `PermissionService` 定義角色與動作權限
- `useAuthUser` 提供使用者資訊與權限旗標

讓 UI 元件更簡潔、可預測、易於擴充。

---

### 驗證策略

- 前端：提交前使用 Joi schema 驗證
- 後端：API 邊界使用 Joi 驗證  
  確保無效資料不進資料庫。

---

### UX 與穩定性

- Skeleton Loading 避免 CLS
- 非首頁路由 Lazy Load
- 行動裝置改用點擊展開

---

## 專案結構

以下為高層結構，前端以功能導向拆分，權限與業務邏輯集中管理：

```
├── client/                 # React 前端
├── config/                 # 伺服器配置
├── models/                 # Mongoose 模型
├── routes/                 # API 路由
├── validation/             # 後端驗證
└── server.js               # 伺服器入口
```

---

## API 端點（節錄）

- `POST /api/user/register`
- `POST /api/user/login`
- `GET /api/courses`
- `POST /api/courses/enroll/:id`
- `POST /api/courses/drop/:id`
- `PATCH /api/courses/:id`

---

## 技術棧

**前端**：React, React Router, Axios  
**後端**：Node.js, Express, MongoDB, Mongoose, JWT, Passport  
**驗證**：Joi  
**工具**：Concurrently, Nodemon, dotenv

---

## 快速開始

```bash
npm install
npm run clientinstall
npm run dev
```

---

## 環境變數

**root**
```
MONGODB_CONNECTION=
PASSPORT_SECRET=
INSTRUCTOR_INVITE_CODE=
```

**client**
```
REACT_APP_API_BASE_URL=http://localhost:8080
```

---

## 部署

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://course.tinahu.dev/)

---
