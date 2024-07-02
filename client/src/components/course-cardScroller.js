import React, { useState, useEffect, useRef } from "react";
import CourseService from "../services/course.service";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseImage from "./course-image";

const CourseCard = ({ course }) => (
  <div className="card me-3" style={{ width: "16rem", flexShrink: 0 }}>
    <CourseImage course={course} />
    <div className="card-body">
      <h5 className="card-title">{course.title}</h5>
      <p className="card-text">{course.description}</p>
      <p className="card-text">價格: ${course.price}</p>
      <p className="card-text">講師: {course.instructor.username}</p>
    </div>
  </div>
);

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
      const cardWidth = container.querySelector(".card").offsetWidth;
      const scrollDistance = cardWidth * 4 * (direction === "right" ? 1 : -1);

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
        className="d-flex overflow-auto py-3 hide-scrollbar scroll-behavior"
      >
        {courseData.map((course, index) => (
          <CourseCard key={index} course={course} />
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
