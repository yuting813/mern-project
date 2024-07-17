import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import logoImage from "../assets/logo.png";
import "../styles/main.css";
import { useState, useEffect } from "react";

const NavComponent = ({ currentUser, setCurrentUser, showAlert }) => {
  const [showBanner, setShowBanner] = useState(true);
  const [countdownTime, setCountdownTime] = useState(10800);

  const handleLogout = () => {
    AuthService.logout(); //清空local storage
    showAlert("已登出!", "您將被導向至首頁", "elegant", 500);
    setCurrentUser(null);
  };
  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="shadow nav-position">
        {showBanner && !currentUser && (
          <div
            className="shadow-bottom alert alert-color alert-dismissible fade show mb-0 d-flex justify-content-center align-items-center"
            role="alert"
          >
            <div className="text-center">
              <strong className="fs-5">新學習者優惠| </strong>{" "}
              <span className="fs-5">
                課程最低$590起,這是您學習合適技能的絕佳時機。
              </span>
              <br />
              <span className="fs-5">
                優惠剩餘時間: {formatCountdown(countdownTime)}
              </span>
            </div>
            <button
              type="button"
              className="btn-close btn-sm ms-3" // 添加 btn-sm 類別
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={handleCloseBanner}
            ></button>
          </div>
        )}
        <nav>
          <nav className="shadow-sm navbar navbar-expand-lg navbar-white bg-light p-1">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                <img
                  src={logoImage}
                  alt="Your Logo"
                  className="img-fluid"
                  style={{ maxHeight: "70px" }}
                />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  {currentUser && (
                    <li className="nav-item">
                      <Link className="nav-link " to="/">
                        <span className="hover-text-primary">首頁</span>
                      </Link>
                    </li>
                  )}

                  {!currentUser && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        <span className=" custom-login-link">登入</span>
                      </Link>
                    </li>
                  )}

                  {!currentUser && (
                    <li className="nav-item">
                      <Link className="nav-link " to="/register">
                        <span className="custom-register-link ">註冊</span>
                      </Link>
                    </li>
                  )}

                  {/* {!currentUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link d-none d-md-block custom-register-link"
                      to="/register"
                    >
                      <span>註冊</span>
                    </Link>
                    <Link
                      className="nav-link d-md-none custom-register-link-sm"
                      to="/register"
                    >
                      <span>註冊</span>
                    </Link>
                  </li>
                )} */}

                  {currentUser && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/course">
                        <span className="hover-text-primary">課程頁面</span>
                      </Link>
                    </li>
                  )}

                  {currentUser && currentUser.user.role == "instructor" && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/postCourse">
                        <span className="hover-text-primary">新增課程</span>
                      </Link>
                    </li>
                  )}

                  {currentUser && currentUser.user.role == "student" && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/enroll">
                        <span className="hover-text-primary">註冊課程</span>
                      </Link>
                    </li>
                  )}

                  {currentUser && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">
                        <span className="hover-text-primary">個人頁面</span>
                      </Link>
                    </li>
                  )}

                  {currentUser && (
                    <li className="nav-item">
                      <Link onClick={handleLogout} className="nav-link" to="/">
                        <span className="hover-text-primary">登出</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </nav>
      </div>
    </div>
  );
};

export default NavComponent;
