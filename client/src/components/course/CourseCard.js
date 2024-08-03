import React, { useState } from "react";
import CourseImage from "./CourseImage";
import CourseDetails from "./CourseDetails";

const CourseCard = ({ course, isLastTwoCards, showAlert, currentUser }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="me-3 p-2 position-relative image-hover mb-4"
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

export default CourseCard;
