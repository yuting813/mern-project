import React from 'react';

const ErrorFallback = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center px-4">
      <h1 className="text-danger mb-3">⚠️ 發生錯誤啦！</h1>
      <p className="text-muted mb-4">請重新整理頁面，或稍後再試試看。</p>
      <button
        className="btn btn-outline-primary"
        onClick={() => window.location.reload()}
      >
        🔄 重新整理
      </button>
    </div>
  );
};

export default ErrorFallback;
