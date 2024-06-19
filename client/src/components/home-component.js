import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/custom.css";
import CourseService from "../services/course.service";

const HomeComponent = () => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleTakeToPostCourse = () => {
    navigate("/postCourse");
  };

  const handleTakeToEnroll = () => {
    navigate("/enroll");
  };

  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    // 在元件初始化時獲取課程資料
    CourseService.getAllCourses()
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((error) => {
        console.error("獲取課程資料失敗:", error);
      });
  }, []);

  return (
    <main>
      <div
        className=" d-flex justify-content-start  align-items-center bg-light bg-image pb-5 mb-4"
        style={{ height: "400px" }}
      >
        <div
          className="col-md-6 p-4 bg-white border m-4"
          style={{ maxWidth: "410px" }}
        >
          <h1>
            <strong>享受優惠價格，踏上學習之旅</strong>
          </h1>
          <p>
            您若是剛接觸，這裡有大好消息：新的學習者可享限時優惠，課程最低只需$390！即刻選購。
          </p>
        </div>
      </div>

      <div className="p-4">
        <div>
          <h2>
            {" "}
            <strong>廣泛的課程選擇 </strong>
          </h2>
          <p>超過2100個線上影片課程與每個月發佈的新增內容，任您選擇</p>
        </div>
        <div className="p-3 " style={{ border: "1px solid #ccc" }}>
          <h3>
            <strong>讓 JavaScript 增強您的軟體開發技能</strong>
          </h3>
          <p>
            JavaScript
            是地球上數一數二常見的程式語言，絕大部分是因為它撐起了互動式網頁應用程序。不僅如此，JavaScript
            也是很適合初學者的程式語言，因為所寫出的程式碼能讓他們看見視覺成果。對初出茅廬的程式設計師來說，這無非是令人振奮且助益良多的事。動態內容是當今網頁開發的熱門話題。動態內容指的是會盡可能因應特定使用者而不斷改變、調整的內容。舉例來說，JavaScript
            可用於判斷網站訪客是用電腦還是行動裝置，再決定是否提供行動版網頁。正是幕後這一件件小事，讓使用
            JavaScript 建立動態網頁有了真正的價值。
          </p>
          <a key={1}>探索JavaScript</a>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {courseData.map((course) => {
              return (
                <div
                  className="card"
                  style={{ width: "18rem", margin: "1rem" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">課程名稱:{course.title}</h5>
                    <p className="card-text" style={{ margin: "0.5rem 0rem" }}>
                      {course.description}
                    </p>

                    <p style={{ margin: "0.5rem 0rem" }}>
                      課程價格:${course.price}
                    </p>
                    <p style={{ margin: "0.5rem 0rem" }}>
                      講師:{course.instructor.username}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row align-items-md-center">
          <div className="col-md-6">
            <div className="p-4 m-4">
              <h2 className="py-3">
                <strong>透過課程升級,為您的團隊提升技能</strong>
              </h2>
              <ul>
                <li>隨時隨地皆能無限制地存取260門以上的頂尖課程</li>

                <li>科技及商業的頂尖證書</li>
                <li>本網站僅供練習之用</li>
              </ul>

              <button
                onClick={handleTakeToEnroll}
                className="btn btn-lg btn-dark rounded-0"
                type="button"
              >
                登錄瞭解更多
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src={require("../assets/student.jpg")}
              alt="課程學習示意圖"
              className="img-fluid img-small"
            />
          </div>
        </div>
        <div className="row align-items-md-center">
          <div className="col-md-6">
            <img
              src={require("../assets/instructor.jpg")}
              alt="instructor"
              className="img-fluid img-small"
            />
          </div>
          <div className="col-md-6">
            <div className=" p-4 m-4">
              <h2 className="py-3">
                <strong>成為講師</strong>
              </h2>
              <p>
                在這,有來自世界各地的講師為各位學習者講授課程。我們為您準備各種工具與技能,助您教授您所熱愛的事物。
              </p>
              <button
                onClick={handleTakeToPostCourse}
                className="btn btn-lg btn-dark rounded-0"
                type="button"
              >
                立即開始教學
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-light py-3 px-5 mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src={require("../assets/logo.png")}
              alt="Logo"
              className="img-fluid footer-logo"
            />
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">
              本網站僅供練習之用,請勿提供任何個人資料,例如信用卡號碼。
            </p>
            <p className="mb-0">&copy; 2024 Tina Hu</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HomeComponent;
