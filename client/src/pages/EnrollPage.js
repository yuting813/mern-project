import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";
import CourseCardS from "../components/course/CourseCardScroller";
import CourseImage from "../components/course/CourseImage";
import bannerImgS from "../assets/bannerimg2-s.jpg";
import enrollImg from "../assets/enroll-img-v1.jpg";
import enrollMobile from "../assets/enroll-mobile-v1.png";
import enrollDesktop from "../assets/enroll-desktop-v1.png";

const EnrollPage = ({ currentUser, setCurrentUser, showAlert }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState([]);
  let [searchError, setSearchError] = useState("");

  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
    setSearchError("");
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const handleSearch = () => {
    if (!searchInput.trim()) {
      setSearchError("請輸入搜索關鍵字");
      return;
    }

    CourseService.getCourseByName(searchInput)
      .then((data) => {
        console.log(data);
        if (data.data && data.data.length > 0) {
          setSearchResult(data.data);
          setSearchError("");
        } else {
          setSearchResult([]);
          setSearchError(
            `找不到與 ${searchInput} 相關的課程。請嘗試其他關鍵詞，或瀏覽我們的全部課程。`
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setSearchError("搜索過程中出現錯誤，請稍後再試");
      });
  };

  const handleEnroll = (e) => {
    CourseService.enroll(e.target.id)
      .then(() => {
        showAlert("課程註冊成功!", "將導向到課程頁面。", "elegant", 500);
        navigate("/course");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!currentUser && (
        <div className="enroll-container">
          <div className="d-flex align-items-center justify-content-center flex-column-reverse flex-md-row">
            <div className=" col-md-5 p-4 mt-4">
              <h2 className="mb-3">
                讓職涯
                <br />
                邁向新高峰
              </h2>
              <p className="mb-4">
                訂閱存取科技、商業等多個領域中最受好評的課程系列，
                <br />
                讓工作與生活都更上一層樓。
              </p>
              <button
                className="btn btn-dark rounded-0 w-50"
                onClick={handleTakeToLogin}
              >
                立即開始
              </button>
            </div>
            <div className="col-md-6">
              <picture>
                <source
                  srcSet={enrollMobile}
                  width="1340"
                  height="400"
                  media="(max-width: 768px)"
                ></source>

                <img
                  className="img-fluid w-100"
                  alt="Banner"
                  src={enrollDesktop}
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
        </div>
      )}

      {currentUser && currentUser.user.role === "instructor" && (
        <div className="banner-container">
          <div className="w-100">
            <picture>
              <source
                srcSet={bannerImgS}
                width="1340"
                height="400"
                media="(max-width: 768px)"
              ></source>

              <img
                className="img-fluid w-100"
                alt="Banner"
                src={enrollImg}
                loading="lazy"
              />
            </picture>
          </div>

          <div className="text-container bg-light p-4 ms-4">
            <h2 className="mb-3">立即開始學習</h2>
            <p className="mb-4">擁有學生帳號，才能註冊課程 </p>
            <button
              className="btn btn-dark rounded-0 w-100 "
              onClick={handleTakeToLogin}
            >
              立即開始
            </button>
          </div>
        </div>
      )}

      {currentUser && currentUser.user.role === "student" && (
        <div className="px-5 pt-2 mt-5   d-flex flex-column  justify-content-center align-items-center ">
          <form
            onSubmit={handleSubmitSearch}
            className="search input-group mb-3 w-50 border"
          >
            <input
              onChange={handleChangeInput}
              type="text"
              className="form-control"
              placeholder="搜尋課程"
              value={searchInput}
            />
            <button type="submit" className="btn btn-primary custom-button">
              Search
            </button>
          </form>
          {searchError && (
            <div className="alert alert-info mt-3 w-50 text-center">
              {searchError}
            </div>
          )}
        </div>
      )}

      {!(currentUser && searchResult && searchResult.length !== 0) && (
        <div className="px-5 py-4 mb-5">
          <h4 className="mt-5">為您推薦</h4>
          <CourseCardS
            croller
            showAlert={showAlert}
            currentUser={currentUser}
          />
        </div>
      )}

      {currentUser && searchResult && searchResult.length !== 0 && (
        <div className=" container">
          <h5 className="m-2">搜尋到以下課程 :</h5>
          <div className="row">
            {searchResult.map((course) => (
              <div
                key={course._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <div
                  className="card h-100 border-0 shadow-sm "
                  style={{
                    transition: "all 0.3s ease-in-out",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0,0,0,0.15)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 2px 4px rgba(0,0,0,0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <CourseImage course={course} height="180px" width="100%" />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold mt-3">{course.title}</h5>
                    <p className="card-text small text-muted">
                      {course.description}
                    </p>
                    <ul className="list-unstyled text-muted small mt-auto mb-2">
                      <li>學生人數：{course.students.length}</li>
                      <li>價格：${course.price}</li>
                      <li>講師：{course.instructor.username}</li>
                    </ul>
                  </div>
                  <button
                    id={course._id}
                    onClick={handleEnroll}
                    className=" btn btn-sm custom-button btn-primary m-3"
                  >
                    註冊課程
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollPage;
