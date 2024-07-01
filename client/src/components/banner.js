import React from "react";

const banner = () => {
  return (
    <div
      className=" d-flex justify-content-start  align-items-center bg-light bg-image pb-5 mb-4"
      style={{ height: "400px" }}
    >
      <div
        className="col-md-6 p-4 bg-white border m-4"
        style={{ maxWidth: "410px" }}
      >
        <h1>
          <strong>享受優惠價格，踏上學習之旅</strong>
        </h1>
        <p>
          您若是剛接觸，這裡有大好消息：新的學習者可享限時優惠，課程最低只需$390！即刻選購。
        </p>
      </div>
    </div>
  );
};

export default banner;
