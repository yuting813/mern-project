import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const Navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert("登入成功。您現在將被重新導向到個人資料頁面");
      setCurrentUser(AuthService.getCurrentUser());
      Navigate("/profile");
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <div className="container d-flex  flex-column-reverse flex-md-row mt-md-5">
      <div className="col-md-6 mb-4 mb-md-0">
        <img
          src={require("../assets/login.webp")}
          alt="loginImg"
          className="img-fluid"
        />
      </div>

      <div className="col-md-5 col-sm-8 offset-md-1 mt-md-4 ">
        {message && <div className="alert alert-danger">{message}</div>}
        <h2 className="my-4 text-center">登入您的帳戶</h2>

        <div className="form-group custom-input-group mb-3">
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control custom-input"
            name="email"
            placeholder=" "
            required
          />
          <label htmlFor="email" className="custom-label">
            <span>電子郵件</span>
          </label>
        </div>

        <div className="form-group  custom-input-group mb-3">
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control custom-input"
            name="password"
            placeholder=""
            value={password}
            required
          />
          <label htmlFor="password" className="custom-label">
            密碼
          </label>
        </div>

        <div className="form-group">
          <button
            onClick={handleLogin}
            className="btn btn-primary  rounded-0 custom-button w-100 py-2 mb-3"
          >
            <span>登入</span>
          </button>
        </div>

        <div className="text-center my-3">
          <p className="bg-light p-3 mt-4 mb-3 ">
            還沒有帳戶嗎？{" "}
            <a href="/register" className="tn-text-a">
              註冊
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
