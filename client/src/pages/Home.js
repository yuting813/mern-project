import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import Banner from "../components/home/Banner.js";
import CourseBanner from "../components/course/CourseBanner.js";
import Instructor from "../assets/instructor.jpg"
import Student from "../assets/student.jpg"


const HomeComponent = ({ showAlert, currentUser }) => {
  const navigate = useNavigate();

  const handleTakeToCreateCourse = () => {
    navigate("/CreateCourse");
  };

  const handleTakeToEnroll = () => {
    navigate("/enroll");
  };

  return (
    <main>
      <div>
        <Banner />
      </div>
      <div>
        <CourseBanner 
         showAlert={showAlert}
         currentUser={currentUser}
        />
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

              <a
                href="/enroll"
                className="btn btn-lg btn-dark rounded-0"
                onClick={handleTakeToEnroll}
              >
                瞭解更多
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src={Student}
              alt="學習示意圖"
              className="img-fluid img-small"
            />
          </div>
        </div>

        <div className="row align-items-md-center">
          <div className="col-md-6">
            <img
              src={Instructor}
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
              <a
                href="/createcourse"
                className="btn btn-lg btn-dark rounded-0"
                onClick={handleTakeToCreateCourse}
              >
                立即開始教學
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeComponent;
