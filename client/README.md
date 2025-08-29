
# Client (React) — MERN 課程平台

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://mern-project-ivory.vercel.app/)
> 前端子專案（React）。負責路由、身分驗證、權限渲染、課程 CRUD 的 UI 與 API 串接。  
> 與後端（Express + MongoDB + JWT）透過 `REACT_APP_API_BASE_URL` 溝通。

---

## 重點速覽（TL;DR）
- **技術**：React 18、React Router v6、Axios、Bootstrap（樣式）、`React.lazy + Suspense`
- **認證**：JWT（`Authorization: JWT <token>`），登入後以 `localStorage.user` 持久化 `{ token, user }`
- **權限**：`useAuthUser` + `PermissionService`（`normalizeUser`、`isInstructor/isStudent/isLoggedIn`、`getCoursesFetcher`、`canEditCourse`）
- **Service layer（服務層 / API clients）**：`AuthService`、`CourseService`（自動夾帶 `Authorization` header）
- **建置與部署**：`npm run build` 產出 `client/build`，production 由 Express 提供靜態檔與萬用路由

---


## 專案結構（前端）

```
client/src/
├── components/              # 可復用組件
│   ├── CourseCard/          # 課程卡片組件
│   ├── Navigation/          # 導航組件
│   └── common/              # 通用組件
├── pages/                   # 頁面組件
│   ├── HomePage/            # 首頁
│   ├── LoginPage/           # 登入頁
│   └── CoursePage/          # 課程頁
├── services/                # API 服務層（Service layer / API clients）
│   ├── auth.service.js      # 認證服務
│   └── course.service.js    # 課程服務
├── hooks/                   # 自定義 Hooks（含 useAuthUser）
├── utils/                   # 工具函數（含 normalizeUser 等）
├── styles/                  # 樣式文件
└── validation/              # 表單驗證（Joi schema 等）
```

> UI 僅使用語意旗標，不直接讀 raw 結構，降低耦合。

---

## 快速開始

```bash
cd client
npm install

# 設定環境變數（React 只會讀取以 REACT_APP_ 開頭的變數）
cp .env.example .env
# .env（範例）
# REACT_APP_API_BASE_URL=http://localhost:8080

# 開發模式
npm start
```

> 改 `.env` 後需重新啟動 `npm start` 才會生效（build-time 注入）。

---

## 環境變數

| 變數 | 說明 | 範例 |
| --- | --- | --- |
| `REACT_APP_API_BASE_URL` | 後端 API Base URL | `http://localhost:8080` |

`.env.example` 已提供範本；請複製為 `.env` 並調整。

---

## NPM Scripts

```bash
npm start     # 啟動開發伺服器
npm run build # 產出 /client/build 作為靜態檔
```

> 產出的 `client/build` 在 **production** 由 Express 靜態服務並以萬用路由回傳 `index.html`。

---

## 路由一覽

- `/` 首頁  
- `/login` 登入  
- `/register` 註冊  
- `/course` 我的課程（講師＝我開的課、學生＝我註冊的課）  
- `/createcourse` 新增課程（**講師限定**）  
- `/enroll` 搜尋/註冊課程  
- `/profile` 個人頁面  

> 多數頁面以 `React.lazy + Suspense` 懶載入。

---

## 認證與權限（前端視角）

### 狀態保存
- 登入 `POST /api/user/login` 成功後，後端回傳：
  ```json
  {
    "success": true,
    "message": "登入成功",
    "token": "JWT <jwt_token>",
    "user": { "_id": "...", "username": "...", "email": "...", "role": "student|instructor" }
  }
  ```
- 前端以 `localStorage.setItem("user", JSON.stringify(data))` 保存。
- Service layer（例：`course.service.js`）會從 `localStorage.user.token` 讀取並加到 `Authorization` header。

### 權限判斷
- 以 `useAuthUser` + `PermissionService` 輸出語意旗標與能力方法：
  - 旗標：`isInstructor / isStudent / isLoggedIn`
  - 能力：`getCoursesFetcher()`、`canEditCourse(course)`、`canDropCourse()`…
- `normalizeUser()` 容錯 `{ user:{...} }` 與扁平 `{...}` 兩種形態。

**範例：**
```jsx
import useAuthUser from "../hooks/useAuthUser";

const { uid, isInstructor, isStudent, getCoursesFetcher, canEditCourse } = useAuthUser(currentUser);

useEffect(() => {
  const fetcher = getCoursesFetcher();
  fetcher(uid).then(setCourseData);
}, [getCoursesFetcher, uid]);
```

---

## RESTful API（前端對接）

| 方法 | 端點                         | 功能       | 權限   |
| ---- | ---------------------------- | ---------- | ------ |
| POST | `/api/user/register`         | 用戶註冊   | 公開   |
| POST | `/api/user/login`            | 用戶登入   | 公開   |
| GET  | `/api/courses`               | 課程列表   | 認證   |
| POST | `/api/courses`               | 建立課程   | 講師   |
| PATCH| `/api/courses/:id`           | 更新課程   | 講師   |
| DELETE | `/api/courses/:id`         | 刪除課程   | 講師   |
| POST | `/api/courses/enroll/:id`    | 選課       | 學生   |
| POST | `/api/courses/drop/:id`      | 退選       | 學生   |

**共同 Header（節錄）**
```http
Authorization: JWT <token>
Content-Type: application/json
```

---

## 建置與部署

```bash
npm run build
```
- 產出：`client/build`  
- 後端（Express）在 `NODE_ENV=production` 時：
  - 靜態服務 `client/build`
  - 以萬用路由回傳 `index.html`（支援 React Router）

---

<details>
<summary>疑難排解</summary>

- **白頁/404 子路由**：分離部署需啟用 SPA 轉址（Netlify `_redirects` 或 Vercel rewrites）。
- **抓不到 API**：`.env` 的 `REACT_APP_API_BASE_URL` 是否正確；改後重啟 dev server。
- **401**：`Authorization: JWT <token>` 是否帶到；token 可能過期，請重新登入。
- **CORS/混合內容**：後端 `cors()` 放行你的前端網域；前端用 **HTTPS** 指向 API。
### 快速自查
1. `console.log(process.env.REACT_APP_API_BASE_URL)` 是否正確 → 錯就修 `.env` 並重啟。
2. DevTools → Network：
   - 先看 `OPTIONS /api/...` 是否過（CORS headers 有 `Access-Control-Allow-Origin` 與 `Authorization`）。
   - 再看實際 `GET/POST` 的狀態碼（401/403/404/500 對應處理）。
3. `curl -i https://api.yourdomain.com/api/courses` → 能回 200/401/404 代表後端活著；連不上才是後端問題。

</details>



> 術語約定：文件中使用 **Service layer（服務層 / API clients）** 作為統一定義；首次出現中英並列，後續以英文為主。
