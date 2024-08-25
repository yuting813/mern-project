import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = ({ currentUser, setCurrentUser, showAlert }) => {
  const navigate = useNavigate();
  let [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "電子郵件為必填";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "請輸入有效的電子郵件地址";
    if (!formData.password) tempErrors.password = "密碼為必填";
    else if (formData.password.length < 8)
      tempErrors.password = "密碼長度至少為8個字符";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await AuthService.login(
          formData.email,
          formData.password
        );
        localStorage.setItem("user", JSON.stringify(response.data));
        showAlert("登入成功!", "您將被導向至個人資料頁面。", "elegant", 500);
        setCurrentUser(AuthService.getCurrentUser());

        setTimeout(() => {
          navigate("/profile");
        }, 500);
      } catch (e) {
        setMessage(e.response.data);
      } finally {
        setIsLoading(false);
      }
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
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control custom-input 
              ${errors.email ? "is-invalid" : " "}`}
            placeholder=" "
            required
          />
          <label htmlFor="email" className="custom-label">
            <span>電子郵件</span>
          </label>
          {errors.email && (
            <div className="invalid-feedback ps-1">{errors.email}</div>
          )}
        </div>

        <div className="form-group  custom-input-group mb-3">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-control custom-input ${
              errors.password ? "is-invalid" : ""
            }`}
            placeholder=""
            required
          />
          <label htmlFor="password" className="custom-label">
            密碼
          </label>
          {errors.password && (
            <div className="invalid-feedback  ps-1">{errors.password}</div>
          )}
        </div>

        <div className="form-group">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="btn btn-primary rounded-0 custom-button w-100 py-2 mb-3"
          >
            {isLoading ? (
              <>
                <span className="loading-spinner "></span>
                登入中...
              </>
            ) : (
              "登入"
            )}
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
