import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useCallback } from "react";
import AuthService from "./services/auth.service";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import CourseComponent from "./components/course-component";
import PostCourseComponent from "./components/postCourse-component";
import EnrollComponent from "./components/enroll-component";
import AlertDemo from "./components/Alert";

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
      {alert && (
        <AlertDemo
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
          <Route index element={<HomeComponent />} />
          <Route
            path="/register"
            element={<RegisterComponent showAlert={showAlert} />}
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
            path="/postCourse"
            element={
              <PostCourseComponent
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
    </BrowserRouter>
  );
}

export default App;
