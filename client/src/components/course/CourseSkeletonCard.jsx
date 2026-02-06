import React from 'react';
import '../../styles/components/course-skeleton-card.css';

const CourseSkeletonCard = () => {
  return (
    <div className="skeleton-course-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
      </div>
    </div>
  );
};

export default CourseSkeletonCard;
