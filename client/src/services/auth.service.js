import axios from "axios";


const API_URL =`${process.env.REACT_APP_API_BASE_URL}/api/user`;


// 跟登入有關的服務物件

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
  register(username, email, password, role) {
    return axios.post(`${API_URL}/register`, {
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
