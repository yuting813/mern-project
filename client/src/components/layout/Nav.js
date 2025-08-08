import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { formatCountdown } from "../../utils/timeUtils";
import logo from "../../assets/logo.png";
import "../../styles/main.css";

const NavComponent = ({ currentUser, setCurrentUser, showAlert }) => {
  const [showBanner, setShowBanner] = useState(true);
  const [countdownTime, setCountdownTime] = useState(10800);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const location = useLocation();

  // 若離開 /enroll，就重設 Nav 的輸入框，避免殘留文字
  useEffect(() => {
    if (location.pathname !== "/enroll") setKeyword("");
  }, [location.pathname]);

  const handleLogout = () => {
    AuthService.logout();
    showAlert("已登出!", "您將被導向至首頁", "elegant", 500);
    setCurrentUser(null);
    navigate("/");
  };

  const submitSearchFromNav = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return showAlert("請輸入關鍵字");

    // 導向 /enroll 並攜帶 keyword
    navigate("/enroll", { state: { keyword } });
    showAlert("搜尋中…", "", "elegant", 1500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="shadow nav-position">
      {showBanner && !currentUser && (
        <div
          className="shadow-bottom alert nav-alert-color alert-dismissible fade show mb-0 d-flex justify-content-center align-items-center"
          role="alert"
        >
          <div className="text-center">
            <strong className="fs-5">新學習者優惠| </strong>
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
            className="btn-close btn-sm ms-3"
            aria-label="Close"
            onClick={() => setShowBanner(false)}
          ></button>
        </div>
      )}

      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-light p-1">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="Your Logo"
              className="img-fluid"
              style={{ maxHeight: "70px" }}
            />
          </Link>
          <form
            className="d-flex ms-3"
            role="search"
            onSubmit={submitSearchFromNav}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="搜尋課程"
              aria-label="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>

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
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ms-auto ">
              {currentUser ? (
                <>
                  <NavItem to="/" text="首頁" />
                  <NavItem to="/course" text="課程頁面" />
                  {currentUser.user.role === "instructor" && (
                    <NavItem to="/CreateCourse" text="新增課程" />
                  )}
                  {currentUser.user.role === "student" && (
                    <NavItem to="/enroll" text="註冊課程" />
                  )}
                  <NavItem to="/profile" text="個人頁面" />
                  <li className="nav-item">
                    <button
                      onClick={handleLogout}
                      className="nav-link btn btn-link"
                    >
                      <span className="hover-text-primary">登出</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <NavItem
                    to="/login"
                    text="登入"
                    className="nav-login-link "
                  />
                  <NavItem
                    to="/register"
                    text="註冊"
                    className="nav-register-link"
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const NavItem = ({ to, text, className = "hover-text-primary " }) => (
  <li className="nav-item">
    <Link className="nav-link" to={to}>
      <span className={className}>{text}</span>
    </Link>
  </li>
);

export default NavComponent;
