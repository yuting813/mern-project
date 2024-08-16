import React, { useState, useEffect, useRef, useCallback } from "react";
import CourseService from "../../services/course.service";
import CourseCard from "./CourseCard";
import ScrollButton from "./ScrollButton";
import CourseSkeleton from "./CourseSkeleton";
import "../../styles/components/course-card.css";

const CourseCardScroller = ({ showAlert, currentUser }) => {
  const [courses, setCourses] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [nearRightEdge, setNearRightEdge] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const checkScrollState = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const isAtStart = scrollLeft === 0;
    const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;

    setShowLeftArrow(!isAtStart);
    setShowRightArrow(!isAtEnd);

    const threshold = 20;
    setNearRightEdge(
      cardsRef.current.map((card) => {
        if (!card) return false;
        const cardRect = card.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        return (
          cardRect.left < containerRect.right &&
          containerRect.right - cardRect.right < threshold
        );
      })
    );
  }, [setNearRightEdge]);

  const scroll = useCallback(
    (direction) => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const scrollDistance = container.clientWidth;
      container.scrollBy({
        left: direction === "right" ? scrollDistance : -scrollDistance,
        behavior: "smooth",
      });
      setTimeout(checkScrollState, 500); // 滾動完成後檢查狀態
    },
    [checkScrollState]
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await CourseService.getAllCourses();
        setCourses(response.data);
        setTimeout(checkScrollState, 0);
      } catch (error) {
        console.error("獲取課程資料失敗:", error);
        setError("獲取課程資料失敗");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollState);
      window.addEventListener("resize", checkScrollState);
      return () => {
        container.removeEventListener("scroll", checkScrollState);
        window.removeEventListener("resize", checkScrollState);
      };
    }
  }, [checkScrollState]);

  if (isLoading) return <CourseSkeleton />;
  if (error)
    return (
      <div>
        錯誤: {error}
        <CourseSkeleton />
      </div>
    );
  if (courses.length === 0) return <div>目前沒有可用的課程</div>;

  return (
    <div className="course-card-scroller">
      <ScrollButton
        direction="left"
        onClick={() => scroll("left")}
        isVisible={showLeftArrow}
      />
      <div ref={containerRef} className="course-card-grid">
        {courses.map((course, index) => (
          <CourseCard
            key={course._id}
            ref={(el) => (cardsRef.current[index] = el)}
            course={course}
            showAlert={showAlert}
            currentUser={currentUser}
            isNearRightEdge={nearRightEdge[index]}
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
