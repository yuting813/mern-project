import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
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
        window.alert("課程註冊成功。重新導向到課程頁面。");
        navigate("/course");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!currentUser && (
        <div class="header-container">
          <img
            alt=""
            class="header-container-img"
            src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/10ca89f6-811b-400e-983b-32c5cd76725a.jpg"
            sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
          />

          <div class="text-container-enroll bg-light p-3 ">
            <h2>帶您迎向未來的技能</h2>
            <p>為自己的現在和未來準備好必要技能。和我們一起開始吧。 </p>
            <button
              className="btn btn-dark rounded-0 w-100 "
              onClick={handleTakeToLogin}
            >
              立即開始
            </button>
            {/* <p>您必須先登入才能搜尋課程</p> */}
          </div>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div class="header-container">
          <img
            alt=""
            class="header-container-img"
            src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/e6cc1a30-2dec-4dc5-b0f2-c5b656909d5b.jpg"
            sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
          />

          <div class="text-container bg-light p-4 ">
            <h2>立即開始學習</h2>
            <p>學生帳號才能註冊課程 </p>
            <button
              className="btn btn-dark rounded-0 w-100 "
              onClick={handleTakeToLogin}
            >
              立即開始
            </button>
          </div>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            type="text"
            className="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}

      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <p>我們從 API 返回的數據。</p>
          {searchResult.map((course) => (
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
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
                <a
                  href="#"
                  id={course._id}
                  onClick={handleEnroll}
                  className="card-text btn btn-primary"
                >
                  註冊課程
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
