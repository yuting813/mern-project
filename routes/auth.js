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
    let { username, email, password, role, inviteCode } = req.body;

    // 只有講師需要驗證邀請碼
    if (role === "instructor") {
      const inviteFromClient = (inviteCode || "").trim();
      const expected = process.env.INSTRUCTOR_INVITE_CODE;
      if (!expected) {
        // 安全預設：若環境沒設定邀請碼，禁止建立講師
        return res
          .status(500)
          .json({ success: false, message: "發生未設定錯誤，請聯繫管理員" });
      }
      if (inviteFromClient !== expected) {
        return res
          .status(403)
          .json({ success: false, message: "講師邀請碼錯誤或已失效" });
      }
    }

    let newUser = new User({ username, email, password, role });
    let savedUser = await newUser.save();

    return res.status(201).json({
      success: true,
      message: "成功註冊",
      data: { _id: savedUser._id, username, email, role },
    });
  } catch (e) {
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
