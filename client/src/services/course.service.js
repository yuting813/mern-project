import axios from "axios";
const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/courses`;

// 定義獲取token的函數
function getToken() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).token : "";
}

function handleError(error) {
  console.error("發生錯誤:", error);
}

class CourseService {
  post(title, description, price, image) {
    const token = getToken();
    return axios.post(
      API_URL,
      { title, description, price, image },
      {
        headers: { Authorization: token },
      }
    );
  }

  async getEnrolledCourses(studentId) {
    const token = getToken();
    try {
      const response = await axios.get(`${API_URL}/student/${studentId}`, {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      handleError(error);
      return [];
    }
  }

  async getInstructorCourses(instructorId) {
    const token = getToken();
    try {
      const response = await axios.get(
        `${API_URL}/instructor/${instructorId}`,
        {
          headers: { Authorization: token },
        }
      );
      return response.data;
    } catch (error) {
      handleError(error);
      return [];
    }
  }

  getCourseByName(keyword) {
    const token = getToken();
    return axios.get(`${API_URL}`, {
      params: { keyword },
      headers: { Authorization: token },
    });
  }

  getAllCourses() {
    const token = getToken();
    return axios.get(API_URL, {
      headers: { Authorization: token },
    });
  }

  enroll(courseId) {
    const token = getToken();
    return axios.post(
      `${API_URL}/enroll/${courseId}`,
      {},
      {
        headers: { Authorization: token },
      }
    );
  }

  delete(courseId) {
    const token = getToken();
    return axios.delete(`${API_URL}/${courseId}`, {
      headers: { Authorization: token },
    });
  }

  async dropCourse(courseId) {
    const token = getToken();
    try {
      const response = await axios.post(
        `${API_URL}/drop/${courseId}`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        // 服務器回應了錯誤狀態碼
        throw new Error(error.response.data.message || "退選課程失敗");
      } else if (error.request) {
        // 請求已發出，但沒有收到回應
        throw new Error("無法連接到服務器");
      } else {
        // 在設置請求時發生了錯誤
        throw new Error("發生錯誤: " + error.message);
      }
    }
  }

  // 更新課程方法
  update(courseId, updatedData) {
    const token = getToken();
    return axios
      .patch(`${API_URL}/${courseId}`, updatedData, {
        headers: { Authorization: token },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          throw new Error(error.response.data);
        }
        throw new Error("更新課程時發生錯誤");
      });
  }
}

const courseService = new CourseService();
export default courseService;
