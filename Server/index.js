const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { auth } = require("./routes");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");
app.use(cors());

// 連結MongoDB
mongoose
  // .connect("mongodb://localhost:27017/mernDB")
  .connect("mongodb://127.0.0.1:27017/mernDB")
  .then(() => {
    console.log("連結到mongodb...");
  })
  .catch((e) => {
    console.log("e");
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", authRoute);
// app.use(
//   cors({
//     origin: "http://localhost:3000", // 允许 localhost:3000 访问
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

//只有登入系統的人,才能夠去新增課程或是註冊課程
// 驗證jwt
// course route應該被jwt保護
// 如果request header內部jwt,則request就會被視為是unauthorized
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

app.listen(8080, () => {
  console.log("後端伺服器聆聽在port8080...");
});
