import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";
import postCourseDesktop from "../assets/postCourse-desktop-v1.jpg";
import postCourseMmbile from "../assets/postCourse-mobile-v2.jpg";
import planYourCurriculum from "../assets/plan-your-curriculum-v1.jpg";

const PostCourseComponent = ({ currentUser, setCurrentUser, showAlert }) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  let [image, setImage] = useState("");

  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleTakeToRegister = () => {
    navigate("/register");
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        setImage(reader.result);
      };
      reader.onerror = function (error) {
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file);
    }
  };

  const postCourse = () => {
    CourseService.post(title, description, price, image)
      .then(() => {
        // window.alert("新課程已創建成功");
        showAlert(
          "新課程已創建成功!",
          "您將被導向至個人課程頁面。",
          "elegant",
          500
        );

        setTimeout(() => {
          navigate("/course");
        }, 500);
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div>
      {!currentUser && (
        <div class="banner-container">
          <div className="w-100">
            <picture>
              <source
                srcSet={postCourseMmbile}
                width="650"
                height="416"
                media="(max-width: 768px)"
                loading="lazy"
              ></source>

              <img
                className="w-100 img-fluid"
                alt="Banner"
                src={postCourseDesktop}
                loading="lazy"
              ></img>
            </picture>
          </div>

          <div class="text-container bg-light p-4 mx-5">
            <h2 className="mb-3 ">與我們一起教學</h2>
            <p className="mb-4">成為講師，改變您與他人的人生</p>
            <button
              className="btn  btn-dark rounded-0 w-100 "
              onClick={handleTakeToLogin}
            >
              立即開始
            </button>
          </div>
        </div>
      )}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <div class="banner-container">
            <picture>
              <source
                srcSet={postCourseMmbile}
                width="650"
                height="416"
                media="(max-width: 768px)"
                loading="lazy"
              ></source>

              <img
                className="w-100 img-fluid"
                alt="Banner"
                src={postCourseDesktop}
                s
                loading="lazy"
              ></img>
            </picture>

            <div class="text-container bg-light">
              <h2 className="mb-3 ">只有講師能發布新課程</h2>
              <p className="mb-4 ">成為講師，改變您與他人的人生</p>
              <button
                className="btn btn-lg btn-dark rounded-0 w-100 "
                onClick={handleTakeToRegister}
              >
                立即開始
              </button>
            </div>
          </div>
        </div>
      )}

      {currentUser && currentUser.user.role == "instructor" && (
        <div className="container">
          <div className=" row flex-md-row flex-column-reverse">
            <div className="col-md-6">
              <img src={planYourCurriculum} alt="" className="img-fluid" />
            </div>
            <div className="form-group col-md-6 p-4">
              <h2 className="my-4 text-center">建立課程</h2>
              <label for="exampleforTitle">課程標題：</label>
              <input
                name="title"
                type="text"
                className="form-control"
                id="exampleforTitle"
                onChange={handleChangeTitle}
              />
              <br />
              <label for="exampleforContent">內容：</label>
              <textarea
                className="form-control"
                id="exampleforContent"
                aria-describedby="emailHelp"
                name="content"
                onChange={handleChangeDesciption}
              />
              <br />
              <label for="exampleforPrice">價格：</label>
              <input
                name="price"
                type="number"
                className="form-control"
                id="exampleforPrice"
                onChange={handleChangePrice}
              />
              <br />

              <div>
                <p>課程封面:</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChangeImage}
                />
                {image && <img src={image} alt="uploaded" />}
              </div>

              <button
                className="btn btn-primary my-4 custom-button"
                onClick={postCourse}
              >
                交出表單
              </button>
              <br />
              <br />
              {message && (
                <div className="alert alert-warning" role="alert">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;
