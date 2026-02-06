// React 前端使用
import Joi from 'joi';

const registerSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.empty': '用戶名稱為必填',
    'string.min': '用戶名稱至少需要3個字符',
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
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
      'string.pattern.base':
        '密碼需包含大小寫、數字與特殊符號，且長度至少6字元',
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
});

export default registerSchema;
