# 線上課程平台 - MERN 全棧專案
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://mern-project-ivory.vercel.app/)

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/API-Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/DB-MongoDB-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Passport](https://img.shields.io/badge/Auth-Passport-34E27A)


---
## 專案概述
這是一個使用 **MERN**（MongoDB, Express, React, Node.js）技術棧開發的線上課程平台，提供完整的課程管理與學習系統。  
此專案展示了我作為前端開發者的技能，包括 React 前端開發、與後端 API 整合、響應式設計以及現代化 UI 實作。

![專案封面圖](<img width="1904" height="888" alt="image" src="https://github.com/user-attachments/assets/102ea832-e601-4ec9-81d7-7510aa8405f2" />
)

---

## 核心功能

### 用戶管理

* **註冊 / 登入**：採用 **JWT + Passport.js** 驗證
* 角色區分：學生 / 講師
* 個人資料管理
* 講師註冊需邀請碼（後端驗證 .env 設定）


### 課程系統
* 課程列表瀏覽與關鍵字搜尋  
* **課程卡片橫向輪播**：支援滑鼠滾動、觸控滑動、動態箭頭顯示  
* 骨架屏載入效果，提升用戶體驗

### 講師專屬
* **完整課程 CRUD**（新增 / 編輯 / 刪除）  
  - 前後端 API 串接，包含權限驗證與錯誤處理  
  - 刪除或更新後即時同步 UI，避免重新整理  
* 查看自己上傳的課程列表

### 學生專屬
* 註冊課程  
* 退選已註冊課程  
* 查看個人課程清單

### UI / UX
* RWD 響應式版面  
* 觸控滑動支援（行動端優化）  
* 動態按鈕狀態與滾動箭頭顯示  

---

## 關鍵功能實作

### 1. 課程卡片輪播 (CourseCardScroller)
* 滾動箭頭動態顯示（首尾判斷）
* NearRightEdge 邊界判斷 → 調整卡片狀態
* 觸控滑動支援（行動裝置優化）
* 骨架屏：資料載入前顯示

### 2. 用戶註冊邀請碼驗證
```js
inviteCode: Joi.when("role", {
  is: "instructor",
  then: Joi.string().min(4).required()
})
```
* 後端比對 `.env` 中的 `INSTRUCTOR_INVITE_CODE`  
* 未設定或錯誤一律拒絕

### 3. 課程 API 封裝
* `course.service.js` 內部統一處理 **token 取得** 與 **錯誤處理**  
* 減少元件重複程式碼，提高可維護性

### 4. 課程 CRUD + 角色授權（Instructor / Student）
* **角色驅動的 UI 與權限**：Instructor 才能編輯/刪除，Student 才能退選  
* 後端以 JWT（payload 夾帶 `role`）驗證，未授權拒絕  
* **Joi 驗證**：建立/編輯課程時前後端一致驗證  
* 刪除/退選成功後，本地列表即時更新  
* `course.service.js` 封裝 Authorization 與錯誤格式，降低元件耦合度  

---

## 技術棧

### 前端
- **React**：構建 UI  
- **React Router**：路由管理  
- **Axios**：API 請求處理  
- **CSS**：自定義樣式與 RWD  
- **Joi**：前端表單驗證

### 後端
- **Node.js**：後端運行環境  
- **Express**：Web 應用框架  
- **MongoDB**：NoSQL 資料庫  
- **Mongoose**：ODM 工具  
- **Passport**：身份驗證中間件  
- **JWT**：Token 驗證  
- **Bcrypt**：密碼加密

### 開發工具
- **Concurrently**：同時啟動前後端  
- **Nodemon**：自動重啟伺服器  
- **dotenv**：環境變數管理  

---

## 專案結構
```
├── client/                 # React 前端
│   ├── public/             # 靜態資源
│   └── src/                # 源碼
│       ├── assets/         # 圖片資源
│       ├── components/     # React 元件
│       ├── pages/          # 頁面元件
│       ├── services/       # API 服務
│       ├── styles/         # CSS 樣式
│       ├── utils/          # 工具函數
│       └── validation/     # 表單驗證
├── config/                 # 配置檔
├── models/                 # Mongoose 資料模型
├── routes/                 # API 路由
├── validation/             # 後端驗證
└── server.js               # 伺服器入口
```

---

## 安裝與運行

### 前提條件
- Node.js (>=18.12.0)
- MongoDB

### 安裝步驟
1. clone專案
```bash
git clone https://github.com/yuting813/mern-project.git
cd mern-project
```
2. 安裝依賴
```bash
npm install
cd client
npm install
cd ..
```
3. 設定環境變數  
在根目錄與 `client/` 建立 `.env`，可參考 `.env.example`
4. 啟動開發模式
```bash
npm run dev
```

---

## API 端點示例

### 用戶
- `POST /api/user/register`：用戶註冊  
- `POST /api/user/login`：用戶登入  

### 課程
- `GET /api/courses`：取得全部課程  
- `GET /api/courses/:id`：取得單一課程  
- `POST /api/courses`：建立課程（講師）  
- `PATCH /api/courses/:id`：更新課程（講師）  
- `DELETE /api/courses/:id`：刪除課程（講師）  
- `POST /api/courses/enroll/:id`：學生註冊課程  
- `POST /api/courses/drop/:id`：學生退選課程  

---

## 部署
（此專案已部署於 Vercel）
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://mern-project-ivory.vercel.app/)

---

## 未來改進
- 課程評分與評論系統  
- 課程內容管理（影片 / 文件）  
- 支付功能整合  
- 行動端體驗優化  
- 數據分析與報表  

---

## 關於作者
此為面試展示專案，著重於前端實作與 MERN 全棧整合，  
包含 UI/UX 設計、API 串接與權限管理等完整開發流程。
