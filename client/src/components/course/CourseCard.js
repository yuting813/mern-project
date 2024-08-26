import React, { useState, forwardRef } from "react";
import CourseImage from "./CourseImage";
import CourseDetails from "./CourseDetails";

const CourseCard = forwardRef(
  ({ course, showAlert, currentUser, isNearRightEdge }, ref) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
      <div
        ref={ref}
        className="me-3 p-2 position-relative image-hover mb-4"
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
            showAlert={showAlert}
            currentUser={currentUser}
            isNearRightEdge={isNearRightEdge}
          />
        </div>
      </div>
    );
  }
);

export default CourseCard;
