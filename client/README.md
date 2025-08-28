

````md
# Client (React) — MERN 課程平台

> 前端子專案（React）。負責路由、身分驗證、權限渲染、課程 CRUD 的 UI 與 API 串接。  
> 與後端（Express + MongoDB + JWT）透過 `REACT_APP_API_BASE_URL` 溝通。

---

## TL;DR
- **技術**：React、React Router、Axios、Bootstrap（樣式）、Lazy Loading (`React.lazy + Suspense`)
- **認證**：JWT（字串以 `JWT ` 前綴），登入後以 `localStorage.user` 保存 `{ token, user }`
- **權限**：`useAuthUser` + `PermissionService` 導出 `isInstructor / isStudent / isLoggedIn` 與 `canEditCourse` 等能力旗標
- **服務層**：`AuthService`、`CourseService`（所有需要的請求會自動夾帶 `Authorization` header）

---

## 快速開始

```bash
cd client
npm install

# 建立 .env 並設定 API base URL
cp .env.example .env
# .env 內容（範例）
# REACT_APP_API_BASE_URL=http://localhost:8080

# 開發模式
npm start
````

> **注意**：React 只會讀取以 `REACT_APP_` 開頭的環境變數。

---

## 環境變數

| 變數                       | 說明              | 範例                      |
| ------------------------ | --------------- | ----------------------- |
| `REACT_APP_API_BASE_URL` | 後端 API Base URL | `http://localhost:8080` |

`.env.example` 已提供範本；請複製為 `.env` 並修改。

---

## NPM Scripts

```bash
npm start     # 啟動開發伺服器
npm run build # 產出 /client/build 作為靜態檔
```

> 產出的 `client/build` 在 **production** 時會由後端 Express 服務（見 server 設定）。

---

## 專案結構

```
client/src/
├── components/            # 可復用組件
│   ├── CourseCard/        # 課程卡片組件
│   ├── Navigation/        # 導航組件
│   └── common/            # 通用組件
├── pages/                 # 頁面組件
│   ├── HomePage/          # 首頁
│   ├── LoginPage/         # 登入頁
│   └── CoursePage/        # 課程頁
├── services/              # API 服務層
│   ├── auth.service.js    # 認證服務
│   └── course.service.js  # 課程服務
├── hooks/                 # 自定義 Hooks
├── utils/                 # 工具函數
├── styles/                # 樣式文件
└── validation/            # 表單驗證
```

> 實作上另有 `useAuthUser`、`PermissionService`、`Nav` 搜尋等模組，細節可參考程式碼。

---

## 路由（前端）

* `/` 首頁
* `/login` 登入
* `/register` 註冊
* `/course` 我的課程（講師＝我開的課、學生＝我已註冊的課）
* `/createcourse` 新增課程（**講師限定**）
* `/enroll` 搜尋/註冊課程
* `/profile` 個人頁面

> 多數頁面以 `React.lazy + Suspense` 懶載入，縮短首頁首屏時間。

---

## 認證與權限（前端視角）

### 狀態保存

* 登入 `POST /api/user/login` 成功後，後端回傳：

  ```json
  {
    "success": true,
    "message": "登入成功",
    "token": "JWT <jwt_token>",
    "user": { "_id": "...", "username": "...", "email": "...", "role": "student|instructor" }
  }
  ```
* 前端以 `localStorage.setItem("user", JSON.stringify(data))` 保存。
* 服務層（例如 `course.service.js`）會從 `localStorage.user.token` 讀取並加到 `Authorization` header。

### 權限判斷

* `useAuthUser(currentUser)` 內部委派 `PermissionService`：

  * `normalizeUser()`：容錯 `{ user:{...} }` 與扁平 `{...}`
  * 輸出旗標：`isInstructor / isStudent / isLoggedIn`
  * 輸出能力：`getCoursesFetcher()`、`canEditCourse(course)`、`canDropCourse()`…等
* UI 僅使用語意旗標，不直接讀 raw 結構（降低耦合）。

---

## RESTful API（前端對接）

| 方法     | 端點                        | 功能   | 權限 |
| ------ | ------------------------- | ---- | -- |
| POST   | `/api/user/register`      | 用戶註冊 | 公開 |
| POST   | `/api/user/login`         | 用戶登入 | 公開 |
| GET    | `/api/courses`            | 課程列表 | 認證 |
| POST   | `/api/courses`            | 建立課程 | 講師 |
| PATCH  | `/api/courses/:id`        | 更新課程 | 講師 |
| DELETE | `/api/courses/:id`        | 刪除課程 | 講師 |
| POST   | `/api/courses/enroll/:id` | 選課   | 學生 |
| POST   | `/api/courses/drop/:id`   | 退選   | 學生 |

**前端請求 Header（節錄）**

```http
Authorization: JWT <token>
Content-Type: application/json
```

---

## 建置與部署

```bash
npm run build
```

* 產出目錄：`client/build`
* 後端（Express）在 `NODE_ENV=production` 會：

  * 服務 `client/build` 為靜態檔
  * 以萬用路由回傳 `index.html`（支援 React Router）

---


