import React from "react";
import Login from "../../pages/Login.js";
import Nav from "../layout/Nav.js";
import Footer from "../layout/Footer.js";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能夠顯示降級後的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 同樣可以將錯誤日誌上報給服務器
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 自定義降級後的 UI 並渲染
      return (
        <div>
          <Nav />
          <h1 className="m-1">Something went wrong.</h1>
          <Login />
          <Footer />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
