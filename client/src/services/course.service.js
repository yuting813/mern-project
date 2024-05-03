import axios from "axios";
// import { JSON } from "react-router-dom";
// const API_URL = "http://localhost:8080/api/courses";
const API_URL = "https://mern-project-p7hk.onrender.com/api/courses";

// 定義獲取token的函數
function getToken() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).token : "";
}

class CourseService {
  post(title, description, price) {
    const token = getToken();
    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  // 使用學生 id,來找到學生註冊的課程
  async getEnrolledCourses(_id) {
    const token = getToken();
    try {
      const response = await axios.get(API_URL + "/student/" + _id, {
        headers: {
          Authorization: token,
        },
      });

      return response.data;
    } catch (error) {
      console.error("獲取課程數據時發生錯誤:", error);
      // 處理錯誤情況
      return [];
    }
  }

  // 使用instructor id,來找到講師擁有的課程
  async get(_id) {
    const token = getToken();
    const response = await axios.get(API_URL + "/instructor/" + _id, {
      headers: {
        Authorization: token,
      },
    });
    try {
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      // 處理錯誤的情況
      return [];
    }
  }

  // 使用課程名稱搜尋課程
  // getCourseByName(name) {
  //   const token = getToken();
  //   return axios.get(API_URL + "/findByName/" + name, {
  //     headers: {
  //       Authorization: token,
  //     },
  //   });
  // }

  // 使用课程名称模糊搜索課程
  getCourseByName(name) {
    const token = getToken();
    return axios.get(API_URL + /search/ + name, {
      headers: {
        Authorization: token,
      },
    });
  }

  // 使用學生ID註冊
  enroll(_id) {
    const token = getToken();
    return axios.post(
      API_URL + "/enroll/" + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new CourseService();
