import axios from "axios";

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
}

const authService = new AuthService();
export default authService;
