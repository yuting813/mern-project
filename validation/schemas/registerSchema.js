const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required().email(),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@#&!]).{8,30}$")
    )
    .required()
    .messages({
      "string.pattern.base":
        "密碼需包含大小寫字母、數字與特殊字元，且長度需為8~30字元",
    }),
  role: Joi.string().required().valid("student", "instructor"),
});

module.exports = registerSchema;
