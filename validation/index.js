const registerSchema = require('./schemas/registerSchema');
const loginSchema = require('./schemas/loginSchema');
const courseSchema = require('./schemas/courseSchema');

// 預設：一次回報所有錯誤、剝掉 schema 之外的鍵；允許呼叫端覆蓋
const withPrefs = (schema, data, options = {}) =>
  schema.validate(data, { abortEarly: false, stripUnknown: true, ...options });

// 封裝：一次回報所有錯誤、剝掉 schema 之外的鍵；允許呼叫端覆蓋
module.exports = {
  registerValidation: (data, options) =>
    withPrefs(registerSchema, data, options),
  loginValidation: (data, options) => withPrefs(loginSchema, data, options),
  courseValidation: (data, options) => withPrefs(courseSchema, data, options),
};
