const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");

// router.use((req, res, next) => {
//   console.log("正在接收一個跟auth有關的請求");
//   next();
// });

// router.post("/register", async (req, res) => {
//   // 確認註冊資訊是否符合規範
//   let { error } = registerValidation(req.body);
//   if (error) {
//     return res.status(400).send(error.details[0].message);
//   }

//   // 確認信箱是否被註冊過
//   const emailExist = await User.findOne({ email: req.body.email });
//   if (emailExist) return res.status(400).send("此信箱已註冊過");

//   // 創立新帳號
//   let { username, email, password, role } = req.body;
//   let newUser = new User({ username, email, password, role });
//   try {
//     let saveUser = await newUser.save();
//     return res.send({ msg: "成功新增使用者", saveUser });
//   } catch (e) {
//     return res.status(500).send(e.message, "新增使用者失敗");
//   }
// });

// // 製作webtoken
// router.post("/login", async (req, res) => {
//   // 確認數據是否符合規範
//   let { error } = loginValidation(req.body);
//   if (error) {
//     return res.status(400).send(error.details[0].message);
//   }
//   // 確認信箱是否被註冊過
//   const foundUser = await User.findOne({ email: req.body.email });
//   if (!foundUser) {
//     return res.status(401).send("無法找到使用者，請確認信箱是否正確");
//   }

//   foundUser.comparePassword(req.body.password, (err, isMatch) => {
//     if (err) return res.status(500).send(err);
//     if (isMatch) {
//       // 製作json web token
//       const tokenObject = { _id: foundUser._id, email: foundUser.email };
//       const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
//       return res.send({
//         msg: "登入成功",
//         token: "JWT " + token,
//         user: foundUser,
//       });
//     } else {
//       return res.status(401).send("密碼錯誤");
//     }
//   });
// });

router.post("/register", async (req, res) => {
  try {
    // 確認註冊資訊是否符合規範
    let { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // 確認信箱是否被註冊過
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("此信箱已註冊過");

    // 創立新帳號
    let { username, email, password, role } = req.body;
    let newUser = new User({ username, email, password, role });
    let savedUser = await newUser.save();
    return res.send({ msg: "成功新增使用者", savedUser });
  } catch (e) {
    return res.status(500).send("新增使用者失敗: " + e.message);
  }
});

// 製作webtoken
router.post("/login", async (req, res) => {
  try {
    // 確認數據是否符合規範
    let { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // 確認信箱是否被註冊過
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(401).send("無法找到使用者，請確認信箱是否正確");
    }

    // 比較密碼
    const isMatch = await foundUser.comparePassword(req.body.password);
    if (isMatch) {
      // 製作json web token
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({
        msg: "登入成功",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("密碼錯誤");
    }
  } catch (e) {
    return res.status(500).send("登入過程中發生錯誤: " + e.message);
  }
});

module.exports = router;
