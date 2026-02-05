import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import useAuthUser from '../../hooks/useAuthUser';
import logo from '../../assets/logo.png';
import '../../styles/main.css';
// import { formatCountdown } from "../../utils/timeUtils";

const NavComponent = ({ currentUser, setCurrentUser, showAlert }) => {
  const {
    isInstructor,
    isStudent,
    isLoggedIn,
    canAccessCreateCoursePage,
    canAccessEnrollPage,
    username,
    roleDisplayName,
  } = useAuthUser(currentUser);

  const [showBanner, setShowBanner] = useState(true);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const location = useLocation();
  // const [countdownTime, setCountdownTime] = useState(10800);

  // 若離開 /enroll，就重設 Nav 的輸入框，避免殘留文字
  useEffect(() => {
    if (location.pathname !== '/enroll') setKeyword('');
  }, [location.pathname]);

  const handleLogout = () => {
    AuthService.logout();
    showAlert('已登出!', '您將被導向至首頁', 'elegant', 500);
    setCurrentUser(null);
    navigate('/');
  };

  // 調試信息（開發環境）
  if (process.env.NODE_ENV === 'development') {
    console.log('Nav Debug:', {
      currentUser,
      isInstructor,
      isStudent,
      isLoggedIn,
      canAccessCreateCoursePage,
    });
  }

  const submitSearchFromNav = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return showAlert('請輸入關鍵字');

    // 導向 /enroll 並攜帶 keyword
    navigate('/enroll', { state: { keyword } });
    showAlert('搜尋中…', '', 'elegant', 600);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCountdownTime((prevTime) => prevTime - 1);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="shadow nav-position">
      {showBanner && !currentUser && (
        <section
          aria-label="alert"
          className="shadow-bottom alert nav-alert-color alert-dismissible fade show mb-0 d-flex justify-content-center align-items-center"
          role="alert"
        >
          <div className="text-center">
            <strong className="fs-6">只有 48 小時 | </strong>
            <span className="fs-6">
              個人方案享有首年 20% 的優惠價格，讓自己的職涯更上一層樓。
            </span>
            <br />
            <strong className="fs-5">還剩一天! </strong>
            {/* <span className="fs-5">
              優惠剩餘時間: {formatCountdown(countdownTime)}
            </span> */}
          </div>
          <button
            type="button"
            className="btn-close btn-sm ms-3"
            aria-label="Close"
            onClick={() => setShowBanner(false)}
          ></button>
        </section>
      )}

      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-light p-1">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="Your Logo"
              className="img-fluid"
              style={{ maxHeight: '70px' }}
            />
          </Link>

          <form
            className="nav-search d-flex flex-grow-1 me-4"
            onSubmit={submitSearchFromNav}
            role="search"
          >
            {/* 相對定位容器 */}
            <div className=" position-relative w-100">
              {/* 放大鏡：absolute；貼在輸入框左側 */}
              <button
                type="submit"
                className="btn p-0 border-0 bg-transparent position-absolute top-50"
                aria-label="搜尋"
              >
                <i className="bi bi-search text-secondary position-absolute top-50 start-0 translate-middle-y ms-3" />
              </button>

              {/* 圓角輸入框：ps-5 讓文字不壓到 icon */}
              <input
                className="form-control search-input ps-5"
                type="search"
                placeholder="搜尋課程、講師或關鍵字"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
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
                  {/* 重構前：直接檢查角色
                   {currentUser.user.role === "instructor" && (<NavItem to="/CreateCourse" text="新增課程" />)}
                  
                  第一階段重構後：使用AuthService */}
                  {/* {AuthService.canCreateCourse(currentUser) && ( */}
                  {/* 最終版: 使用明確的權限檢查 */}
                  {/* 講師才能新增課程 */}
                  {canAccessCreateCoursePage && (
                    <NavItem to="/CreateCourse" text="新增課程" />
                  )}
                  {/* 第一階段重構後：使用AuthService */}
                  {/* {AuthService.canEnrollCourse(currentUser) && ( */}
                  {/* 學生才能註冊課程 */}
                  {canAccessEnrollPage && (
                    <NavItem to="/enroll" text="註冊課程" />
                  )}
                  <NavItem to="/profile" text="個人頁面" />
                  <li className="nav-item">
                    <button
                      onClick={handleLogout}
                      className="nav-link btn btn-link"
                    >
                      登出 ({username} - {roleDisplayName})
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <NavItem
                    to="/register"
                    text="註冊"
                    className="nav-register-link"
                  />
                  <NavItem
                    to="/login"
                    text="登入"
                    className="nav-login-link "
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

const NavItem = ({ to, text, className = 'hover-text-primary ' }) => (
  <li className="nav-item">
    <Link className="nav-link" to={to}>
      <span className={className}>{text}</span>
    </Link>
  </li>
);

export default NavComponent;
