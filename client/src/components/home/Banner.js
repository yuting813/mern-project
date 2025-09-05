import React, { useEffect } from "react";

import bgImg from "../../assets/bgimg.jpg";
import bgImgS from "../../assets/bgimg-s.jpg";

// 依使用者偏好減少動效，自動關閉 autoplay
const autoPlayAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)")
  .matches;

// 集中管理 slide；支援 per-slide interval
const slides = [
  {
    id: 0,
    desktopSrc: "/assets/banner.png", // public
    mobileSrc: "/assets/banner-s.png", // public（小尺寸）
    title: "全年投入學習，享受 20% 優惠",
    description:
      "以額外優惠價格，無限存取我們在科技、商務等多個領域中最受好評的課程。適用相關條款。",
    cta: "現享優惠",
    ctaTo: "/enroll",
    lazy: false,
    interval: 5000,
  },
  {
    id: 1,
    desktopSrc: bgImg,
    mobileSrc: bgImgS,
    title: "彈指之間，即可獲得知識",
    description:
      "向現實世界中全球各地的專家學習，購買 $320 起的課程，還剩一天！",
    cta: null,
    ctaTo: null,
    lazy: true,
    interval: 4000,
  },
];

const BannerSlide = ({
  title,
  description,
  cta,
  ctaTo,
  isActive = false,
  lazy = false,
  interval,
}) => (
  <div
    className={`carousel-item ${isActive ? "active" : ""}`}
    data-bs-interval={autoPlayAllowed ? interval : undefined}
  >
    <div className="banner-container">
      <div className="image-container w-100">
        <picture>
          {/* WebP：提供兩個寬度 + sizes，所有裝置都能吃到 WebP */}
          <source
            type="image/webp"
            srcSet="/assets/banner-s.webp 640w, /assets/banner.webp 1280w"
            sizes="100vw"
          />
          {/* 後備 PNG：同樣提供兩個寬度 */}
          <img
            className="banner-img"
            alt={title}
            width={1340}
            height={400}
            src="/assets/banner.png"
            srcSet="/assets/banner-s.png 640w, /assets/banner.png 1280w"
            sizes="100vw"
            loading={lazy ? "lazy" : "eager"}
            fetchPriority={lazy ? "auto" : "high"}
          />
        </picture>
      </div>

      <div className="text-container bg-white border p-4">
        <h1 className="h2 fw-bold mb-2">{title}</h1>
        {description && <p className="mb-3">{description}</p>}
        {cta && ctaTo && (
          <a
            className="banner-btn-purple"
            href={ctaTo}
            onClick={(e) => {
              e.stopPropagation(); // 阻止冒泡到 carousel
            }}
            aria-label={cta}
          >
            {cta}
          </a>
        )}
      </div>
    </div>
  </div>
);

const Banner = () => {
  useEffect(() => {
    const el = document.getElementById("homeBannerCarousel");
    if (!el) return;

    // 建立/取得 carousel 實例
    const carousel =
      window.bootstrap?.Carousel.getInstance(el) ||
      new window.bootstrap.Carousel(el, {
        interval: autoPlayAllowed ? 4500 : false, // 全域預設（會被每張覆蓋）
        ride: autoPlayAllowed ? "carousel" : false,
        pause: "hover",
        touch: true,
        keyboard: true,
      });

    // 使用者互動（左右箭頭/圓點）後停止自動播放，避免搶操作
    const stopOnInteraction = () => carousel.pause();
    const controls = el.querySelectorAll(
      ".carousel-control-prev, .carousel-control-next, .carousel-indicators button"
    );
    controls.forEach((btn) => btn.addEventListener("click", stopOnInteraction));

    // 分頁不可見暫停
    const onVisibility = () => {
      if (document.hidden) carousel.pause();
      else if (autoPlayAllowed) carousel.cycle();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      controls.forEach((btn) =>
        btn.removeEventListener("click", stopOnInteraction)
      );
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section aria-label="首頁促銷與主題橫幅">
      <div
        id="homeBannerCarousel"
        className="carousel slide banner-position"
        data-bs-ride={autoPlayAllowed ? "carousel" : undefined}
        data-bs-interval={autoPlayAllowed ? 4500 : undefined}
        data-bs-pause="hover"
        data-bs-touch="true"
        data-bs-keyboard="true"
      >
        {/* indicators（自動依 slides 產生） */}
        <div className="carousel-indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target="#homeBannerCarousel"
              data-bs-slide-to={idx}
              className={idx === 0 ? "active" : ""}
              aria-current={idx === 0 ? "true" : undefined}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* slides */}
        <div className="carousel-inner">
          {slides.map((s, idx) => (
            <BannerSlide key={s.id} {...s} isActive={idx === 0} />
          ))}
        </div>

        {/* controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#homeBannerCarousel"
          data-bs-slide="prev"
          aria-label="上一張"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#homeBannerCarousel"
          data-bs-slide="next"
          aria-label="下一張"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Banner;
