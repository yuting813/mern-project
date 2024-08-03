import React, { useState, useEffect, useRef } from "react";
import CourseService from "../../services/course.service";
import CourseCard from "./CourseCard";
import ScrollButton from "./ScrollButton";
import "../../styles/components/course-card.css";

const CourseCardScroller = ({ showAlert, currentUser }) => {
  const [courseData, setCourseData] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [visibleCards, setVisibleCards] = useState(5);
  const containerRef = useRef(null);

  const cardWidth = 250;

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
    if (screenWidth >= 1200) setVisibleCards(5);
    else if (screenWidth >= 992) setVisibleCards(4);
    else if (screenWidth >= 768) setVisibleCards(3);
    else if (screenWidth >= 576) setVisibleCards(2);
    else setVisibleCards(1);
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
