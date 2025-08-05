import React from "react";

const PageLoader = () => (
  <div className="d-flex flex-column align-items-center justify-content-center vh-100">
    <div
      className="spinner-border text-dark"
      role="status"
      style={{ width: "3rem", height: "3rem" }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mt-3 text-muted fs-5">
      頁面載入中... 請稍等一下 (´• ω •`)ﾉﾞ 🐢
    </p>
  </div>
);

export default PageLoader;
