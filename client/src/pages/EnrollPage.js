import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";
import CourseCardS from "../components/course/CourseCardScroller";
import CourseImage from "../components/course/CourseImage";

const EnrollPage = ({ currentUser, showAlert }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchResult, setSearchResult] = useState([]);
  const [searchError, setSearchError] = useState("");

  /* ───── 進頁即判斷是否帶 keyword ───── */
  useEffect(() => {
    const kw = location.state?.keyword?.trim();
    if (kw) runSearch(kw);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  /* ───── 搜尋核心 ───── */
  const runSearch = (keyword) => {
    if (!keyword) {
      setSearchResult([]);
      setSearchError("請輸入搜尋關鍵字");
      return;
    }

    CourseService.getCourseByName(keyword)
      .then(({ data }) => {
        if (data?.length) {
          setSearchResult(data);
          setSearchError("");
        } else {
          setSearchResult([]);
          setSearchError(`找不到與「${keyword}」相關的課程，請再試一次。`);
        }
      })
      .catch(() => {
        setSearchResult([]);
        setSearchError("搜尋過程中發生錯誤，請稍後再試。");
      });
  };

  /* ───── 註冊課程（含登入／身分檢查） ───── */
  const handleEnrollClick = (courseId) => {
    // 未登入
    if (!currentUser) {
      showAlert("請先登入", "註冊課程前，請先登入學生帳號。", "elegant", 2000);
      return;
    }

    // 不是學生
    if (currentUser.user.role === "instructor") {
      showAlert("無法註冊", "註冊請轉換至學生身分", "elegant", 3000);
      return;
    }

    // OK → 呼叫 API
    CourseService.enroll(courseId)
      .then(() => {
        showAlert("課程註冊成功!", "將導向到課程頁面。", "elegant", 3000);
        navigate("/course");
      })
      .catch((err) => {
        console.error(err);
        showAlert("檢查註冊狀態失敗", "請稍後再試", "error", 3000);
      });
  };

  /* ───── JSX ───── */
  return (
    <div>
      {searchError && (
        <div className="alert alert-info text-center mx-auto mt-5 w-50">
          {searchError}
        </div>
      )}

      {searchResult.length === 0 ? (
        <div className="px-5 py-4">
          <h3 className="mt-5 ms-2">學習者正在檢視</h3>
          <CourseCardS
            scroller
            showAlert={showAlert}
            currentUser={currentUser}
          />
        </div>
      ) : (
        <div className="container">
          <h5 className="mt-4 mb-3">搜尋到以下課程 :</h5>

          <div className="row">
            {searchResult.map((course) => (
              <div
                key={course._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <div className="card h-100 border-0 shadow-sm">
                  <CourseImage course={course} height="180px" width="100%" />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold mt-3">{course.title}</h5>
                    <p className="card-text small text-muted">
                      {course.description}
                    </p>
                    <ul className="list-unstyled text-muted small mt-auto mb-2">
                      <li>學生人數：{course.students.length}</li>
                      <li>價格：${course.price}</li>
                      <li>講師：{course.instructor?.username || "未指定"}</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleEnrollClick(course._id)}
                    className="btn btn-sm btn-purple m-3"
                  >
                    註冊課程
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollPage;
