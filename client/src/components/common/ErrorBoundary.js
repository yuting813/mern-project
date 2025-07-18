import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // ✅ 支援 props.fallback 優先顯示
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 預設錯誤畫面（簡潔版）
      return (
        <div className="text-center mt-5">
          <h1>Something went wrong.</h1>
          <p>請稍後再試，或重新整理頁面。</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
