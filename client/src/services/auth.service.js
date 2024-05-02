import axios from "axios";
// const API_UserURL = "http://localhost:8080/api/user";
// const API_URL = "https://mern-project-p7hk.onrender.com/api/user";
const API_UserURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api/user"
    : "https://mern-project-p7hk.onrender.com/api/user";
// 跟登入有關的服務物件

class AuthService {
  login(email, password) {
    return axios.post(API_UserURL + "/login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, role) {
    return axios.post(API_UserURL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
