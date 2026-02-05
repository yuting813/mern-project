// Node.js 後端使用
const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.empty': '用戶名稱為必填',
    'string.min': '用戶名稱至少需要3個字符',
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .lowercase()
    .required()
    .messages({
      'string.empty': '電子郵件為必填',
      'string.email': '請輸入有效的電子郵件地址',
    }),

  password: Joi.string()
    .pattern(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/)
    .required()
    .messages({
      'string.empty': '密碼為必填',
      // 與 regex 對齊：英文字母 + 數字，長度至少 6
      'string.pattern.base': '密碼需包含英文字母與數字，且長度至少 6 個字元',
    }),

  role: Joi.string().valid('student', 'instructor').required().messages({
    'any.only': '請選擇身份',
    'string.empty': '請選擇身份',
  }),
  inviteCode: Joi.when('role', {
    is: 'instructor',
    then: Joi.string().min(4).required().label('講師授權碼').messages({
      'string.empty': '{{#label}}為必填',
      'any.required': '{{#label}}為必填',
      'string.min': '{{#label}}至少 {{#limit}} 碼',
    }),
    otherwise: Joi.any().strip(), // 學生時自動移除欄位
  }),

  terms: Joi.valid(true).required().messages({
    'any.only': '您必須同意條款才能註冊',
  }),
  // 若後續後端不打算用 terms，可註銷，配合 stripUnknown:true 會自動丟掉
});

module.exports = registerSchema;
