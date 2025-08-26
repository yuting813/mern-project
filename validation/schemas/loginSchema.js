const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(50)
    .required()
    .email({ tlds: { allow: false } })
    .trim()
    .lowercase()
    .messages({
      "string.empty": "電子郵件為必填",
      "string.email": "請輸入有效的電子郵件地址",
    }),
  password: Joi.string().min(6).max(255).required().messages({
    "string.empty": "密碼為必填",
    "string.min": "密碼長度至少為6個字符",
  }),
});

module.exports = loginSchema;
