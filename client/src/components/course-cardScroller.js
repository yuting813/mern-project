import React, { useState, useEffect, useRef } from "react";
import CourseService from "../services/course.service";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseImage from "./course-image";
import "../styles/components/_course-card.css";
import { useNavigate } from "react-router-dom";

const CourseDetails = ({ course, isLastCard, showAlert }) => {
  const navigate = useNavigate();

  const handleEnroll = (e) => {
    navigate("/course");
  };

  return (
    <div
      className={`card position-absolute top-0  ${
        isLastCard ? "end-100 me-2" : "start-100 ms-2"
      }`}
      style={{ width: "20rem", zIndex: 1350 }}
    >
      <div className="card-body">
        <h4 className="card-title mb-1">{course.title}</h4>
        <p className="card-text">{course.description}</p>
      </div>
      <button
        id={course._id}
        onClick={handleEnroll}
        className="card-text btn custom-button btn-primary  m-4"
      >
        註冊課程
      </button>
    </div>
  );
};

const CourseCard = ({ course, isLastCard }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className=" me-5 p-2 position-relative image-hover"
      style={{ width: "16rem", flexShrink: 0 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="course-imager">
        <CourseImage course={course} />
      </div>
      <div className="card-body">
        <h4 className="card-title mb-2">{course.title}</h4>
        <p className="card-text">講師: {course.instructor.username}</p>
        <p className="card-text">價格: ${course.price}</p>
      </div>

      <div className={`course-details-wrapper ${isHovering ? "show" : ""}`}>
        <CourseDetails course={course} isLastCard={isLastCard} />
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
      zIndex: 10,
      width: "40px",
      height: "40px",
    }}
  >
    {direction === "left" ? (
      <ChevronLeft size={24} />
    ) : (
      <ChevronRight size={24} />
    )}
  </button>
);

const CourseCardScroller = () => {
  const [courseData, setCourseData] = useState([]);
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    CourseService.getAllCourses()
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((error) => {
        console.error("獲取課程資料失敗:", error);
      });
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollDistance =
        container.clientWidth * 0.8 * (direction === "right" ? 1 : -1);

      container.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }
  };

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  useEffect(() => {
    if (courseData.length > 0) {
      setTimeout(checkScrollPosition, 0);
    }
  }, [courseData]);

  return (
    <div className="position-relative pe-4">
      <ScrollButton
        direction="left"
        onClick={() => scroll("left")}
        isVisible={showLeftArrow}
      />
      <div
        ref={scrollContainerRef}
        className="d-flex overflow-auto py-3"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollBehavior: "smooth",
        }}
      >
        {courseData.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            isLastCard={index === courseData.length - 1}
          />
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
