import axios from "axios";
const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/courses`;

// 定義獲取token的函數
function getToken() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).token : "";
}

function handleError(error) {
  console.error("發生錯誤:", error);
  // 可以在這裡添加更多的錯誤處理邏輯
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


  // async getCourseByName(keyword) {
  //   const token = getToken();
  //   try {
  //     const response = await axios.get(`${API_URL}`, {
  //       params: { keyword },
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching courses:', error);
  //     throw error;
  //   }
  // }

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
}

export default new CourseService();
