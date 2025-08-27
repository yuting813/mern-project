import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../services/course.service";
import useAuthUser from "../../hooks/useAuthUser";

const CourseDetails = ({ course, isNearRightEdge, showAlert, currentUser }) => {
  const navigate = useNavigate();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const { uid, isStudent } = useAuthUser(currentUser);

  // 判斷目前使用者是否已註冊（兼容 students 可能是 id 字串或物件）
  const isEnrolled = useMemo(() => {
    if (!uid || !course?.students) return false;
    const me = uid;
    return course.students.some(
      (s) => (typeof s === "string" ? s : s?._id) === me
    );
  }, [course?.students, uid]);

  const handleEnroll = async () => {
    // 未登入
    if (!currentUser) {
      showAlert("請先登入", "註冊課程前，請先登入學生帳號。", "elegant", 1000);
      return;
    }

    // 重構前：直接檢查角色
    // if (currentUser.user?.role === "instructor")

    // 重構後：使用AuthService
    if (!isStudent) {
      showAlert("無法註冊", "註冊請轉換至學生身分", "elegant", 2000);
      return;
    }
    // 已註冊或執行中
    if (isEnrolled || isEnrolling) return;

    try {
      setIsEnrolling(true);
      await CourseService.enroll(course._id); // 副作用只在事件處理器中發生
      showAlert("課程註冊成功!", "將導向到課程頁面。", "elegant", 500);
      navigate("/course"); // 若要導向到單一課程，可用 `/course/${course._id}`
    } catch (err) {
      // 這裡不印 console，交給 UI 告知；之後可接你的集中式 logger
      showAlert("檢查註冊狀態失敗", "請稍後再試", "error", 3000);
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div
      className="card position-absolute course-details-card"
      style={{
        width: "16.5rem",
        zIndex: 1500,
        ...(isNearRightEdge
          ? { right: 0, transform: "translateX(-3%)" }
          : { left: 0, transform: "translateX(93%)" }),
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
          <li>講師：{course.instructor?.username || "未指定"}</li>
          <li>4.8 ★★★★★ ({course.students.length})</li>
          <li>課程價格：${Number(course.price).toLocaleString()}</li>
        </ul>

        <button
          type="button" // 避免在 form 內觸發 submit
          onClick={handleEnroll}
          className="btn btn-sm custom-button btn-primary w-100"
          disabled={isEnrolled || isEnrolling}
          aria-disabled={isEnrolled || isEnrolling}
          aria-busy={isEnrolling}
        >
          {isEnrolled ? "已註冊" : isEnrolling ? "註冊中…" : "註冊課程"}
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
