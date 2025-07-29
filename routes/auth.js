const router = require("express").Router();
const { registerValidation, loginValidation } = require("../validation");
const User = require("../models").user;
const jwt = require("jsonwebtoken");

// helper function for error response
const returnError = (res, status, msg) =>
  res.status(status).json({ success: false, message: msg });

router.post("/register", async (req, res) => {
  try {
    // 確認註冊資訊是否符合規範
    const { error } = registerValidation(req.body);
    if (error) return returnError(res, 400, error.details[0].message);

    // 確認信箱是否被註冊過
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return returnError(res, 400, "此信箱已註冊過");

    // 創立新帳號
    let { username, email, password, role } = req.body;
    let newUser = new User({ username, email, password, role });
    let savedUser = await newUser.save();
    // return res.send({ msg: "成功新增使用者", savedUser });
    return res.status(201).json({
      success: true,
      message: "成功註冊",
      data: { _id: savedUser._id, username, email, role },
    });
  } catch (e) {
    // return res.status(500).send("新增使用者失敗: " + e.message);
    return returnError(res, 500, "新增使用者失敗: " + e.message);
  }
});

//登入 製作webtoken
router.post("/login", async (req, res) => {
  try {
    // 確認數據是否符合規範
    const { error } = loginValidation(req.body);
    if (error) {
      return returnError(res, 400, error.details[0].message);
    }

    // 確認信箱是否被註冊過
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return returnError(res, 401, "無法找到使用者，請確認信箱是否正確");
    }

    // 比較密碼
    const isMatch = await foundUser.comparePassword(req.body.password);
    if (!isMatch) return returnError(res, 401, "密碼錯誤");

    // 將JWT payload 加上 role
    const tokenObject = {
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    };

    const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "登入成功",
      token: "JWT " + token,
      user: {
        _id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
      },
    });
  } catch (e) {
    return returnError(res, 500, "登入過程中發生錯誤: " + e.message);
  }
});

module.exports = router;
