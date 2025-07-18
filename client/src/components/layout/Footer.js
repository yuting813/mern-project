import React from "react";
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <div className="bg-light py-3 px-5 mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt="Logo"
              className="img-fluid"
              style={{ maxHeight: "70px" }}
            />
          </a>
        </div>
        <div className="col-md-6 text-md-end">
          <p className="mb-0">
            本網站僅供練習之用,請勿提供任何個人資料,例如信用卡號碼。
          </p>
          <p className="mb-0">&copy; 2025 Tina Hu</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
