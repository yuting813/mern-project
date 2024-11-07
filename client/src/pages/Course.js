import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";
import CourseSkeleton from "../components/course/CourseSkeleton";
import CreateCourseDesktop from "../assets/CreateCourse-desktop-v1.jpg";
import CreateCourseMmbile from "../assets/CreateCourse-mobile-v2.jpg";
import EditCourseModal from "../components/EditCourseModal";

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

const CourseComponent = ({ currentUser, setCurrentUser, showAlert }) => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);

  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleTakeToCreateCourse = () => {
    navigate("/CreateCourse");
  };

  const handleTakeToEnroll = () => {
    navigate("/enroll");
  };

  const handleDelete = (e) => {
    const courseId = e.target.id;
    if (window.confirm("確定要刪除這個課程嗎？")) {
      CourseService.delete(courseId)
        .then(() => {
          showAlert("已刪除課程", "課程已成功刪除。", "elegant", 1000);
          setCourseData((prevData) =>
            prevData.filter((course) => course._id !== courseId)
          );
        })
        .catch((err) => {
          console.error("刪除課程時發生錯誤:", err);
          showAlert("課程擁有者才能刪除課程", "請稍後再試。", "error", 1000);
        });
    }
  };

  const handleDrop = (e) => {
    const courseId = e.target.id;
    if (window.confirm("確定要退選這個課程嗎？")) {
      CourseService.dropCourse(courseId)
        .then(() => {
          showAlert(
            "已退選課程",
            "課程已成功從您的列表中移除。",
            "elegant",
            1000
          );
          setCourseData((prevData) =>
            prevData.filter((course) => course._id !== courseId)
          );
        })
        .catch((err) => {
          console.error("退選課程時發生錯誤:", err);
          showAlert("退選課程失敗", "請稍後再試。", "error", 1000);
        });
    }
  };

  const handleEdit = (course) => {
    // 確保只有課程的講師才能編輯
    if (course.instructor._id !== currentUser.user._id) {
      showAlert("權限錯誤", "只有課程講師才能編輯課程", "error", 1500);
      return;
    }
    setEditingCourse(course);
  };

  const handleUpdate = async (courseId, updatedData) => {
    try {
      const response = await CourseService.update(courseId, updatedData);
      // 更新本地課程數據
      setCourseData((prevData) =>
        prevData.map((course) =>
          course._id === courseId
            ? { ...course, ...updatedData, instructor: course.instructor }
            : course
        )
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 修改課程卡片中的編輯按鈕渲染邏輯
  const renderCourseActions = (course) => {
    if (
      currentUser.user.role === "instructor" &&
      course.instructor._id === currentUser.user._id
    ) {
      return (
        <div className="d-flex gap-2 justify-content-center">
          <button
            onClick={() => handleEdit(course)}
            className="btn btn-outline-primary rounded-0"
          >
            編輯課程
          </button>
          <button
            id={course._id}
            onClick={handleDelete}
            className="btn btn-outline-danger rounded-0"
          >
            刪除課程
          </button>
        </div>
      );
    } else if (currentUser.user.role === "student") {
      return (
        <div className="d-flex justify-content-center">
          <button
            id={course._id}
            onClick={handleDrop}
            className="btn btn-outline-danger rounded-0"
          >
            退選課程
          </button>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    if (currentUser) {
      const _id = currentUser.user._id;
      let fetchCourses;

      if (currentUser.user.role === "instructor") {
        fetchCourses = CourseService.getInstructorCourses;
      } else {
        fetchCourses = CourseService.getEnrolledCourses;
      }

      fetchCourses(_id)
        .then((data) => {
          setCourseData(data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [currentUser]);

  if (isLoading) {
    return (
      <div>
        {currentUser && (
          <div>
            <h1>
              歡迎來到{currentUser.user.role === "instructor" ? "講師" : "學生"}
              的課程頁面
            </h1>
          </div>
        )}
        <div>
          <CourseSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <div className="banner-container">
            <div className="w-100">
              <picture>
                <source
                  srcSet={CreateCourseMmbile}
                  width="650"
                  height="416"
                  media="(max-width: 768px)"
                  loading="lazy"
                ></source>

                <img
                  className="w-100 img-fluid"
                  alt="Banner"
                  src={CreateCourseDesktop}
                  loading="lazy"
                ></img>
              </picture>
            </div>

            <div className="text-container bg-light p-4  mx-5 d-flex align-items-cente flex-column">
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
          <div className="banner-container">
            <div className="w-100">
              <picture>
                <source
                  srcSet={CreateCourseMmbile}
                  width="650"
                  height="416"
                  media="(max-width: 768px)"
                  loading="lazy"
                ></source>

                <img
                  className="w-100 img-fluid"
                  alt="Banner"
                  src={CreateCourseDesktop}
                  s
                  loading="lazy"
                ></img>
              </picture>
            </div>

            <div className="text-container bg-light p-4 mx-5">
              <h2 className="mb-3 ">尚未上傳課程</h2>
              <p className="mb-4">點擊下方，建立課程</p>
              <button
                className="btn  btn-dark rounded-0 w-100 "
                onClick={handleTakeToCreateCourse}
              >
                立即開始
              </button>
            </div>
          </div>
        )}

      {currentUser &&
        currentUser.user.role === "student" &&
        courseData.length === 0 && (
          <div className="banner-container">
            <div className="w-100">
              <picture>
                <source
                  srcSet={CreateCourseMmbile}
                  width="650"
                  height="416"
                  media="(max-width: 768px)"
                  loading="lazy"
                ></source>

                <img
                  className="w-100 img-fluid"
                  alt="Banner"
                  src={CreateCourseDesktop}
                  loading="lazy"
                ></img>
              </picture>
            </div>

            <div className="text-container bg-light p-4 mx-5">
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
              style={{ width: "16rem", margin: "0.5rem" }}
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
                <p style={{ margin: "0.5rem 0rem" }}>
                  課程價格:${course.price}
                </p>
                <p style={{ margin: "0.5rem 0rem" }}>
                  講師:{course.instructor.username}
                </p>
              </div>
              <div className="card-footer">{renderCourseActions(course)}</div>
            </div>
          ))}
        </div>
      )}

      {editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onUpdate={handleUpdate}
          showAlert={showAlert}
        />
      )}
    </div>
  );
};
export default CourseComponent;
