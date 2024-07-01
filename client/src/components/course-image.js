import React, { useState } from "react";

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
      className="card-img-top"
      style={{
        height: "11rem",
        objectFit: "cover",
      }}
    />
  );
};
export default CourseImage;
