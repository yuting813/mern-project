import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useCallback } from "react";
import AuthService from "./services/auth.service";
import Layout from "./components/layout/Layout";
import Alert from "./components/common/Alert";
import ErrorBoundary from "./components/common/ErrorBoundary";


import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CoursePage from "./pages/CoursePage";
import CreateCoursePage from "./pages/CreateCoursePage";
import EnrollPage from "./pages/EnrollPage";


function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  let [alert, setAlert] = useState(null);

  const closeAlert = useCallback(() => {
    setAlert(null);
  }, []);

  const showAlert = useCallback(
    (title, message, variant = "default", duration = 1000) => {
      setAlert({ title, message, variant });

      // Set a timer to automatically close the alert
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
              <Route
                path="/register"
                element={
                  <ErrorBoundary>
                    <RegisterPage showAlert={showAlert} />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/login"
                element={
                  <LoginPage
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    showAlert={showAlert}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProfilePage
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    showAlert={showAlert}
                  />
                }
              />
              <Route
                path="/course"
                element={
                  <CoursePage
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    showAlert={showAlert}
                  />
                }
              />

              <Route
                path="/createcourse"
                element={
                  <CreateCoursePage
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    showAlert={showAlert}
                  />
                }
              />

              <Route
                path="/enroll"
                element={
                  <EnrollPage
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    showAlert={showAlert}
                  />
                }
              />
            </Route>
          </Routes>
     
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
