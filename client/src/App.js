import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useCallback } from "react";
import AuthService from "./services/auth.service";
import Layout from "./components/layout/Layout";
import HomeComponent from "./pages/Home";
import RegisterComponent from "./pages/Register";
import LoginComponent from "./pages/Login";
import ProfileComponent from "./pages/Profile";
import CourseComponent from "./pages/Course";
import CreateCourseComponent from "./pages/CreateCourse";
import EnrollComponent from "./pages/Enroll";
import Alert from "./components/common/Alert";
import ErrorBoundary from "./components/common/ErrorBoundary";

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
                <HomeComponent
                  showAlert={showAlert}
                  currentUser={currentUser}
                />
              }
            />
            <Route
              path="/register"
              element={
                <ErrorBoundary>
                  <RegisterComponent showAlert={showAlert} />
                </ErrorBoundary>
              }
            />
            <Route
              path="/login"
              element={
                <LoginComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  showAlert={showAlert}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProfileComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  showAlert={showAlert}
                />
              }
            />
            <Route
              path="/course"
              element={
                <CourseComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  showAlert={showAlert}
                />
              }
            />

            <Route
              path="/createcourse"
              element={
                <CreateCourseComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  showAlert={showAlert}
                />
              }
            />

            <Route
              path="/enroll"
              element={
                <EnrollComponent
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
