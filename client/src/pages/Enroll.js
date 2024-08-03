import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";
import CourseCardS from "../components/course/CourseCardScroller";
import CourseImage from "../components/course/CourseImage";
import bannerImgS from "../assets/bannerimg2-s.jpg";
import enrollImg from "../assets/enroll-img-v1.jpg";
import enrollMobile from "../assets/enroll-mobile-v1.png";
import enrollDesktop from "../assets/enroll-desktop-v1.png";

const EnrollComponent = ({ currentUser, setCurrentUser, showAlert }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState([]);
  let [message, setMessage] = useState("");

  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        console.log(data);
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
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
        <div className="px-5 pt-2 mt-5">
          <div className="search input-group mb-3">
            <input
              onChange={handleChangeInput}
              type="text"
              className="form-control"
              placeholder="搜尋任何事物"
            />
            <button onClick={handleSearch} className="btn btn-primary">
              Search
            </button>
          </div>
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
        <div className=" row mx-auto px-5">
          <p>我們從 API 返回的數據。</p>
          {searchResult.map((course) => (
            <div
              key={course._id}
              className="card m-1"
              style={{ width: "18rem" }}
            >
              <div className="card-body ">
                <CourseImage course={course} />
                <p className="card-title pt-2 text-muted">課程名稱:</p>
                <h5 className="card-title">{course.title}</h5>
                <p
                  className="card-text py-1 text-muted"
                  style={{ margin: "0.5rem 0rem" }}
                >
                  {course.description}
                </p>
                <p style={{ margin: "0.5rem 0rem" }}>
                  學生人數:{course.students.length}
                </p>
                <p style={{ margin: "0.5rem 0rem" }}>課程價格:{course.price}</p>
                <p style={{ margin: "0.5rem 0rem" }}>
                  講師:{course.instructor.username}
                </p>
              </div>
              <button
                id={course._id}
                onClick={handleEnroll}
                className="btn custom-button btn-primary w-100 mb-3"
              >
                註冊課程
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
