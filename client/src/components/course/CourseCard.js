import React, { useState, forwardRef } from "react";
import CourseImage from "./CourseImage";
import CourseDetails from "./CourseDetails";

const CourseCard = forwardRef(
  ({ course, showAlert, currentUser, isNearRightEdge }, ref) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
      <div
        ref={ref}
        className="me-3 p-2 position-relative card-img-size mb-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="course-imager">
          <CourseImage course={course} />
        </div>
        <div className="card-body">
          <h6 className="card-title pt-2 fw-bold">{course.title}</h6>

          <ul className="list-unstyled text-muted small mt-auto mb-2 pt-2">
            <li>講師：{course.instructor?.username || "未指定"}</li>
            <li>4.8 ★★★★★ ({course.students.length})</li>
            <li>價格：${course.price}</li>
          </ul>
          <span className="badge-tag">暢銷課程</span>
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
