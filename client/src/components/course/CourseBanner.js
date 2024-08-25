import React from "react";
import CourseCardScroller from "./CourseCardScroller";
import "../../styles/components/course-card.css";

const CourseBanner = ({ showAlert, currentUser }) => {
  return (
    <div>
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

          <div className="course-position-relative">
            <CourseCardScroller
              showAlert={showAlert}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBanner;
