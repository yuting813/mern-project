import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../styles/custom.css";

const RegisterComponent = () => {
  const Navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChnageRole = (e) => {
    setRole(e.target.value);
  };

  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert("註冊成功。您現在將被導向登入頁面");
        Navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  


  // 限制密碼最少數字
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValid(newPassword.length >= 6 && /^[a-zA-Z0-9]+$/.test(newPassword));
  };

  return (
    <div className="container d-flex  flex-column-reverse flex-md-row mt-md-5">
      <div className="col-md-6 mb-4 mb-md-0">
        <img
          src={require("../assets/register.webp")}
          alt="loginImg"
          className="img-fluid"
        />
      </div>

      <div className="col-md-5 col-sm-8 offset-md-1 mt-md-4">
        {message && <div className="alert alert-danger">{message}</div>}
        <h2 className="my-4 text-center">註冊並開始學習</h2>

       
        <div className="form-group custom-input-group mb-3">
          <input
            onChange={handleChangeUsername}
            type="text"
            className="form-control custom-input"
            name="username"
            id="username"
            placeholder=" "
            required
          />
          <label htmlFor="username" className="custom-label">
            <span>用戶名稱</span>
          </label>
        </div>

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

        <div className="form-group custom-input-group mb-3">
          <input
            onChange={handleChangePassword}
            type="password"
            className={`form-control custom-input ${
              isValid ? "is-valid" : "is-invalid"
            }`}
            name="password"
            placeholder=""
            value={password}
            required
          />
          <label htmlFor="password" className="custom-label">
            <span>密碼</span>
          </label>
          {!isValid && password.length > 0 && (
            <div className="invalid-feedback">
              密碼必須包含至少6個英文字母或數字
            </div>
          )}
        </div>
        

        <div className="form-group mb-2  ">
          <label htmlFor="role" className="">
            <span>請選擇身份 </span>
          </label>

          <select
            onChange={handleChnageRole}
            className="form-control   "
            placeholder=""
            name="role"
            required
          >
            <option value="" disabled>
              請選擇身份
            </option>
            <option value="student">student</option>
            <option value="instructor">instructor</option>
          </select>
        </div>


        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="termsCheck"
          />
          <label class="form-check-label small" for="termsCheck">
            我想收到特別優惠、個人化建議與學習秘訣。
          </label>
        </div>

        <button
          onClick={handleRegister}
          className="btn btn-primary  rounded-0 w-100 p-2 mt-4 mb-3 custom-button"
        >
          <span className="">
            <strong>註冊</strong>
          </span>
        </button>

        <p className="text-center small">
          註冊即代表您同意我們的使用條款與隱私權政策。
        </p>

        <div className="text-center my-3">
          <p className="bg-light p-3 mt-4 mb-3 ">
            已經擁有帳戶？{" "}
            <a href="/login" className="tn-text-a">
              登入
            </a>
          </p>
        </div>
      </div>
    </div>

  );
};

export default RegisterComponent;
