import React, { useState, useEffect, useRef } from "react";
import CourseService from "../services/course.service";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseImage from "./course-image";
import "../styles/components/_course-card.css";
import { useNavigate } from "react-router-dom";

const CourseDetails = ({ course, isLastTwoCards, showAlert, currentUser }) => {
  const navigate = useNavigate();

  const handleEnroll = (e) => {
    e.preventDefault();

    if (!currentUser) {
      showAlert("請先登入", "註冊課程前，請先登入學生帳號。", "elegant", 1000);
      // navigate("/login");
      return;
    }

    if (currentUser.user.role === "instructor") {
      showAlert("無法註冊", "註冊請轉換至學生身分", "elegant", 3000);
      // navigate("/login");
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
      className="card position-absolute"
      style={{
        width: "17rem",
        zIndex: 1000,
        // height:"20rem",
        ...(isLastTwoCards
          ? { right: "0", transform: "translateX(-92%)" }
          : { left: "0", transform: "translateX(-2%)" }),
      }}
    >
      <div className="card-body">
        <h6 className="card-title fw-bold">{course.title}</h6>
        <p className="card-text  text-muted">{course.description}</p>
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

const CourseCard = ({ course, isLastTwoCards, showAlert, currentUser }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="me-3 p-2 position-relative image-hover"
      style={{ width: "16rem", flexShrink: 0 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="course-imager">
        <CourseImage course={course} />
      </div>
      <div className="card-body">
        <h6 className="card-title pt-2 fw-bold">{course.title}</h6>
        <p className="card-text pt-1 text-muted ">
          講師: {course.instructor.username}
        </p>
      </div>

      <div className={`course-details-wrapper ${isHovering ? "show" : ""}`}>
        <CourseDetails
          course={course}
          isLastTwoCards={isLastTwoCards}
          showAlert={showAlert}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

const ScrollButton = ({ direction, onClick, isVisible }) => (
  <button
    onClick={onClick}
    className={`btn btn-dark rounded-circle position-absolute top-50 translate-middle-y ${
      direction === "left" ? "start-0" : "end-0"
    }`}
    style={{
      display: isVisible ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1100,
      width: "3.5rem",
      height: "3.5rem",
    }}
  >
    {direction === "left" ? (
      <ChevronLeft size={28} />
    ) : (
      <ChevronRight size={28} />
    )}
  </button>
);

const CourseCardScroller = ({ showAlert, currentUser }) => {
  const [courseData, setCourseData] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const [visibleCards, setVisibleCards] = useState(5);
  const containerRef = useRef(null);

  const cardWidth = 250; // 設置每張卡片的寬度（包括 margin）

  useEffect(() => {
    CourseService.getAllCourses()
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((error) => {
        console.error("獲取課程資料失敗:", error);
      });
  }, []);

  const updateVisibleCards = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
      setVisibleCards(5);
    } else if (screenWidth >= 992) {
      setVisibleCards(4);
    } else if (screenWidth >= 768) {
      setVisibleCards(3);
    } else if (screenWidth >= 576) {
      setVisibleCards(2);
    } else {
      setVisibleCards(1);
    }
  };

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const scroll = (direction) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollDistance = cardWidth * visibleCards;

    container.scrollBy({
      left: direction === "right" ? scrollDistance : -scrollDistance,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="position-relative">
      <ScrollButton
        direction="left"
        onClick={() => scroll("left")}
        isVisible={showLeftArrow}
      />
      <div
        ref={containerRef}
        className="d-flex overflow-hidden"
        style={{
          width: `${cardWidth * visibleCards}px`,
          scrollSnapType: "x mandatory",
        }}
      >
        {courseData.map((course, index) => (
          <div
            key={course._id}
            style={{
              scrollSnapAlign: "start",
              width: `${cardWidth}px`,
              flexShrink: 0,
            }}
          >
            <CourseCard
              course={course}
              isLastTwoCards={index % visibleCards >= visibleCards - 2}
              showAlert={showAlert}
              currentUser={currentUser}
            />
          </div>
        ))}
      </div>
      <ScrollButton
        direction="right"
        onClick={() => scroll("right")}
        isVisible={showRightArrow}
      />
    </div>
  );
};

export default CourseCardScroller;
