import axios from "axios";
import courseService from "./course.service";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/user`;

class AuthService {
  login(email, password) {
    return axios.post(`${API_URL}/login`, {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(formData) {
    return axios.post(`${API_URL}/register`, formData);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  // 🆕 權限檢查方法
  canCreateCourse(user) {
    return user?.user?.role === "instructor";
  }

  canEnrollCourse(user) {
    return user?.user?.role === "student";
  }

  canEditCourse(user, course) {
    return (
      user?.user?.role === "instructor" &&
      course?.instructor?._id === user?.user?._id
    );
  }

  canDropCourse(user) {
    return user?.user?.role === "student";
  }

  isInstructor(user) {
    return user?.user?.role === "instructor";
  }

  isStudent(user) {
    return user?.user?.role === "student";
  }

  // 獲取用戶適合的課程API
  getCoursesFetcher(user) {
    if (this.isInstructor(user)) {
      return courseService.getInstructorCourses;
    }
    return courseService.getEnrolledCourses;
  }

  // 獲取用戶角色顯示名稱
  getRoleDisplayName(user) {
    return this.isInstructor(user) ? "講師" : "學生";
  }
}

const authService = new AuthService();
export default authService;
