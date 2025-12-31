import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../services/course.service";
import useAuthUser from "../../hooks/useAuthUser";

const CourseDetails = ({ course, showAlert, currentUser }) => {
  const navigate = useNavigate();
  const { uid, isStudent } = useAuthUser(currentUser);

  const [isEnrolling, setIsEnrolling] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const isEnrolled = useMemo(() => {
    if (!uid || !course?.students) return false;
    return course.students.some(
      (s) => (typeof s === "string" ? s : s?._id) === uid
    );
  }, [course?.students, uid]);

  const handleEnroll = async () => {
    if (!currentUser) {
      showAlert("請先登入", "註冊課程前，請先登入學生帳號。", "elegant", 1000);
      return;
    }

    if (!isStudent) {
      showAlert("無法註冊", "註冊請轉換至學生身分", "elegant", 2000);
      return;
    }

    if (isEnrolled || isEnrolling) return;

    try {
      setIsEnrolling(true);
      await CourseService.enroll(course._id);
      showAlert("課程註冊成功!", "將導向到課程頁面。", "elegant", 500);
      navigate("/course");
    } catch {
      showAlert("註冊失敗", "請稍後再試", "error", 3000);
    } finally {
      setIsEnrolling(false);
    }
  };

  /* =========================
     Mobile：點擊展開 / 收合
     ========================= */
  if (isMobile) {
    return (
      <div className="card course-details-card my-2">
        <button
          type="button"
          className="btn text-start w-100"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
        >
          <strong>{course.title}</strong>
          <span className="float-end">{expanded ? "▲" : "▼"}</span>
        </button>

        {expanded && (
          <div className="card-body pt-2">
            <h6 className="fw-bold">{course.title}</h6>
            <p className="text-muted small mb-2">{course.description}</p>

            <ul className="list-unstyled text-muted small mb-3">
              <li>講師：{course.instructor?.username || "未指定"}</li>
              <li>4.8 ★★★★★ ({course.students.length})</li>
              <li>課程價格：${Number(course.price).toLocaleString()}</li>
            </ul>

            <button
              type="button"
              onClick={handleEnroll}
            className="btn btn-sm btn-purple w-100"
              disabled={isEnrolled || isEnrolling}
            >
              {isEnrolled ? "已註冊" : isEnrolling ? "註冊中…" : "註冊課程"}
            </button>
          </div>
        )}
      </div>
    );
  }

  /* =========================
     Desktop：原本 hover 卡片
     ========================= */
  return (
    // <div
    //   className="card position-absolute course-details-card"
    //   style={{
    //     width: "16.5rem",
    //     zIndex: 1500,
    //     ...(isNearRightEdge
    //       ? { right: 0, transform: "translateX(-3%)" }
    //       : { left: 0, transform: "translateX(93%)" }),
    //   }}
    // >

    <div className="course-details-card">
        <h6 className="fw-bold">{course.title}</h6>
        <p className="text-muted small mb-2" style={{ minHeight: "3rem" }}>
          {course.description}
        </p>

        <ul className="list-unstyled text-muted small mb-3">
          <li>講師：{course.instructor?.username || "未指定"}</li>
          <li>4.8 ★★★★★ ({course.students.length})</li>
          <li>課程價格：${Number(course.price).toLocaleString()}</li>
        </ul>

        <button
          type="button"
          onClick={handleEnroll}
        className="btn btn-sm btn-purple w-100"
          disabled={isEnrolled || isEnrolling}
        >
          {isEnrolled ? "已註冊" : isEnrolling ? "註冊中…" : "註冊課程"}
        </button>
    </div>
  );
};

export default CourseDetails;
