import React, { useState } from "react";
import "../../styles/components/course-card.css";

const CourseImage = ({ course }) => {
  const defaultImage = "https://i.ibb.co/BKqMHq0/logo.png";
  const [imgSrc, setImgSrc] = useState(course.image || defaultImage);

  const handleImageError = () => {
    if (imgSrc !== defaultImage) {
      setImgSrc(defaultImage);
    }
  };

  return (
    <img
      src={imgSrc}
      alt="課程圖片"
      onError={handleImageError}
      className="card-img-top card-img-size img-fluid mb-2"
    />
  );
};
export default CourseImage;
