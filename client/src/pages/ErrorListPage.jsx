import React, { useState } from 'react';

const ErrorListPage = () => {
  const [type, setType] = useState(null);

  // 模擬同步錯誤（可被 ErrorBoundary 捕捉）
  if (type === 'render') {
    throw new Error('Render 錯誤：模擬元件崩潰');
  }

  const handleAsyncError = () => {
    setTimeout(() => {
      try {
        throw new Error('非同步錯誤：這類錯誤不會被 ErrorBoundary 捕捉');
      } catch (error) {
        console.error('❗ 非同步錯誤已捕捉:', error);
        alert('非同步錯誤已被捕捉，請查看 console');
      }
    }, 100);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">🚨 錯誤測試清單 (/error-list)</h2>
      <p>這個頁面用來測試不同錯誤場景下的應用反應。</p>

      <div className="d-flex flex-column gap-3 mt-4">
        <button className="btn btn-danger" onClick={() => setType('render')}>
          🧨 模擬 Render 錯誤（會被 ErrorBoundary 捕捉）
        </button>

        <button className="btn btn-warning" onClick={handleAsyncError}>
          ⏱ 模擬非同步錯誤（try/catch 手動處理）
        </button>
      </div>
    </div>
  );
};

export default ErrorListPage;
