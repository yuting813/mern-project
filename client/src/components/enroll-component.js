import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";
import CourseCardScroller from "./course-cardScroller";
import CourseImage from "./course-image";

const EnrollComponent = ({ currentUser, setCurrentUser, showAlert }) => {
  // let { currentUser, setCurrentUser } = props;

  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);

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
        showAlert("課程註冊成功!", "將導向到課程頁面。", "elegant", 2000);
        setTimeout(() => {
          navigate("/course");
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!currentUser && (
        <div className="banner-container">
          <div className="w-100">
            <picture>
              <source
                srcset="https://img-c.udemycdn.com/notices/web_carousel_slide/image_responsive/940c09d8-5549-4207-8670-693e45b81afd.jpg"
                width="1340"
                height="400"
                media="(max-width: 768px)"
              ></source>

              <img
                className="img-fluid w-100"
                alt="Banner"
                src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/10ca89f6-811b-400e-983b-32c5cd76725a.jpg"
                loading="lazy"
              />
            </picture>
          </div>
          <div className="text-container bg-light p-3 ">
            <h2 className="mb-3">學習能夠讓您</h2>
            <p className="mb-4">
              為自己的現在和未來準備好必要技能。
              <br />
              和我們一起開始吧。
            </p>
            <button
              className="btn btn-dark rounded-0 w-100"
              onClick={handleTakeToLogin}
            >
              立即開始
            </button>
          </div>
        </div>
      )}

      {currentUser && currentUser.user.role === "instructor" && (
        <div class="banner-container">
          <div className="w-100">
            <picture>
              <img
                alt="Banner"
                class="img-fluid w-100"
                src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/e6cc1a30-2dec-4dc5-b0f2-c5b656909d5b.jpg"
                // sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
              />
            </picture>
          </div>

          <div class="text-container bg-light p-4 ms-4">
            <h2 className="mb-3">立即開始學習</h2>
            <p className="mb-4">學生帳號才能註冊課程 </p>
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
        <div className="container mt-5">
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
        <div className="container">
          <h4 className="mt-5">為您推薦</h4>
          <CourseCardScroller />
        </div>
      )}

      {currentUser && searchResult && searchResult.length !== 0 && (
        <div className="container row mx-auto">
          <p>我們從 API 返回的數據。</p>
          {searchResult.map((course) => (
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <CourseImage course={course} />
                <h5 className="card-title">課程名稱:{course.title}</h5>
                <p className="card-text" style={{ margin: "0.5rem 0rem" }}>
                  {course.description}
                </p>
                <p style={{ margin: "0.5rem 0rem" }}>
                  學生人數:{course.students.length}
                </p>
                <p style={{ margin: "0.5rem 0rem" }}>課程價格:{course.price}</p>
                <p style={{ margin: "0.5rem 0rem" }}>
                  講師:{course.instructor.username}
                </p>
                <button
                  id={course._id}
                  onClick={handleEnroll}
                  className="card-text btn btn-primary"
                >
                  註冊課程
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
