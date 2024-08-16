import React from "react";
import CourseSkeletonCard from "./CourseSkeletonCard";
import "../../styles/components/course-skeleton.css";


const CourseSkeleton = () => {
  return (
    <div className="skeleton-course-card-scroller">
      {[...Array(5)].map((_, index) => (
        <CourseSkeletonCard key={index} />
      ))}
    </div>
  );
};

export default CourseSkeleton;
