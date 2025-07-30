const registerSchema = require("./schemas/registerSchema");
const loginSchema = require("./schemas/loginSchema");
const courseSchema = require("./schemas/courseSchema");

module.exports = {
  registerValidation: (data) => registerSchema.validate(data),
  loginValidation: (data) => loginSchema.validate(data),
  courseValidation: (data) => courseSchema.validate(data),
};
