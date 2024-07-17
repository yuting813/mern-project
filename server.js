const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");
app.use(cors());

const path = require("path");
const port = process.env.PORT || 8080;

// 連結MongoDB
mongoose
  // .connect("mongodb://localhost:27017/mernDB")
  // .connect("mongodb://127.0.0.1:27017/mernDB")
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("連結到mongodb...");
  })
  .catch((e) => {
    console.log("e");
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "/client/build")));
// 提供靜態檔案服務
app.use(express.static(path.join(__dirname, "build")));

app.use("/api/user", authRoute);

app.use("/api/courses", courseRoute);

// 為Node.js 伺服器應用程式中設定一個萬用路由處理器。
// 確保在生產環境(production)或暫存環境(staging)中,
// 所有不符合路由規則的 URL都被對應到React應用程式建置後的index.html檔案。

if (process.env.NODE_ENV === "production") {
  //*Set static folder up in production
  app.use(express.static("client/build"));

  // app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "build", "index.html"))
  );
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
