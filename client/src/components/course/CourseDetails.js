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
      className="card position-absolute "
      style={{
        width: "17rem",
        zIndex: 1500,
        ...(isNearRightEdge
          ? { right: "0", transform: "translateX(-3%)" }
          : { left: "0", transform: "translateX(73%)" }),
      }}
    >
     
      <div className="card-body ">
        <h6 className="card-title fw-bold">{course.title}</h6>
        <p className="card-text text-muted">{course.description}</p>
        <p className="">課程價格:${course.price}</p>
        <button
          id={course._id}
          onClick={handleEnroll}
          className="card-text btn custom-button btn-primary w-100"
        >
          註冊課程
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
