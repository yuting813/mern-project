import React from "react";
import logo from "../../assets/logo.png";

const FOOTER_CONTENT = {
  warning:
    "本網站為個人作品集展示，僅供技術交流用途。為了您的資訊安全，請勿輸入任何敏感個資（如信用卡號）。",
  copyright: (year) => `© ${year} - Built by Tina Hu`,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light py-4 px-5 mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
          <a className="navbar-brand" href="/" aria-label="回到首頁">
            <img
              src={logo}
              alt="Logo"
              className="img-fluid"
              style={{ maxHeight: "70px" }}
            />
          </a>
        </div>
        <div className="col-md-6 text-center text-md-end">
          <p className="mb-0 text-muted small">{FOOTER_CONTENT.warning}</p>
          <p className="mt-2 text-muted">
            {FOOTER_CONTENT.copyright(currentYear)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
