import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import Banner from '../components/home/Banner.js';
import CourseBanner from '../components/course/CourseBanner.js';
import AI from '../assets/ai.png';

const HomePage = ({ showAlert, currentUser }) => {
  const navigate = useNavigate();

  const handleTakeToEnroll = () => {
    navigate('/enroll');
  };

  return (
    <main>
      <div>
        <Banner />
      </div>
      <div>
        <CourseBanner showAlert={showAlert} currentUser={currentUser} />
      </div>

      <div className="container py-5">
        <div className="row align-items-center py-1">
          {/* 左側文字區 */}
          <div className="col-md-3">
            <h2 className="fw-bold mb-3">
              面向企業領導者的 <span className="text-dark">AI</span>
            </h2>
            <p className="text-muted mb-4">
              為您和團隊培養 AI 實踐習慣，透過實操訓練掌握高效領導力技能。
            </p>
            <a
              href="/enroll"
              className="btn btn-outline-purple d-inline-flex align-items-center"
              onClick={handleTakeToEnroll}
            >
              開始探索
              <span className="ms-2">&rarr;</span>
            </a>
          </div>

          {/* 右側圖片區 */}
          <div className="col-md-8 text-center">
            <img
              src={AI}
              alt="AI Learning"
              className="img-fluid"
              style={{ maxHeight: '100vh', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
