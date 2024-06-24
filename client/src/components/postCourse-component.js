import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const PostCourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  let [image, setImage] = useState("");

  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
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
        window.alert("新課程已創建成功");
        navigate("/course");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div>
      {!currentUser && (
        <div class="header-container">
          <img
            src="https://s.udemycdn.com/teaching/billboard-desktop-v4.jpg"
            alt=""
            class="header-container-img"
            // loading="lazy"
            srcset="https://s.udemycdn.com/teaching/billboard-desktop-v4.jpg 1x,
             https://s.udemycdn.com/teaching/billboard-desktop-2x-v4.jpg 2x"
            sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
          ></img>

          <div class="text-container">
            <h1>與我們一起教學</h1>
            <p>成為講師，改變您與他人的人生</p>
            <button
              className="btn btn-lg btn-dark rounded-0 w-100 "
              onClick={handleTakeToLogin}
            >
              立即開始
            </button>
          </div>
        </div>
      )}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <p>只有講師可以發布新課程。</p>
        </div>
      )}

      {currentUser && currentUser.user.role == "instructor" && (
        <div className="form-group container col-md-6 p-4">
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
            <input type="file" accept="image/*" onChange={handleChangeImage} />
            {image && <img src={image} alt="uploaded" />}
          </div>

          <button className="btn btn-primary my-4" onClick={postCourse}>
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
      )}
    </div>
  );
};

export default PostCourseComponent;
