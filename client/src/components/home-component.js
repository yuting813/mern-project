import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/custom.css";
import Banner from "./banner";
import CourseCardScroller from "./course-cardScroller";

const HomeComponent = () => {
  const navigate = useNavigate();

  const handleTakeToPostCourse = () => {
    navigate("/postCourse");
  };

  const handleTakeToEnroll = () => {
    navigate("/enroll");
  };

  return (
    <main>
      <Banner />

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
          <a>探索JavaScript</a>

          <CourseCardScroller />
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
                瞭解更多
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src={require("../assets/student.jpg")}
              alt="學習示意圖"
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
    </main>
  );
};

export default HomeComponent;
