import React from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../../assets/bgimg.jpg";
import bgImgS from "../../assets/bgimg-s.jpg";
import bannerImgS from "../../assets/bannerimg2-s.jpg";
import bannerImg from "../../assets/bannerimg2.jpg";

const Banner = () => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/enroll");
  };

  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide banner-position"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner ">
          <div className="carousel-item active banner-container ">
            <div className="w-100">
              <picture>
                <source srcSet={bgImgS} media="(max-width: 768px)" />

                <img
                  className="img-fluid w-100"
                  alt="Banner"
                  width="1340"
                  height="400"
                  src={bgImg}
                />
              </picture>
            </div>

            <div className="text-container bg-white  p-4  border m-4 banner-msg">
              <h1>
                <strong>汲取他人經驗來學習</strong>
              </h1>
              <p>
                我們的講師具備真實世界的知識，能協助您達成目標，課程最低只要$320，只到明天。
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <div className="banner-container">
              <div className="w-100">
                <picture>
                  <source srcSet={bannerImgS} media="(max-width: 768px)" />

                  <img
                    className="img-fluid w-100"
                    alt="Banner"
                    width="1340"
                    height="400"
                    src={bannerImg}
                    loading="lazy"
                  />
                </picture>
              </div>
              <div className="text-container bg-white  p-4  border m-4 banner-msg">
                <h1>
                  <strong>帶您迎向未來的技能</strong>
                </h1>
                <p>
                  科技與工作型態與時俱進，但有了我們幫助，您的進步將是突飛猛進。取得所需技能，實現您的目標並保持競爭力。
                </p>
                <a
                  className="btn btn-dark rounded-0 w-100"
                  onClick={handleTakeToLogin}
                  href="/login"
                >
                  立即開始
                </a>
              </div>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Banner;
