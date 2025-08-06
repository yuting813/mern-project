import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Register from "../assets/register.webp";
import registerSchema from "../validation/schemas/registerSchema";
import { validateWithSchema } from "../utils/validationUtils";
import { useEffect } from "react";

const RegisterPage = ({ showAlert }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    document.getElementById("username-input")?.focus();
  }, []);
  // const validateForm = () => {
  //   const { error } = registerSchema.validate(formData, { abortEarly: false });
  //   if (!error) {
  //     setErrors({});
  //     return true;
  //   }

  //   const formattedErrors = {};
  //   error.details.forEach((detail) => {
  //     formattedErrors[detail.path[0]] = detail.message;
  //   });
  //   setErrors(formattedErrors);
  //   return false;
  // };
  const validateForm = () => {
    const { isValid, errors } = validateWithSchema(registerSchema, formData);
    setErrors(errors);
    return isValid;
  };

  const passwordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setServerError("");
      try {
        await AuthService.register(formData);
        showAlert("註冊成功!", "您將被導向至登入頁面。", "elegant", 1500);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (e) {
        const fallbackMsg = "註冊時發生錯誤，請稍後再試。";
        const serverMsg =
          e.response?.data?.message || e.response?.data || fallbackMsg;
        setServerError(typeof serverMsg === "string" ? serverMsg : fallbackMsg);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container d-flex flex-column-reverse flex-md-row mt-md-5">
      <div className="col-md-6 mb-4 mb-md-0">
        <img src={Register} alt="註冊圖片" className="img-fluid" />
      </div>

      <div className="col-md-5 col-sm-8 offset-md-1 mt-md-4">
        {serverError && (
          <div className="alert alert-danger">
            {typeof serverError === "string"
              ? serverError
              : serverError.message || "發生未知錯誤"}
          </div>
        )}

        <h2 className="my-4 text-center">註冊並開始學習</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group custom-input-group mb-3">
            <input
              id="username-input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`form-control custom-input ${
                errors.username ? "is-invalid" : ""
              }`}
              placeholder=" "
            />
            <label htmlFor="username" className="custom-label">
              <span>用戶名稱</span>
            </label>
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group custom-input-group mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control custom-input ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder=" "
            />
            <label htmlFor="email" className="custom-label">
              <span>電子郵件</span>
            </label>
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group custom-input-group mb-3">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-control custom-input ${
                errors.password ? "is-invalid" : ""
              }`}
              placeholder=" "
            />
            <label htmlFor="password" className="custom-label">
              <span>密碼</span>
            </label>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
            {formData.password && (
              <div className="password-strength mt-2">
                密碼強度:{" "}
                {
                  ["弱", "普通", "中等", "強", "很強"][
                    passwordStrength(formData.password) - 1
                  ]
                }
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="role" className="form-label">
              <span>請選擇身份</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`form-control ${errors.role ? "is-invalid" : ""}`}
            >
              <option value="" disabled>
                請選擇身份
              </option>
              <option value="student">學生</option>
              <option value="instructor">講師</option>
            </select>
            {errors.role && (
              <div className="invalid-feedback">{errors.role}</div>
            )}
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="form-check-input"
              id="termsCheck"
            />
            <label className="form-check-label small" htmlFor="termsCheck">
              我同意接收特別優惠、個人化建議與學習秘訣。
            </label>
            {errors.terms && (
              <div className="text-danger small">{errors.terms}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary rounded-0 w-100 p-2 mt-4 mb-3 custom-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                註冊中...
              </>
            ) : (
              <strong>註冊</strong>
            )}
          </button>
        </form>

        <p className="text-center small">
          註冊即代表您同意我們的使用條款與隱私權政策。
        </p>

        <div className="text-center my-3">
          <p className="bg-light p-3 mt-4 mb-3">
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

export default RegisterPage;
