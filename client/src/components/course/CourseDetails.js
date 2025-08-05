import React from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../services/course.service";

const CourseDetails = ({ course, isNearRightEdge, showAlert, currentUser }) => {
  const navigate = useNavigate();

  const handleEnroll = (e) => {
    e.preventDefault();

    if (!currentUser) {
      showAlert("請先登入", "註冊課程前，請先登入學生帳號。", "elegant", 1000);
      return;
    }

    if (currentUser.user.role === "instructor") {
      showAlert("無法註冊", "註冊請轉換至學生身分", "elegant", 2000);
      return;
    }

    CourseService.enroll(e.target.id)
      .then(() => {
        showAlert("課程註冊成功!", "將導向到課程頁面。", "elegant", 500);
        navigate("/course");
      })
      .catch((err) => {
        console.log(err);
        showAlert("檢查註冊狀態失敗", "請稍後再試", "error", 3000);
      });
  };

  return (
    <div
      className="card position-absolute course-details-card"
      style={{
        width: "16.5rem",
        zIndex: 1500,
       
        ...(isNearRightEdge
          ? { right: "0", transform: "translateX(-5%)" }
          : { left: "0", transform: "translateX(73%)" }),
      }}
    >
      <div className="card-body p-3">
        <h6 className="card-title fw-bold">{course.title}</h6>
        <p
          className="card-text text-muted small mb-2"
          style={{ minHeight: "3rem" }}
        >
          {course.description}
        </p>
        <ul className="list-unstyled text-muted small mt-auto mb-3">
          <li>講師：{course.instructor.username}</li>
          <li>4.8 ★★★★★ ({course.students.length})</li>
          <li>課程價格：${course.price}</li>
        </ul>

        <button
          id={course._id}
          onClick={handleEnroll}
          className=" btn btn-sm custom-button btn-primary w-100 "
        >
          註冊課程
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
