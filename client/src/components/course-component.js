import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseImage = ({ course, width = "16rem", height = "11rem" }) => {
  const defaultImage = "https://i.ibb.co/BKqMHq0/logo.png";

  const [imgSrc, setImgSrc] = useState(course.image || defaultImage);

  const handleImageError = () => {
    if (imgSrc !== defaultImage) {
      setImgSrc(defaultImage);
    }
  };

  return (
    <img
      src={imgSrc}
      alt="課程圖片"
      onError={handleImageError}
      className="img-fluid"
      style={{
        width,
        height,
        objectFit: "cover",
      }}
    />
  );
};

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);

  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleTakeToPostCourse = () => {
    navigate("/postCourse");
  };

  const handleTakeToEnroll = () => {
    navigate("/enroll");
  };

  useEffect(() => {
    if (currentUser) {
      const _id = currentUser.user._id;
      const serviceMethod =
        currentUser.user.role === "instructor"
          ? CourseService.get
          : CourseService.getEnrolledCourses;

      serviceMethod(_id)
        .then((data) => {
          setCourseData(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [currentUser]);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          

          <div class="banner-container">
            <div className="w-100">
              <picture>
                <source
                  srcset="https://s.udemycdn.com/teaching/billboard-mobile-v3.jpg"
                  width="650"
                  height="416"
                  media="(max-width: 768px)"
                  loading="lazy"
                ></source>

                <img
                  className="w-100 img-fluid"
                  alt="Banner"
                  src="https://s.udemycdn.com/teaching/billboard-desktop-v4.jpg"
                  s
                  loading="lazy"
                ></img>
              </picture>
            </div>

            <div class="text-container bg-light p-4  mx-5 d-flex align-items-cente flex-column">
              <h3 className="mb-3 ">必須要先登入才能看到課程。</h3>
              {/* <p className="mb-4">點擊下方，建立課程</p> */}
              <button
                className="btn  btn-dark rounded-0 w-100 "
                onClick={handleTakeToLogin}
              >
                回到登入頁面
              </button>
            </div>
          </div>
        </div>
      )}

      {currentUser && (
        <div>
          <h1>
            歡迎來到{currentUser.user.role === "instructor" ? "講師" : "學生"}
            的課程頁面
          </h1>
        </div>
      )}

      {currentUser &&
        currentUser.user.role === "instructor" &&
        courseData.length === 0 && (
          <div class="banner-container">
            <div className="w-100">
              <picture>
                <source
                  srcset="https://s.udemycdn.com/teaching/billboard-mobile-v3.jpg"
                  width="650"
                  height="416"
                  media="(max-width: 768px)"
                  loading="lazy"
                ></source>

                <img
                  className="w-100 img-fluid"
                  alt="Banner"
                  src="https://s.udemycdn.com/teaching/billboard-desktop-v4.jpg"
                  s
                  loading="lazy"
                ></img>
              </picture>
            </div>

            <div class="text-container bg-light p-4 mx-5">
              <h2 className="mb-3 ">尚未上傳課程</h2>
              <p className="mb-4">點擊下方，建立課程</p>
              <button
                className="btn  btn-dark rounded-0 w-100 "
                onClick={handleTakeToPostCourse}
              >
                立即開始
              </button>
            </div>
          </div>
        )}

      {currentUser &&
        currentUser.user.role === "student" &&
        courseData.length === 0 && (
          <div class="banner-container">
            <div className="w-100">
              <picture>
                <source
                  srcset="https://s.udemycdn.com/teaching/billboard-mobile-v3.jpg"
                  width="650"
                  height="416"
                  media="(max-width: 768px)"
                  loading="lazy"
                ></source>

                <img
                  className="w-100 img-fluid"
                  alt="Banner"
                  src="https://s.udemycdn.com/teaching/billboard-desktop-v4.jpg"
                  s
                  loading="lazy"
                ></img>
              </picture>
            </div>

            <div class="text-container bg-light p-4 mx-5">
              <h2 className="mb-3 ">尚未註冊課程</h2>
              <p className="mb-4">點擊下方，開始學習</p>
              <button
                className="btn  btn-dark rounded-0 w-100 "
                onClick={handleTakeToEnroll}
              >
                立即開始
              </button>
            </div>
          </div>
        )}

      {currentUser && courseData.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => (
            <div
              className="card"
              style={{ width: "18rem", margin: "1rem" }}
              key={course._id}
            >
              <div className="card-body">
                <CourseImage course={course} />
                <h5 className="card-title py-3">{course.title}</h5>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CourseComponent;
