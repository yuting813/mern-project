import React, { useState, useCallback, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthService from "./services/auth.service";
import Layout from "./components/layout/Layout";
import Alert from "./components/common/Alert";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ErrorFallback from "./components/common/ErrorFallback";
import PageLoader from "./components/common/PageLoader";

// Dev-only pages
import DevOnlyPage from "./pages/DevOnlyPage";
import ErrorListPage from "./pages/ErrorListPage";

// 首頁同步載入
import HomePage from "./pages/HomePage";

// lazy 非首頁頁面
const CoursePage = lazy(() => import("./pages/CoursePage"));
const EnrollPage = lazy(() => import("./pages/EnrollPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const CreateCoursePage = lazy(() => import("./pages/CreateCoursePage"));


import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CoursePage from "./pages/CoursePage";
import CreateCoursePage from "./pages/CreateCoursePage";
import EnrollPage from "./pages/EnrollPage";


function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [alert, setAlert] = useState(null);

  const closeAlert = useCallback(() => setAlert(null), []);
  const showAlert = useCallback(
    (title, message, variant = "default", duration = 1000) => {
      setAlert({ title, message, variant });
      setTimeout(closeAlert, duration);
    },
    [closeAlert]
  );

  return (
    <BrowserRouter>
      <ErrorBoundary>
        {alert && (
          <Alert
            title={alert.title}
            description={alert.message}
            variant={alert.variant}
            onClose={closeAlert}
          />
        )}

        <Routes>
          {/* DevOnly 區 */}
          <Route
            path="/dev-only"
            element={
              <ErrorBoundary fallback={<ErrorFallback />}>
                <DevOnlyPage />
              </ErrorBoundary>
            }
          />
          <Route
            path="/error-list"
            element={
              <ErrorBoundary fallback={<ErrorFallback />}>
                <ErrorListPage />
              </ErrorBoundary>
            }
          />

          <Route
            path="/"
            element={
              <Layout
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                showAlert={showAlert}
              />
            }
          >
            <Route
              index
              element={
                <HomePage showAlert={showAlert} currentUser={currentUser} />
              }
            />
            {[
              { path: "register", Page: RegisterPage, props: { showAlert } },
              {
                path: "login",
                Page: LoginPage,
                props: { currentUser, setCurrentUser, showAlert },
              },
              {
                path: "profile",
                Page: ProfilePage,
                props: { currentUser, setCurrentUser, showAlert },
              },
              {
                path: "course",
                Page: CoursePage,
                props: { currentUser, setCurrentUser, showAlert },
              },
              {
                path: "createcourse",
                Page: CreateCoursePage,
                props: { currentUser, setCurrentUser, showAlert },
              },
              {
                path: "enroll",
                Page: EnrollPage,
                props: { currentUser, setCurrentUser, showAlert },
              },
            ].map(({ path, Page, props }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ErrorBoundary fallback={<ErrorFallback />}>
                    <Suspense fallback={<PageLoader />}>
                      <Page {...props} />
                    </Suspense>
                  </ErrorBoundary>
                }
              />
            ))}
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
