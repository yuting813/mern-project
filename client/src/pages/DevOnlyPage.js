import React from 'react';
import { Link } from 'react-router-dom';

const DevOnlyPage = () => {
  return (
    <div className="container py-5">
      <h2 className="mb-4">🛠 Dev Only 測試工具區</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/error-list">🚨 錯誤模擬測試（/error-list）</Link>
        </li>
      </ul>
    </div>
  );
};

export default DevOnlyPage;